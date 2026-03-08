import consola from 'consola';

import { getEntityName } from '#/typeorm/entities/getEntityName';
import { getRelationRecord } from '#/typeorm/relations/getRelationRecord';

import type { DataSource } from 'typeorm';

import type { IRecordMetadata } from '#/databases/interfaces/IRecordMetadata';

export function getRelationRecords(
  dataSource: DataSource,
  metadata: IRecordMetadata,
): ReturnType<typeof getRelationRecord>[] {
  const relationRecords = dataSource.entityMetadatas
    .map((entityMetadata) => {
      consola.debug(`Entity: ${getEntityName(entityMetadata)}, Length: ${entityMetadata.relations.length}`);

      return entityMetadata.relations.map((relation) =>
        getRelationRecord(dataSource.entityMetadatas, relation, metadata),
      );
    })
    .flat();

  return relationRecords;
}
