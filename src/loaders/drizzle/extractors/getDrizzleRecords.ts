import type { IRecordMetadata } from "#/databases/interfaces/IRecordMetadata";
import type { TDatabaseRecord } from "#/databases/interfaces/TDatabaseRecord";
import { getDrizzleColumnRecord } from "#/loaders/drizzle/columns/getDrizzleColumnRecord";
import { getDrizzleSchema } from "#/loaders/drizzle/connections/getDrizzleSchema";
import { getDrizzleEntityRecord } from "#/loaders/drizzle/entities/getDrizzleEntityRecord";
import { getDrizzleIndexRecord } from "#/loaders/drizzle/indices/getDrizzleIndexRecord";
import type { IDrizzleSource } from "#/loaders/drizzle/interfaces/IDrizzleSource";
import { getDrizzleRelationRecord } from "#/loaders/drizzle/relations/getDrizzleRelationRecord";
import { getDrizzleRelationForeignKeys } from "#/loaders/drizzle/relations/getDrizzleRelationForeignKeys";
import { getDrizzleTableConfig } from "#/loaders/drizzle/tables/getDrizzleTableConfig";
import { isDrizzleTable } from "#/loaders/drizzle/tables/isDrizzleTable";

export const getDrizzleRecords = (
  source: Pick<IDrizzleSource, "db" | "schema">,
  metadata: IRecordMetadata,
): TDatabaseRecord[] => {
  const schema = getDrizzleSchema(source);
  return Object.values(schema)
    .filter(isDrizzleTable)
    .flatMap((table) => {
      const rawConfig = getDrizzleTableConfig(table);
      const relationKeys = getDrizzleRelationForeignKeys(schema, table);
      const foreignKeys = [...rawConfig.foreignKeys];
      for (const key of relationKeys) {
        const reference = key.reference();
        const duplicate = foreignKeys.some((existing) => {
          const current = existing.reference();
          return (
            current.foreignTable === reference.foreignTable &&
            current.columns.length === reference.columns.length &&
            current.columns.every(
              (column, index) =>
                column === reference.columns[index] &&
                current.foreignColumns[index] === reference.foreignColumns[index],
            )
          );
        });
        if (!duplicate) foreignKeys.push(key);
      }
      const config = { ...rawConfig, foreignKeys };
      return [
        getDrizzleEntityRecord(config, metadata),
        ...config.columns.map((column) => getDrizzleColumnRecord(column, config, metadata)),
        ...config.indexes.map((index) => getDrizzleIndexRecord(index, config.name, metadata)),
        ...config.foreignKeys.map((foreignKey) =>
          getDrizzleRelationRecord(foreignKey, config.name, metadata),
        ),
      ];
    });
};
