import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";

import { Staff } from "./staff";
import { Slot } from "./slot";

@Entity()
export class Availability {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Staff, (staff) => staff.availabilities)
  staff!: Staff;

  @Column({ type: "int" })
  dayOfWeek!: number; // 0 for Sunday, 1 for Monday, ..., 6 for Saturday

  @Column({ type: "time" })
  startTime!: string;

  @Column({ type: "time" })
  endTime!: string;

  @OneToMany(() => Slot, (slot) => slot.availability)
  slots!: Slot[];
}
