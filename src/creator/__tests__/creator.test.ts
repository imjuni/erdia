import getColumnWeight from '@creator/getColumnWeight';
import logger from '@tool/logger';
import { DataSource } from 'typeorm';

const log = logger();

const share: { dataSource: DataSource } = {} as any;

beforeAll(async () => {
  log.level = 'trace';
  share.dataSource = (await import('../../../dataSourceConfig')).default;
  await share.dataSource.initialize();
});

test('get.column.weight', async () => {
  // const expectFileName = `expect.${expect.getState().currentTestName}`;

  const weight001 = getColumnWeight({
    entityName: 'testEntity',
    propertyName: 'hello',
    columnName: 'hello',
    attributeKey: 'PK',
    columnType: 'number',
    columnTypeWithLength: 'number',
    comment: 'i am comment',
  });

  const weight002 = getColumnWeight({
    entityName: 'testEntity',
    propertyName: 'hello',
    columnName: 'hello',
    attributeKey: 'FK',
    columnType: 'varchar',
    columnTypeWithLength: 'varchar(10)',
    comment: 'i am comment',
  });

  const weight003 = getColumnWeight({
    entityName: 'testEntity',
    propertyName: 'hello',
    columnName: 'hello',
    attributeKey: '',
    columnType: 'char',
    columnTypeWithLength: 'char(10)',
    comment: 'i am comment',
  });

  log.debug(weight001.toString(), weight002.toString(), weight003.toString());

  expect(weight001.toString()).toEqual('20649018.21');
  expect(weight002.toString()).toEqual('10743018.21');
  expect(weight003.toString()).toEqual('414018.21');
});
