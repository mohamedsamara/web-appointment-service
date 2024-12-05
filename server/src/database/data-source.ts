import { DataSource } from "typeorm";

import config from "../config";
import { User } from "../entities/user";
import { Staff } from "../entities/staff";
import { Appointment } from "../entities/appointment";
import { Availability } from "../entities/availability";
import { Slot } from "../entities/slot";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.database,
  synchronize: true,
  logging: false,
  entities: [User, Staff, Appointment, Availability, Slot],
  subscribers: [],
  migrations: ["src/migrations/**/*.ts"],
});
