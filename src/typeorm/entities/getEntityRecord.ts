import { CE_CHANGE_KIND } from 'src/databases/interfaces/CE_CHANGE_KIND';
import type IEntityRecord from 'src/databases/interfaces/IEntityRecord';
import type IRecordMetadata from 'src/databases/interfaces/IRecordMetadata';
import getEntityName from 'src/typeorm/entities/getEntityName';
import type { EntityMetadata } from 'typeorm';

export default function getEntityRecord(entityMetadata: EntityMetadata, metadata: IRecordMetadata): IEntityRecord {
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
