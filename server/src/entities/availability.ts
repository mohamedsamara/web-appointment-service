import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";

import { Staff } from "./staff";
import { Schedule } from "./schedule";
import { Slot } from "./slot";

@Entity()
export class Availability {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Schedule, (schedule) => schedule.availabilities)
  schedule!: Schedule;

  @ManyToOne(() => Staff, (staff) => staff.availabilities, { eager: true })
  staff!: Staff;

  @Column({ type: "int" })
  dayOfWeek!: number; // 0 for Sunday, 1 for Monday, ..., 6 for Saturday

  @Column("time", { nullable: false })
  startTime!: string; // The time will be stored as a string

  @Column("time", { nullable: false })
  endTime!: string; // The time will be stored as a string

  @OneToMany(() => Slot, (slot) => slot.availability)
  slots!: Slot[];
}
