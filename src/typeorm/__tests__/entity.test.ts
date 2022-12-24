import * as testenv from '@common/testenv';
import logger from '@tool/logger';
import getEntityData from '@typeorm/getEntityData';
import fastSafeStringify from 'fast-safe-stringify';
import fs from 'fs';
import path from 'path';
import { DataSource } from 'typeorm';

const share: { dataSource: DataSource; expect: boolean } = { expect: false } as any;

const log = logger();

beforeAll(async () => {
  log.level = 'trace';
  share.dataSource = (await import('../../../dataSourceConfig')).default;
  await share.dataSource.initialize();
});

test('html.entity.test', async () => {
  const expectFileName = `expect.${expect.getState().currentTestName}`;
  const entities = share.dataSource.entityMetadatas;

  if (entities.length <= 0) {
    throw new Error('Cannot found User, Photo entity');
  }

  const tableDatas = entities
    .map((entity) => getEntityData(entity, testenv.htmlOption))
    .sort((l, r) => l.entityName.localeCompare(r.entityName));
  const expectation = await import(path.join(__dirname, 'expects', expectFileName));

  if (share.expect) {
    fs.writeFileSync(`${expectFileName}.json`, fastSafeStringify(tableDatas, undefined, 2));
  }

  expect(tableDatas).toMatchObject(expectation.default);
});

test('markdown.entity.test', async () => {
  const expectFileName = `expect.${expect.getState().currentTestName}`;
  const entities = share.dataSource.entityMetadatas;

  if (entities.length <= 0) {
    throw new Error('Cannot found User, Photo entity');
  }

  const tableDatas = entities
    .map((entity) => getEntityData(entity, testenv.markdownOption))
    .sort((l, r) => l.entityName.localeCompare(r.entityName));
  const expectation = await import(path.join(__dirname, 'expects', expectFileName));

  if (share.expect) {
    fs.writeFileSync(`${expectFileName}.json`, fastSafeStringify(tableDatas, undefined, 2));
  }

  expect(tableDatas).toMatchObject(expectation.default);
});
