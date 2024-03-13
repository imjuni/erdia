import { CE_CHANGE_KIND } from '#/databases/const-enum/CE_CHANGE_KIND';
import { CE_RECORD_KIND } from '#/databases/const-enum/CE_RECORD_KIND';
import type { IIndexRecord } from '#/databases/interfaces/IIndexRecord';
import type { IRecordMetadata } from '#/databases/interfaces/IRecordMetadata';
import { getEntityName } from '#/typeorm/entities/getEntityName';
import type { EntityMetadata } from 'typeorm';

export function getIndexRecord(entityMetadata: EntityMetadata, metadata: IRecordMetadata) {
  const indices = entityMetadata.indices.map((entityIndex) => {
    const record: IIndexRecord = {
      $kind: CE_RECORD_KIND.INDEX,
      ...metadata,
      change: CE_CHANGE_KIND.NONE,
      entity: getEntityName(entityMetadata),
      name: entityIndex.givenName ?? entityIndex.name,
      dbName: entityIndex.name,
      tableName: entityMetadata.name,
      tableDBName: entityMetadata.tableName,
      isUnique: entityIndex.isUnique,
      isFulltext: entityIndex.isFulltext,
      isSpatial: entityIndex.isSpatial ?? false,
      columnNames: entityIndex.columns.map((column) => column.databaseName),
    };
    return record;
  });

  const uniques = entityMetadata.uniques.map((entityUnique) => {
    const record: IIndexRecord = {
      $kind: CE_RECORD_KIND.INDEX,
      ...metadata,
      change: CE_CHANGE_KIND.NONE,
      entity: getEntityName(entityMetadata),
      name: entityUnique.givenName ?? entityUnique.name,
      dbName: entityUnique.name,
      tableName: entityMetadata.name,
      tableDBName: entityMetadata.tableName,
      isUnique: true,
      isFulltext: false,
      isSpatial: false,
      columnNames: entityUnique.columns.map((column) => column.databaseName),
    };
    return record;
  });

  return [...indices, ...uniques];
}
