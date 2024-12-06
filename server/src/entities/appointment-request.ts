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
import { Appointment } from "./appointment";

export enum AppointmentRequestStatus {
  Pending = "pending",
  Approved = "approved",
  Rejected = "rejected",
}

@Entity()
export class AppointmentRequest {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.appointmentRequests)
  user!: User;

  @ManyToOne(() => Staff, (staff) => staff.appointmentRequests)
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

  @Column({
    type: "varchar",
    enum: AppointmentRequestStatus,
    default: AppointmentRequestStatus.Pending,
  })
  status!: AppointmentRequestStatus;

  @OneToOne(() => Appointment, (appointment) => appointment.request, {
    nullable: true,
  })
  appointment?: Appointment; // Link to the Appointment entity when created
}
