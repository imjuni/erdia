import type { DataSource } from "typeorm";

import type { CE_OUTPUT_FORMAT } from "#/configs/const-enum/CE_OUTPUT_FORMAT";
import type { IRecordMetadata } from "#/databases/interfaces/IRecordMetadata";
import type { TDatabaseRecord } from "#/databases/interfaces/TDatabaseRecord";
import { getColumnRecord } from "#/loaders/typeorm/columns/getColumnRecord";
import { getEntityRecords } from "#/loaders/typeorm/entities/getEntityRecords";
import { getIndexRecords } from "#/loaders/typeorm/indices/getIndexRecords";
import { dedupeManyToManyRelationRecord } from "#/loaders/typeorm/relations/dedupeManyToManyRelationRecord";
import { getRelationRecords } from "#/loaders/typeorm/relations/getRelationRecords";

export const getTypeOrmRecords = (
  dataSource: DataSource,
  format: CE_OUTPUT_FORMAT,
  metadata: IRecordMetadata,
): TDatabaseRecord[] => {
  const indices = getIndexRecords(dataSource, metadata);
  const columns = dataSource.entityMetadatas.flatMap((entity) =>
    entity.columns.map((column) => getColumnRecord(column, { format }, metadata, indices)),
  );
  const relations = getRelationRecords(dataSource, metadata)
    .flatMap((result) => ("pass" in result ? result.pass : []))
    .flat();
  return [
    ...getEntityRecords(dataSource, metadata),
    ...columns,
    ...dedupeManyToManyRelationRecord(relations),
    ...indices,
  ];
};
