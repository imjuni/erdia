import {
  mysqlTable,
  serial as mysqlSerial,
  uniqueIndex as mysqlUniqueIndex,
  varchar as mysqlVarchar,
} from "drizzle-orm/mysql-core";
import {
  integer as pgInteger,
  pgTable,
  serial as pgSerial,
  uniqueIndex as pgUniqueIndex,
  varchar as pgVarchar,
} from "drizzle-orm/pg-core";
import {
  integer as sqliteInteger,
  sqliteTable,
  text as sqliteText,
  uniqueIndex as sqliteUniqueIndex,
} from "drizzle-orm/sqlite-core";
import { describe, expect, it, vi } from "vitest";

import type { IRecordMetadata } from "#/databases/interfaces/IRecordMetadata";
import { getDrizzleColumnAttributeKey } from "#/loaders/drizzle/columns/getDrizzleColumnAttributeKey";
import { getDrizzleColumnType } from "#/loaders/drizzle/columns/getDrizzleColumnType";
import { getDrizzleSchema } from "#/loaders/drizzle/connections/getDrizzleSchema";
import { DrizzleLoader } from "#/loaders/drizzle/DrizzleLoader";
import { getDrizzleRecords } from "#/loaders/drizzle/extractors/getDrizzleRecords";
import { getDrizzleTableConfig } from "#/loaders/drizzle/tables/getDrizzleTableConfig";

const metadata: IRecordMetadata = {
  createdAt: "2026-10-01T00:00:00Z",
  name: "example",
  title: "Example",
  updatedAt: "2026-10-01T00:00:00Z",
  version: "1.0.0",
};

const pgUsers = pgTable(
  "pg_users",
  {
    email: pgVarchar("email", { length: 128 }).notNull(),
    id: pgSerial("id").primaryKey(),
  },
  (table) => [pgUniqueIndex("pg_users_email").on(table.email)]
);
const pgPosts = pgTable("pg_posts", {
  id: pgSerial("id").primaryKey(),
  userId: pgInteger("user_id").references(() => pgUsers.id),
});
const mysqlUsers = mysqlTable(
  "mysql_users",
  {
    id: mysqlSerial("id").primaryKey(),
    name: mysqlVarchar("name", { length: 64 }),
  },
  (table) => [mysqlUniqueIndex("mysql_users_name").on(table.name)]
);
const sqliteUsers = sqliteTable(
  "sqlite_users",
  { id: sqliteInteger("id").primaryKey(), name: sqliteText("name").notNull() },
  (table) => [sqliteUniqueIndex("sqlite_users_name").on(table.name)]
);

describe(getDrizzleTableConfig, () => {
  it.each([
    [pgUsers, "pg_users"],
    [mysqlUsers, "mysql_users"],
    [sqliteUsers, "sqlite_users"],
  ])("extracts a table config for each dialect", (table, name) => {
    const config = getDrizzleTableConfig(table);
    expect(config.name).toBe(name);
    expect(config.columns.length).toBeGreaterThan(0);
    expect(config.indexes).toHaveLength(1);
  });
  it("rejects unsupported values", () => {
    expect(() => getDrizzleTableConfig({})).toThrow(
      "Unsupported Drizzle table"
    );
  });
});

describe(getDrizzleColumnType, () => {
  it("preserves the SQL type and required marker", () => {
    expect(getDrizzleColumnType(pgUsers.email)).toEqual({
      columnType: "*varchar(128)",
      columnTypeWithLength: "*varchar(128)",
    });
  });
});

describe(getDrizzleColumnAttributeKey, () => {
  it("extracts foreign, primary, and unique keys", () => {
    const users = getDrizzleTableConfig(pgUsers);
    const posts = getDrizzleTableConfig(pgPosts);
    expect(getDrizzleColumnAttributeKey(pgUsers.id, users)).toContain("PK");
    expect(getDrizzleColumnAttributeKey(pgUsers.email, users)).toContain("UK");
    expect(getDrizzleColumnAttributeKey(pgPosts.userId, posts)).toContain("FK");
  });
});

describe(getDrizzleRecords, () => {
  it("creates entity, column, index, and relation records", () => {
    const records = getDrizzleRecords(
      { db: {}, schema: { pgPosts, pgUsers } },
      metadata
    );
    expect(records.filter((record) => record.$kind === "entity")).toHaveLength(
      2
    );
    expect(
      records.find(
        (record) => record.$kind === "column" && record.dbName === "email"
      )
    ).toMatchObject({ columnType: "*varchar(128)" });
    expect(records.find((record) => record.$kind === "relation")).toMatchObject(
      {
        inverseEntityName: "pg_users",
        joinColumnName: "user_id",
        joinColumnNullable: true,
      }
    );
  });
});

describe(getDrizzleSchema, () => {
  it("prefers an explicitly provided schema", () => {
    const schema = { pgUsers };
    expect(getDrizzleSchema({ db: {}, schema })).toBe(schema);
  });

  it("reads the schema from a database instance", () => {
    const schema = { pgUsers };
    expect(getDrizzleSchema({ db: { _: { fullSchema: schema } } })).toBe(
      schema
    );
  });

  it("returns an empty schema when metadata is unavailable", () => {
    expect(getDrizzleSchema({ db: {} })).toEqual({});
  });
});

describe(DrizzleLoader, () => {
  it("delegates extraction and disposes the source", async () => {
    const dispose = vi.fn();
    const loader = new DrizzleLoader({ dispose, schema: { pgUsers } });
    await loader.initialize();
    expect(await loader.extract(metadata)).not.toHaveLength(0);
    await loader.dispose();
    expect(dispose).toHaveBeenCalledOnce();
  });
});
