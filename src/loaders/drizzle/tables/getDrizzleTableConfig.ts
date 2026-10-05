import { is } from "drizzle-orm";
import { getTableConfig as getMysqlTableConfig, MySqlTable } from "drizzle-orm/mysql-core";
import { getTableConfig as getPgTableConfig, PgTable } from "drizzle-orm/pg-core";
import { getTableConfig as getSqliteTableConfig, SQLiteTable } from "drizzle-orm/sqlite-core";

import type {
  IDrizzleIndex,
  IDrizzleTableConfig,
} from "#/loaders/drizzle/interfaces/IDrizzleTableConfig";

const normalizeIndex = (index: {
  config: { name?: string; columns: unknown[]; unique?: boolean };
}): IDrizzleIndex => ({
  columns: index.config.columns.filter(
    (column): column is IDrizzleIndex["columns"][number] =>
      typeof column === "object" && column !== null && "name" in column,
  ),
  isUnique: index.config.unique ?? false,
  name: index.config.name ?? "",
});

export const getDrizzleTableConfig = (table: unknown): IDrizzleTableConfig => {
  if (is(table, PgTable)) {
    const config = getPgTableConfig(table);
    return { ...config, indexes: config.indexes.map(normalizeIndex) };
  }
  if (is(table, MySqlTable)) {
    const config = getMysqlTableConfig(table);
    return { ...config, indexes: config.indexes.map(normalizeIndex) };
  }
  if (is(table, SQLiteTable)) {
    const config = getSqliteTableConfig(table);
    return { ...config, indexes: config.indexes.map(normalizeIndex) };
  }
  throw new Error("Unsupported Drizzle table");
};
