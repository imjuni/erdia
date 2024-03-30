import { CE_CHANGE_KIND } from '#/databases/const-enum/CE_CHANGE_KIND';
import type { IEntityRecord } from '#/databases/interfaces/IEntityRecord';
import type { IRecordMetadata } from '#/databases/interfaces/IRecordMetadata';
import { getEntityName } from '#/typeorm/entities/getEntityName';
import { getEntityPropertyName } from '#/typeorm/entities/getEntityPropertyName';
import { getEntityRecord } from '#/typeorm/entities/getEntityRecord';
import { getEntityRecords } from '#/typeorm/entities/getEntityRecords';
import fastSafeStringify from 'fast-safe-stringify';
import fs from 'fs';
import { parse } from 'jsonc-parser';
import path from 'path';
import type { DataSource } from 'typeorm';
import { beforeAll, describe, expect, test } from 'vitest';

const share: { dataSource: DataSource; expect: boolean } = { expect: false } as any;

beforeAll(async () => {
  share.dataSource = await (await import('../../../../examples/async-schema-type/dataSourceConfig')).default;
  await share.dataSource.initialize();
});

describe('getEntityName', () => {
  test('record > db-name', async () => {
    const name = getEntityName({
      $kind: 'entity',
      version: 'i-am-entity-version',
      createdAt: '2023-01-01T11:22:33.000+09:00',
      updatedAt: '2023-01-02T11:22:33.000+09:00',
      entity: 'i-am-table-name',
      dbName: 'i-am-db-name',
      change: CE_CHANGE_KIND.NONE,
      name: 'i-am-property-name',
      hasRelation: false,
    } satisfies IEntityRecord);

    expect(name).toEqual('i-am-db-name');
  });

  test('record > property-name', async () => {
    const name = getEntityName({
      $kind: 'entity',
      version: 'i-am-entity-version',
      createdAt: '2023-01-01T11:22:33.000+09:00',
      updatedAt: '2023-01-02T11:22:33.000+09:00',
      entity: 'i-am-table-name',
      dbName: '',
      change: CE_CHANGE_KIND.NONE,
      name: 'i-am-property-name',
      hasRelation: false,
    } satisfies IEntityRecord);

    expect(name).toEqual('i-am-property-name');
  });

  test('entity > table-name', async () => {
    const name = getEntityName({
      tableName: 'i-am-table-name',
      name: 'i-am-property-name',
    });

    expect(name).toEqual('i-am-table-name');
  });

  test('table > property-name', async () => {
    const name = getEntityName({
      tableName: '',
      name: 'i-am-property-name',
    });

    expect(name).toEqual('i-am-property-name');
  });
});

describe('getEntityPropertyName', () => {
  test('record > property-name', async () => {
    const name = getEntityPropertyName({
      $kind: 'entity',
      version: 'i-am-entity-version',
      createdAt: '2023-01-01T11:22:33.000+09:00',
      updatedAt: '2023-01-02T11:22:33.000+09:00',
      entity: 'i-am-table-name',
      dbName: 'i-am-table-name',
      change: CE_CHANGE_KIND.NONE,
      name: 'i-am-property-name',
      hasRelation: false,
    } satisfies IEntityRecord);

    expect(name).toEqual('i-am-property-name');
  });

  test('record > table-name', async () => {
    const name = getEntityPropertyName({
      $kind: 'entity',
      version: 'i-am-entity-version',
      createdAt: '2023-01-01T11:22:33.000+09:00',
      updatedAt: '2023-01-02T11:22:33.000+09:00',
      entity: 'i-am-table-name',
      dbName: 'i-am-table-name',
      change: CE_CHANGE_KIND.NONE,
      name: '',
      hasRelation: false,
    } satisfies IEntityRecord);

    expect(name).toEqual('i-am-table-name');
  });

  test('entity > table-name', async () => {
    const name = getEntityPropertyName({
      tableName: 'i-am-table-name',
      name: 'i-am-property-name',
    });

    expect(name).toEqual('i-am-property-name');
  });

  test('table > property-name', async () => {
    const name = getEntityPropertyName({
      tableName: 'i-am-property-name',
      name: '',
    });

    expect(name).toEqual('i-am-property-name');
  });
});

describe('getEntityRecord', () => {
  test('pass', async () => {
    const expectFileName = `expect.${expect.getState().currentTestName}`.replaceAll(' ', '-');
    const metadata: IRecordMetadata = {
      name: 'i-am-application-name',
      version: '1.0.0',
      createdAt: '2023-01-01T11:22:33.000+09:00',
      updatedAt: '2023-01-02T11:22:33.000+09:00',
    };
    const entities = share.dataSource.entityMetadatas;

    if (entities.length <= 0) {
      throw new Error('Cannot found User, Photo entity');
    }

    const tableDatas = entities
      .map((entity) => getEntityRecord(entity, metadata))
      .sort((l, r) => l.name.localeCompare(r.name));

    if (share.expect) {
      fs.writeFileSync(
        path.join(__dirname, 'expects', `${expectFileName}.json`),
        fastSafeStringify(tableDatas, undefined, 2),
      );
    }

    const expectation = parse(
      (await fs.promises.readFile(path.join(__dirname, 'expects', `${expectFileName}.json`))).toString(),
    ) as object;

    expect(tableDatas).toMatchObject(expectation);
  });
});

describe('getEntityRecords', () => {
  test('pass', async () => {
    const expectFileName = `expect.${expect.getState().currentTestName}`.replaceAll(' ', '-');
    const metadata: IRecordMetadata = {
      name: 'i-am-application-name',
      version: '1.0.0',
      createdAt: '2023-01-01T11:22:33.000+09:00',
      updatedAt: '2023-01-02T11:22:33.000+09:00',
    };

    const records = getEntityRecords(share.dataSource, metadata);

    if (share.expect) {
      fs.writeFileSync(
        path.join(__dirname, 'expects', `${expectFileName}.json`),
        fastSafeStringify(records, undefined, 2),
      );
    }

    const expectation = parse(
      (await fs.promises.readFile(path.join(__dirname, 'expects', `${expectFileName}.json`))).toString(),
    ) as object;

    expect(records).toMatchObject(expectation);
  });
});
