import { consola } from "consola";
import type { DataSource } from "typeorm";

import type { IRecordMetadata } from "#/databases/interfaces/IRecordMetadata";
import { getEntityName } from "#/loaders/typeorm/entities/getEntityName";
import { getRelationRecord } from "#/loaders/typeorm/relations/getRelationRecord";

export const getRelationRecords = (
  dataSource: DataSource,
  metadata: IRecordMetadata
): ReturnType<typeof getRelationRecord>[] => {
  const relationRecords = dataSource.entityMetadatas.flatMap(
    (entityMetadata) => {
      consola.debug(
        `Entity: ${getEntityName(entityMetadata)}, Length: ${entityMetadata.relations.length}`
      );
      return entityMetadata.relations.map((relation) =>
        getRelationRecord(dataSource.entityMetadatas, relation, metadata)
      );
    }
  );
  return relationRecords;
};
