import { DataSource } from "typeorm";

import config from "../config";
import { User } from "../entities/user";
import { Staff } from "../entities/staff";
import { Schedule } from "../entities/schedule";
import { Availability } from "../entities/availability";
import { Slot } from "../entities/slot";
import { Appointment } from "../entities/appointment";
import { AppointmentRequest } from "../entities/appointment-request";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.database,
  synchronize: true,
  logging: false,
  entities: [
    User,
    Staff,
    Appointment,
    AppointmentRequest,
    Schedule,
    Availability,
    Slot,
  ],
  subscribers: [],
  migrations: ["src/migrations/**/*.ts"],
});
