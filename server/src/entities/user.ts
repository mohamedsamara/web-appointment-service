import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";

import { Staff } from "./staff";
import { Appointment } from "./appointment";
import { AppointmentRequest } from "./appointment-request";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @OneToOne(() => Staff, (staff) => staff.user)
  @JoinColumn()
  staff?: Staff;

  @OneToMany(() => Appointment, (appointment) => appointment.user)
  appointments!: Appointment[];

  @OneToMany(() => AppointmentRequest, (request) => request.user)
  appointmentRequests!: AppointmentRequest[];
}
