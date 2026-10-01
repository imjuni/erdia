import type { DataSource } from "typeorm";

import { getIndexHash } from "#/common/getIndexHash";
import type { IIndexRecord } from "#/databases/interfaces/IIndexRecord";
import type { IRecordMetadata } from "#/databases/interfaces/IRecordMetadata";
import { getIndexRecord } from "#/typeorm/indices/getIndexRecord";

export function getIndexRecords(
  dataSource: DataSource,
  metadata: IRecordMetadata
): IIndexRecord[] {
  const indexRecords = dataSource.entityMetadatas
    .flatMap((entityMetadata) => getIndexRecord(entityMetadata, metadata));

  const dedupedMap = indexRecords.reduce<Record<string, IIndexRecord>>(
    (aggregation, indexRecord) => ({
      ...aggregation,
      [getIndexHash(indexRecord)]: indexRecord,
    }),
    {}
  );

  const deduped = Object.values(dedupedMap);

  return deduped;
}
