import * as testenv from '@common/testenv';
import getEntityDiagramData from '@creator/getEntityDiagramData';
import logger from '@tool/logger';
import getEntityData from '@typeorm/getEntityData';
import fastSafeStringify from 'fast-safe-stringify';
import fs from 'fs';
import path from 'path';
import { DataSource } from 'typeorm';

const log = logger();

const share: { dataSource: DataSource; expect: boolean } = { expect: false } as any;

beforeAll(async () => {
  log.level = 'trace';
  share.dataSource = (await import('../../../dataSourceConfig')).default;
  await share.dataSource.initialize();
});

test('partial.column.entity.test', async () => {
  const expectFileName = `expect.${expect.getState().currentTestName}`;
  const userEntity = share.dataSource.entityMetadatas.find((entityMetadata) => entityMetadata.name === 'User');

  if (userEntity === undefined || userEntity === null) {
    throw new Error('Cannot found user entity');
  }

  const entityData = getEntityData(userEntity, testenv.htmlOption);
  const diagramEntityData = getEntityDiagramData(entityData, testenv.htmlOption);

  if (share.expect) {
    fs.writeFileSync('__expect.json', fastSafeStringify(diagramEntityData, undefined, 2));
  }

  const expectation = await import(path.join(__dirname, 'expects', expectFileName));

  expect(diagramEntityData).toEqual(expectation.default);
});

test('full.column.entity.test', async () => {
  const expectFileName = `expect.${expect.getState().currentTestName}`;
  const userEntity = share.dataSource.entityMetadatas.find((entityMetadata) => entityMetadata.name === 'User');

  if (userEntity === undefined || userEntity === null) {
    throw new Error('Cannot found user entity');
  }

  const entityData = getEntityData(userEntity, testenv.htmlOption);
  const diagramEntityData = getEntityDiagramData(entityData, {
    ...testenv.htmlOption,
    erColumns: ['attribute-key', 'comment'],
  });

  log.debug(expectFileName);

  if (share.expect) {
    fs.writeFileSync('__expect.json', fastSafeStringify(diagramEntityData, undefined, 2));
  }

  const expectation = await import(path.join(__dirname, 'expects', expectFileName));

  expect(diagramEntityData).toEqual(expectation.default);
});
