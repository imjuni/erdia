import path from "node:path";

import { DataSource } from "typeorm";
import type { DataSourceOptions } from "typeorm";

import { License } from "./License";
import { Organization } from "./Organization";
import { Photo } from "./Photo";
import { User } from "./User";

export const dataSourceOption: DataSourceOptions = {
  database: path.join(__dirname, "..", "db", "sqlite3.sqlite3"),
  dropSchema: true,
  enableWAL: true,
  entities: [User, Photo, License, Organization],
  synchronize: true,
  type: "better-sqlite3",
};

const dataSource = new DataSource(dataSourceOption);

export default dataSource;
