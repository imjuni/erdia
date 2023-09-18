import * as gjc from '#/common/getRelationHash';
import type IRecordMetadata from '#/databases/interfaces/IRecordMetadata';
import getRelationRecord from '#/typeorm/relations/getRelationRecord';
import getRelationRecords from '#/typeorm/relations/getRelationRecords';
import fastSafeStringify from 'fast-safe-stringify';
import fs from 'fs';
import { parse } from 'jsonc-parser';
import { findOrThrow } from 'my-easy-fp';
import path from 'path';
import type { DataSource } from 'typeorm';

const share: { dataSource: DataSource; expect: boolean } = { expect: false } as any;

beforeAll(async () => {
  share.dataSource = (await import('../../../../examples/schema-type/dataSourceConfig')).default;
  await share.dataSource.initialize();
});

afterAll(async () => {
  await share.dataSource.destroy();
});

describe('getRelationRecord', () => {
  test('pass', async () => {
    const expectFileName = `expect.${expect.getState().currentTestName}`.replaceAll(' ', '-');
    const metadata: IRecordMetadata = {
      name: 'i-am-application-name',
      version: '1.0.0',
      createdAt: '2023-01-01T11:22:33.000+09:00',
      updatedAt: '2023-01-02T11:22:33.000+09:00',
    };
    const relationMetadata = findOrThrow(
      findOrThrow(share.dataSource.entityMetadatas, (entity) => {
        return entity.name === 'License';
      }).relations,
      (relation) => {
        return relation.propertyName === 'user';
      },
    );

    const relation = getRelationRecord(share.dataSource.entityMetadatas, relationMetadata, metadata);

    if (share.expect) {
      fs.writeFileSync(
        path.join(__dirname, 'expects', `${expectFileName}.json`),
        fastSafeStringify(relation, undefined, 2),
      );
    }

    const expectation = parse(
      (await fs.promises.readFile(path.join(__dirname, 'expects', `${expectFileName}.json`))).toString(),
    ) as object;

    expect(relation).toMatchObject(expectation);
  });

  test('pass - many-to-many', async () => {
    const expectFileName = `expect.${expect.getState().currentTestName}`.replaceAll(' ', '-');
    const metadata: IRecordMetadata = {
      name: 'i-am-application-name',
      version: '1.0.0',
      createdAt: '2023-01-01T11:22:33.000+09:00',
      updatedAt: '2023-01-02T11:22:33.000+09:00',
    };
    const relationMetadata = findOrThrow(
      findOrThrow(share.dataSource.entityMetadatas, (entity) => {
        return entity.name === 'License';
      }).relations,
      (relation) => {
        return relation.propertyName === 'organizations';
      },
    );

    const relation = getRelationRecord(share.dataSource.entityMetadatas, relationMetadata, metadata);

    if (share.expect) {
      fs.writeFileSync(
        path.join(__dirname, 'expects', `${expectFileName}.json`),
        fastSafeStringify(relation, undefined, 2),
      );
    }

    const expectation = parse(
      (await fs.promises.readFile(path.join(__dirname, 'expects', `${expectFileName}.json`))).toString(),
    ) as object;

    expect(relation).toMatchObject(expectation);
  });

  test('exception - many-to-many', async () => {
    const expectFileName = `expect.${expect.getState().currentTestName}`.replaceAll(' ', '-');
    const metadata: IRecordMetadata = {
      name: 'i-am-application-name',
      version: '1.0.0',
      createdAt: '2023-01-01T11:22:33.000+09:00',
      updatedAt: '2023-01-02T11:22:33.000+09:00',
    };
    const relationMetadata = findOrThrow(
      findOrThrow(share.dataSource.entityMetadatas, (entity) => {
        return entity.name === 'License';
      }).relations,
      (relation) => {
        return relation.propertyName === 'organizations';
      },
    );

    const spyOnHandle = jest.spyOn(gjc, 'default').mockImplementation(() => {
      throw new Error('raise error for test');
    });

    const relation = getRelationRecord(share.dataSource.entityMetadatas, relationMetadata, metadata);

    spyOnHandle.mockRestore();

    if (share.expect) {
      fs.writeFileSync(
        path.join(__dirname, 'expects', `${expectFileName}.json`),
        fastSafeStringify(relation, undefined, 2),
      );
    }

    const expectation = parse(
      (await fs.promises.readFile(path.join(__dirname, 'expects', `${expectFileName}.json`))).toString(),
    ) as object;

    expect(relation).toMatchObject(expectation);
  });
});

describe('getRelationRecords', () => {
  test('pass', async () => {
    const expectFileName = `expect.${expect.getState().currentTestName}`.replaceAll(' ', '-');
    const metadata: IRecordMetadata = {
      name: 'i-am-application-name',
      version: '1.0.0',
      createdAt: '2023-01-01T11:22:33.000+09:00',
      updatedAt: '2023-01-02T11:22:33.000+09:00',
    };

    const relation = getRelationRecords(share.dataSource, metadata);

    if (share.expect) {
      fs.writeFileSync(
        path.join(__dirname, 'expects', `${expectFileName}.json`),
        fastSafeStringify(relation, undefined, 2),
      );
    }

    const expectation = parse(
      (await fs.promises.readFile(path.join(__dirname, 'expects', `${expectFileName}.json`))).toString(),
    ) as object;

    expect(relation).toMatchObject(expectation);
  });
});
