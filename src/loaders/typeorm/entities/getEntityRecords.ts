import type { DataSource } from "typeorm";

import type { IEntityRecord } from "#/databases/interfaces/IEntityRecord";
import type { IRecordMetadata } from "#/databases/interfaces/IRecordMetadata";
import { getEntityRecord } from "#/loaders/typeorm/entities/getEntityRecord";

export function getEntityRecords(
  dataSource: DataSource,
  metadata: IRecordMetadata
): IEntityRecord[] {
  const entityRecords = dataSource.entityMetadatas.map((entityMetadata) =>
    getEntityRecord(entityMetadata, metadata)
  );

  const entityMap = entityRecords.reduce<Record<string, IEntityRecord>>(
    (map, record) => ({ ...map, [record.name]: record }),
    {}
  );

  const deduped = Object.values(entityMap);

  return deduped;
}
