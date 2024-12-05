import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

import { Availability } from "./availability";

@Entity()
export class Slot {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Availability, (availability) => availability.slots)
  availability!: Availability;

  @Column({ type: "time" })
  startTime!: string;

  @Column({ type: "time" })
  endTime!: string;
}
