import { CE_CHANGE_KIND } from '#/databases/const-enum/CE_CHANGE_KIND';
import { getEntityName } from '#/typeorm/entities/getEntityName';

import type { EntityMetadata } from 'typeorm';

import type { IEntityRecord } from '#/databases/interfaces/IEntityRecord';
import type { IRecordMetadata } from '#/databases/interfaces/IRecordMetadata';

export function getEntityRecord(entityMetadata: EntityMetadata, metadata: IRecordMetadata): IEntityRecord {
  const record: IEntityRecord = {
    $kind: 'entity',
    ...metadata,
    change: CE_CHANGE_KIND.ADD,
    entity: getEntityName(entityMetadata),
    name: entityMetadata.name,
    dbName: entityMetadata.tableName,
    hasRelation: entityMetadata.relations.length > 0,
  };

  return record;
}
