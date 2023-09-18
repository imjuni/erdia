import fastSafeStringify from 'fast-safe-stringify';
import fs from 'fs';
import { parse } from 'jsonc-parser';
import path from 'path';
import * as env from 'src/common/__tests__/test-config';
import type IRecordMetadata from 'src/databases/interfaces/IRecordMetadata';
import getColumnRecord from 'src/typeorm/columns/getColumnRecord';
import type { DataSource } from 'typeorm';

const share: { dataSource: DataSource; expect: boolean } = { expect: false } as any;

beforeAll(async () => {
  share.dataSource = (await import('../../../../examples/schema-type/dataSourceConfig')).default;
  await share.dataSource.initialize();
});

describe('getColumnRecord', () => {
  test('pass', async () => {
    const expectFileName = `expect.${expect.getState().currentTestName}`.replaceAll(' ', '-');
    const userEntity = share.dataSource.entityMetadatas.find((entityMetadata) => entityMetadata.name === 'User');
    const metadata: IRecordMetadata = {
      name: 'i-am-application-name',
      version: '1.0.0',
      createdAt: '2023-01-01T11:22:33.000+09:00',
      updatedAt: '2023-01-02T11:22:33.000+09:00',
    };

    if (userEntity == null) {
      throw new Error('Cannot found user entity');
    }

    const columns = userEntity.columns
      .map((column) => getColumnRecord(column, env.buildOption, metadata))
      .sort((l, r) => l.name.localeCompare(r.name));

    if (share.expect) {
      fs.writeFileSync(
        path.join(__dirname, 'expects', `${expectFileName}.json`),
        fastSafeStringify(columns, undefined, 2),
      );
    }

    const expectation = parse(
      (await fs.promises.readFile(path.join(__dirname, 'expects', `${expectFileName}.json`))).toString(),
    ) as object;

    expect(columns).toMatchObject(expectation);
  });
});
