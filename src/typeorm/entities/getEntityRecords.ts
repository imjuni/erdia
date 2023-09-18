import type IEntityRecord from 'src/databases/interfaces/IEntityRecord';
import type IRecordMetadata from 'src/databases/interfaces/IRecordMetadata';
import type TDatabaseRecord from 'src/databases/interfaces/TDatabaseRecord';
import getEntityRecord from 'src/typeorm/entities/getEntityRecord';
import { type DataSource } from 'typeorm';

export default function getEntityRecords(dataSource: DataSource, metadata: IRecordMetadata): TDatabaseRecord[] {
  const entityRecords = dataSource.entityMetadatas.map((entityMetadata) => getEntityRecord(entityMetadata, metadata));

  const entityMap = entityRecords.reduce<Record<string, IEntityRecord>>((map, record) => {
    return { ...map, [record.name]: record };
  }, {});

  const deduped = Object.values(entityMap);

  return deduped;
}
