import type { IIndexRecord } from '#/databases/interfaces/IIndexRecord';

export function getIndexHash(column: Pick<IIndexRecord, 'entity' | 'dbName'>): string {
  const baseHash = [column.entity, column.dbName].join(':');
  const base64 = Buffer.from(baseHash).toString('base64');

  return base64;
}
