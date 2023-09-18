import type IColumnRecord from 'src/databases/interfaces/IColumnRecord';

export default function getColumnHash(column: Pick<IColumnRecord, 'entity' | 'dbName'>): string {
  const baseHash = [column.entity, column.dbName].join(':');
  const base64 = Buffer.from(baseHash).toString('base64');

  return base64;
}
