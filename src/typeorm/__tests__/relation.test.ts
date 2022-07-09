import logger from '@tool/logger';
import getRelationData from '@typeorm/getRelationData';
import fastSafeStringify from 'fast-safe-stringify';
import fs from 'fs';
import { IPass, isPass, TPickPass } from 'my-only-either';
import path from 'path';
import { DataSource } from 'typeorm';

const share: { dataSource: DataSource; expect: boolean } = { expect: false } as any;

const log = logger();

beforeAll(async () => {
  log.level = 'trace';
  share.dataSource = (await import('../../../dataSourceConfig')).default;
  await share.dataSource.initialize();
});

test('html.relation.test', async () => {
  const expectFileName = `expect.${expect.getState().currentTestName}`;

  const relations = share.dataSource.entityMetadatas
    .map((entity) => {
      log.debug(`relation count: ${entity.relations.length}`);

      const partialRelations = entity.relations
        .map((relation) => getRelationData(share.dataSource.entityMetadatas, relation))
        .filter((relation): relation is IPass<TPickPass<ReturnType<typeof getRelationData>>> => isPass(relation))
        .map((relation) => relation.pass)
        .flat()
        .sort((l, r) => l.relationHash.localeCompare(r.relationHash));

      return partialRelations;
    })
    .flat();

  const expectation = await import(path.join(__dirname, 'expects', expectFileName));

  if (share.expect) {
    fs.writeFileSync(`${expectFileName}.json`, fastSafeStringify(relations, undefined, 2));
  }

  expect(relations).toEqual(expectation.default);
});
