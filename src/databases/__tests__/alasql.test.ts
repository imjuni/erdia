import alasql from 'alasql';
import { CE_CHANGE_KIND } from 'src/databases/interfaces/CE_CHANGE_KIND';
import type TDatabaseRecord from 'src/databases/interfaces/TDatabaseRecord';

const db: TDatabaseRecord[] = [
  {
    $kind: 'entity',
    version: '2022-11-22T11:22:33.333+09:00',
    createdAt: '2022-11-22T11:22:33.333+09:00',
    updatedAt: '2022-11-22T11:22:33.333+09:00',
    entity: 'tbl_license',
    name: 'tbl_license',
    dbName: 'License',
    change: CE_CHANGE_KIND.NONE,
    hasRelation: false,
  },
];

describe('alasql', () => {
  test('html.column.test', async () => {
    const row = await alasql.promise('SELECT * FROM ? WHERE name = ?', [db, 'tbl_license']);
    console.log(row);
  });
});
