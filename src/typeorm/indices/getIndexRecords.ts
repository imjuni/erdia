import getIndexHash from '#/common/getIndexHash';
import type IIndexRecord from '#/databases/interfaces/IIndexRecord';
import type IRecordMetadata from '#/databases/interfaces/IRecordMetadata';
import getIndexRecord from '#/typeorm/indices/getIndexRecord';
import { type DataSource } from 'typeorm';

export default function getIndexRecords(dataSource: DataSource, metadata: IRecordMetadata): IIndexRecord[] {
  const indexRecords = dataSource.entityMetadatas
    .map((entityMetadata) => getIndexRecord(entityMetadata, metadata))
    .flat();

  const dedupedMap = indexRecords.reduce<Record<string, IIndexRecord>>((aggregation, indexRecord) => {
    return { ...aggregation, [getIndexHash(indexRecord)]: indexRecord };
  }, {});

  const deduped = Object.values(dedupedMap);

  return deduped;
}
