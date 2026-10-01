import path from "node:path";

import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";

import * as schema from "./schema";

const database = new Database(
  path.join(process.cwd(), "examples", "db", "sqlite3.sqlite3")
);

export default {
  db: drizzle(database, { schema }),
  schema,
  dispose: () => database.close(),
};
