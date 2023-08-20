import getColumnWeight from '#creators/columns/getColumnWeight';
import { CE_CHANGE_KIND } from '#databases/interfaces/CE_CHANGE_KIND';
import { consola } from 'consola';
import type { DataSource } from 'typeorm';

const share: { dataSource: DataSource } = {} as any;

beforeAll(async () => {
  share.dataSource = (await import('../../../examples/schema-type/dataSourceConfig')).default;
  await share.dataSource.initialize();
});

test('get.column.weight', async () => {
  // const expectFileName = `expect.${expect.getState().currentTestName}`;

  const weight001 = getColumnWeight({
    $kind: 'column',
    version: '1.0.0',
    createdAt: '2023-01-01T11:22:33.000+09:00',
    updatedAt: '2023-01-02T11:22:33.000+09:00',
    entity: 'testEntity',
    dbName: 'hello',
    name: 'hello',
    change: CE_CHANGE_KIND.NONE,
    attributeKey: ['PK'],
    columnType: 'number',
    isNullable: 'nullable',
    columnTypeWithLength: 'number',
    comment: 'i am comment',
    charset: '',
  });

  const weight002 = getColumnWeight({
    $kind: 'column',
    version: '1.0.0',
    createdAt: '2023-01-01T11:22:33.000+09:00',
    updatedAt: '2023-01-02T11:22:33.000+09:00',
    entity: 'testEntity',
    name: 'hello',
    dbName: 'hello',
    change: CE_CHANGE_KIND.NONE,
    attributeKey: ['FK'],
    columnType: 'varchar',
    isNullable: 'nullable',
    columnTypeWithLength: 'varchar(10)',
    comment: 'i am comment',
    charset: '',
  });

  const weight003 = getColumnWeight({
    $kind: 'column',
    version: '1.0.0',
    createdAt: '2023-01-01T11:22:33.000+09:00',
    updatedAt: '2023-01-02T11:22:33.000+09:00',
    entity: 'testEntity',
    name: 'hello',
    dbName: 'hello',
    change: CE_CHANGE_KIND.NONE,
    attributeKey: [],
    columnType: 'char',
    isNullable: 'nullable',
    columnTypeWithLength: 'char(10)',
    comment: 'i am comment',
    charset: '',
  });

  consola.log(weight001.toString(), weight002.toString(), weight003.toString());

  expect(weight001.toString()).toEqual('20649018.21');
  expect(weight002.toString()).toEqual('10743018.21');
  expect(weight003.toString()).toEqual('414018.21');
});
