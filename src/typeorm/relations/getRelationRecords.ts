import type IRecordMetadata from '#databases/interfaces/IRecordMetadata';
import getEntityName from '#typeorm/entities/getEntityName';
import getRelationRecord from '#typeorm/relations/getRelationRecord';
import consola from 'consola';
import type { DataSource } from 'typeorm';

export default function getRelationRecords(
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
