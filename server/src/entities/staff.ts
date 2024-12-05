import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
} from "typeorm";

import { User } from "./user";
import { Appointment } from "./appointment";
import { Availability } from "./availability";

@Entity()
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

  @OneToMany(() => Appointment, (appointment) => appointment.staff)
  appointments!: Appointment[];

  @OneToMany(() => Availability, (availability) => availability.staff)
  availabilities!: Availability[];
}
