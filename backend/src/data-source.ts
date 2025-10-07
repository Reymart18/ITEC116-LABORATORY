import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../users/user.entity";
import { Note } from "./notes/note.entity";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root", // adjust if you set a password
  password: "",
  database: "lab_activities_db", // or lab_activities_db_new if you recreated it
  synchronize: false,
  logging: true,
  entities: [User, Note],
  migrations: [],
  subscribers: [],
});
