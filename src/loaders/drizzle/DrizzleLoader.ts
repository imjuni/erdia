/* oxlint-disable complexity, class-methods-use-this */
import { getTableConfig as getMysqlTableConfig } from "drizzle-orm/mysql-core";
import { getTableConfig } from "drizzle-orm/pg-core";
import { getTableConfig as getSqliteTableConfig } from "drizzle-orm/sqlite-core";

import type { IRecordMetadata } from "#/databases/interfaces/IRecordMetadata";
import type { TDatabaseRecord } from "#/databases/interfaces/TDatabaseRecord";
import type { IDrizzleSource } from "#/loaders/interfaces/IDrizzleSource";
import type { ISchemaLoader } from "#/loaders/interfaces/ISchemaLoader";

type Table = Record<string | symbol, unknown>;
const text = (value: unknown) => (typeof value === "string" ? value : "");
const tableName = (table: Table) => text(table[Symbol.for("drizzle:Name")]);
const columns = (table: Table) =>
  (table[Symbol.for("drizzle:Columns")] ?? {}) as Record<string, Table>;

export class DrizzleLoader implements ISchemaLoader {
  readonly name = "drizzle" as const;
  private readonly source: IDrizzleSource;
  public constructor(source: IDrizzleSource) {
    this.source = source;
  }
  /* oxlint-disable-next-line eslint(class-methods-use-this) */
  public initialize() {
    return Promise.resolve();
  }
  public async dispose() {
    await this.source.dispose?.();
  }
  /* oxlint-disable-next-line eslint(complexity) */
  public extract(metadata: IRecordMetadata): Promise<TDatabaseRecord[]> {
    const records: TDatabaseRecord[] = [];
    const schema = this.source.schema ?? this.schemaFromDatabase();

    for (const tableValue of Object.values(schema)) {
      if (!DrizzleLoader.isTable(tableValue)) {
        continue;
      }

      const config = DrizzleLoader.tableConfig(tableValue);
      const name = text(config.name) || tableName(tableValue);

      records.push({
        $kind: "entity",
        ...metadata,
        change: "add",
        entity: name,
        name,
        dbName: name,
        hasRelation: config.foreignKeys.length > 0,
      });

      const primary = new Set(
        config.primaryKeys.flatMap((key) =>
          DrizzleLoader.list(key.columns).map((column) =>
            text(column[Symbol.for("drizzle:Name")]),
          ),
        ),
      );

      for (const [property, column] of Object.entries(columns(tableValue))) {
        const columnName = text(column[Symbol.for("drizzle:Name")]) || property;
        const sqlType =
          text(DrizzleLoader.call(column.getSQLType)) ||
          text(column.columnType) ||
          "unknown";
        const length =
          column.length ??
          (column.config as { length?: unknown } | undefined)?.length;
        const nullable = column.notNull === true ? "not-null" : "nullable";
        records.push({
          $kind: "column",
          ...metadata,
          change: "add",
          entity: name,
          name: property,
          dbName: columnName,
          attributeKey: primary.has(columnName) ? ["PK"] : [],
          columnType: sqlType,
          columnTypeWithLength: length ? `${sqlType}(${length})` : sqlType,
          isNullable: nullable,
          charset: "",
          comment: text(column.comment),
          weight: 0,
        });
      }

      for (const index of config.indexes) {
        const indexConfig = (index.config ?? index) as Record<string, unknown>;
        records.push({
          $kind: "index",
          ...metadata,
          change: "add",
          entity: name,
          name: text(indexConfig.name) || text(index.name),
          dbName: text(indexConfig.name) || text(index.name),
          tableName: name,
          tableDBName: name,
          isUnique: Boolean(indexConfig.unique),
          isFulltext: false,
          isSpatial: false,
          columnNames: DrizzleLoader.list(indexConfig.columns).map((column) =>
            text(column[Symbol.for("drizzle:Name")]),
          ),
        });
      }

      for (const foreignKey of config.foreignKeys) {
        const reference = DrizzleLoader.call(foreignKey.reference) as Record<
          string,
          unknown
        >;
        const from = DrizzleLoader.list(reference.columns);
        const to = DrizzleLoader.list(reference.foreignColumns);
        const foreignTable = reference.foreignTable as Table | undefined;
        const inverse =
          foreignTable === undefined ? "unknown" : tableName(foreignTable);
        const fromName = text(from[0]?.[Symbol.for("drizzle:Name")]);
        records.push({
          $kind: "relation",
          ...metadata,
          change: "add",
          entity: name,
          name: fromName,
          dbName: name,
          inverseEntityName: inverse,
          inverseEntityDBName: inverse,
          joinPropertyName: fromName,
          joinColumnName: fromName,
          inverseJoinColumnName: text(to[0]?.[Symbol.for("drizzle:Name")]),
          joinColumnOne: false,
          joinColumnNullable: true,
          inverseJoinColumnOne: true,
          inverseJoinColumnNullable: false,
          relationType: "many-to-one",
          relationHash: `${name}:${inverse}`,
          order: 1,
          isDuplicate: false,
        });
      }
    }

    return Promise.resolve(records);
  }
  private schemaFromDatabase() {
    const db = this.source.db as {
      _: { fullSchema?: Record<string, unknown> };
    };
    return db._?.fullSchema ?? {};
  }
  private static isTable(value: unknown): value is Table {
    return (
      typeof value === "object" &&
      value !== null &&
      Symbol.for("drizzle:Columns") in value
    );
  }
  private static tableConfig(table: Table) {
    try {
      return getTableConfig(table as never) as unknown as {
        name: string;
        columns: Table[];
        indexes: Table[];
        foreignKeys: Table[];
        primaryKeys: Table[];
      };
    } catch {
      try {
        return getMysqlTableConfig(table as never) as unknown as {
          name: string;
          columns: Table[];
          indexes: Table[];
          foreignKeys: Table[];
          primaryKeys: Table[];
        };
      } catch {
        return getSqliteTableConfig(table as never) as unknown as {
          name: string;
          columns: Table[];
          indexes: Table[];
          foreignKeys: Table[];
          primaryKeys: Table[];
        };
      }
    }
  }
  private static list(value: unknown): Table[] {
    return Array.isArray(value)
      ? value.filter(
          (item): item is Table => typeof item === "object" && item !== null,
        )
      : [];
  }
  private static call(value: unknown): unknown {
    return typeof value === "function" ? (value as () => unknown)() : undefined;
  }
}
/* oxlint-disable complexity, class-methods-use-this */
