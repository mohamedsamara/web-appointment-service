import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
} from "typeorm";

import { User } from "./user";
import { Schedule } from "./schedule";
import { Appointment } from "./appointment";
import { AppointmentRequest } from "./appointment-request";
import { Availability } from "./availability";

@Entity("staff")
export class Staff {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => User, (user) => user.staff)
  user!: User;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column({ nullable: true })
  specialty!: string;

  @Column()
  contactNumber!: string;

  @OneToMany(() => Schedule, (schedule) => schedule.staff)
  schedules!: Schedule[];

  @OneToMany(() => Availability, (availability) => availability.staff)
  availabilities!: Availability[];

  @OneToMany(() => Appointment, (appointment) => appointment.staff)
  appointments!: Appointment[];

  @OneToMany(() => AppointmentRequest, (request) => request.staff)
  appointmentRequests!: AppointmentRequest[];
}
