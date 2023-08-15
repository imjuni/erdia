import type IEntityRecord from '#databases/interfaces/IEntityRecord';
import type IRecordMetadata from '#databases/interfaces/IRecordMetadata';
import type TDatabaseRecord from '#databases/interfaces/TDatabaseRecord';
import getEntityRecord from '#typeorm/entities/getEntityRecord';
import { type DataSource } from 'typeorm';

export default function getEntityRecords(dataSource: DataSource, metadata: IRecordMetadata): TDatabaseRecord[] {
  const entityRecords = dataSource.entityMetadatas.map((entityMetadata) => getEntityRecord(entityMetadata, metadata));

  const entityMap = entityRecords.reduce<Record<string, IEntityRecord>>((map, record) => {
    return { ...map, [record.name]: record };
  }, {});

  const deduped = Object.values(entityMap);

  return deduped;
}
