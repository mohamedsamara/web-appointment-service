import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

import { Availability } from "./availability";

@Entity()
export class Slot {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Availability, (availability) => availability.slots)
  availability!: Availability;

  @Column("time", { nullable: false })
  startTime!: string; // The time will be stored as a string

  @Column("time", { nullable: false })
  endTime!: string; // The time will be stored as a string
}
