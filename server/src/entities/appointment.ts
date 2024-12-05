import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

import { User } from "./user";
import { Staff } from "./staff";

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.id)
  user!: User;

  @ManyToOne(() => Staff, (staff) => staff.appointments)
  staff!: Staff;

  @Column({ type: "date" })
  appointmentDate!: Date;

  @Column({ type: "time" })
  startTime!: string;

  @Column({ type: "time" })
  endTime!: string;

  @Column({ type: "varchar", default: "scheduled" })
  status!: "scheduled" | "completed" | "cancelled";

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;
}
