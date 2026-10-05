import type { IRecordMetadata } from "#/databases/interfaces/IRecordMetadata";
import type { TDatabaseRecord } from "#/databases/interfaces/TDatabaseRecord";
import { getDrizzleColumnRecord } from "#/loaders/drizzle/columns/getDrizzleColumnRecord";
import { getDrizzleSchema } from "#/loaders/drizzle/connections/getDrizzleSchema";
import { getDrizzleEntityRecord } from "#/loaders/drizzle/entities/getDrizzleEntityRecord";
import { getDrizzleIndexRecord } from "#/loaders/drizzle/indices/getDrizzleIndexRecord";
import type { IDrizzleSource } from "#/loaders/drizzle/interfaces/IDrizzleSource";
import { getDrizzleRelationRecord } from "#/loaders/drizzle/relations/getDrizzleRelationRecord";
import { getDrizzleTableConfig } from "#/loaders/drizzle/tables/getDrizzleTableConfig";
import { isDrizzleTable } from "#/loaders/drizzle/tables/isDrizzleTable";

export const getDrizzleRecords = (
  source: Pick<IDrizzleSource, "db" | "schema">,
  metadata: IRecordMetadata,
): TDatabaseRecord[] =>
  Object.values(getDrizzleSchema(source))
    .filter(isDrizzleTable)
    .flatMap((table) => {
      const config = getDrizzleTableConfig(table);
      return [
        getDrizzleEntityRecord(config, metadata),
        ...config.columns.map((column) => getDrizzleColumnRecord(column, config, metadata)),
        ...config.indexes.map((index) => getDrizzleIndexRecord(index, config.name, metadata)),
        ...config.foreignKeys.map((foreignKey) =>
          getDrizzleRelationRecord(foreignKey, config.name, metadata),
        ),
      ];
    });
