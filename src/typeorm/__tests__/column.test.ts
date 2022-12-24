import * as testenv from '@common/testenv';
import getColumnData from '@typeorm/getColumnData';
import fastSafeStringify from 'fast-safe-stringify';
import fs from 'fs';
import path from 'path';
import { DataSource } from 'typeorm';

const share: { dataSource: DataSource; expect: boolean } = { expect: false } as any;

beforeAll(async () => {
  share.dataSource = (await import('../../../dataSourceConfig')).default;
  await share.dataSource.initialize();
});

test('html.column.test', async () => {
  const expectFileName = `expect.${expect.getState().currentTestName}`;
  const userEntity = share.dataSource.entityMetadatas.find((entityMetadata) => entityMetadata.name === 'User');

  if (userEntity === undefined || userEntity === null) {
    throw new Error('Cannot found user entity');
  }

  const columns = userEntity.columns
    .map((column) => getColumnData(column, testenv.htmlOption))
    .sort((l, r) => l.entityName.localeCompare(r.entityName));
  const expectation = await import(path.join(__dirname, 'expects', expectFileName));

  if (share.expect) {
    fs.writeFileSync(`${expectFileName}.json`, fastSafeStringify(columns, undefined, 2));
  }

  expect(columns).toMatchObject(expectation.default);
});

test('markdown.column.test', async () => {
  const expectFileName = `expect.${expect.getState().currentTestName}`;
  const userEntity = share.dataSource.entityMetadatas.find((entityMetadata) => entityMetadata.name === 'User');

  if (userEntity === undefined || userEntity === null) {
    throw new Error('Cannot found user entity');
  }

  const columns = userEntity.columns
    .map((column) => getColumnData(column, testenv.markdownOption))
    .sort((l, r) => l.entityName.localeCompare(r.entityName));
  const expectation = await import(path.join(__dirname, 'expects', expectFileName));

  if (share.expect) {
    fs.writeFileSync(`${expectFileName}.json`, fastSafeStringify(columns, undefined, 2));
  }

  expect(columns).toMatchObject(expectation.default);
});
