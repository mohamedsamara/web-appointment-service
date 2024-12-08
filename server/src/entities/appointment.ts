import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";

import { User } from "./user";
import { Staff } from "./staff";
import { AppointmentRequest } from "./appointment-request";

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.appointments)
  user!: User;

  @ManyToOne(() => Staff, (staff) => staff.appointments)
  staff!: Staff;

  @Column({
    type: "bigint",
    transformer: {
      to: (value: number) => value, // Store as a number
      from: (value: string | number) => Number(value), // Convert back to number when retrieving
    },
  })
  startTime!: number;

  @Column({
    type: "bigint",
    transformer: {
      to: (value: number) => value, // Store as a number
      from: (value: string | number) => Number(value), // Convert back to number when retrieving
    },
  })
  endTime!: number;

  @OneToOne(() => AppointmentRequest, (request) => request.appointment)
  @JoinColumn()
  request!: AppointmentRequest;
}
