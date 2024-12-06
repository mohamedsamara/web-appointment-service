import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";

import { Staff } from "./staff";
import { Availability } from "./availability";

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Staff, (staff) => staff.schedules, { eager: true })
  staff!: Staff;

  @Column({ type: "date" })
  startDate!: Date; // The start date of the schedule (e.g., first available date)

  @Column({ type: "date", nullable: true })
  endDate?: Date; // The end date of the schedule (can be indefinite if null)

  @OneToMany(() => Availability, (availability) => availability.schedule, {
    cascade: true,
  })
  availabilities!: Availability[];

  @Column({ type: "varchar", length: 255, nullable: true })
  name?: string; // Optional name for the schedule (e.g., "Weekly Availability")
}
