import type { IColumnRecord } from '#/databases/interfaces/IColumnRecord';

export function getColumnHash(column: Pick<IColumnRecord, 'entity' | 'dbName'>): string {
  const baseHash = [column.entity, column.dbName].join(':');
  const base64 = Buffer.from(baseHash).toString('base64');

  return base64;
}
