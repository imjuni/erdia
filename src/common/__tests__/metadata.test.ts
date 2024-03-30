import * as env from '#/common/__tests__/test-config';
import { getDatabaseName } from '#/common/getDatabaseName';
import { getMetadata } from '#/common/getMetadata';
import { getPackageName } from '#/common/getPackageName';
import { getProjectName } from '#/common/getProjectName';
import { getFindFile } from '#/tools/files/getFindFile';
import dayjs from 'dayjs';
import findUp from 'find-up';
import { isError } from 'my-easy-fp';
import readPkg from 'read-pkg';
import { describe, expect, test, vitest } from 'vitest';

describe('getMetadata', () => {
  test('project name from application', async () => {
    const timestamp = '1692373636445';
    const datetime = '2023-08-19T11:37:20+09:00';
    const tspSpyOn01 = vitest.spyOn(dayjs.prototype, 'valueOf').mockImplementation(() => timestamp);
    const tspSpyOn02 = vitest.spyOn(dayjs.prototype, 'format').mockImplementation(() => datetime);

    // @ts-expect-error: read-pkg mocking test
    readPkg.mockReturnValueOnce(Promise.resolve({ name: 'erdia', version: '1.1.1' }));

    const metadata = await getMetadata(
      { options: { database: 'i-am-database' } },
      { ...env.buildOption, versionFrom: 'timestamp' },
    );

    tspSpyOn01.mockRestore();
    tspSpyOn02.mockRestore();

    expect(metadata).toMatchObject({
      name: 'erdia',
      title: undefined,
      version: timestamp,
      createdAt: datetime,
      updatedAt: datetime,
    });
  });

  test('project name with package namespace', async () => {
    const timestamp = '1692373636445';
    const datetime = '2023-08-19T11:37:20+09:00';
    const tspSpyOn01 = vitest.spyOn(dayjs.prototype, 'valueOf').mockImplementation(() => timestamp);
    const tspSpyOn02 = vitest.spyOn(dayjs.prototype, 'format').mockImplementation(() => datetime);

    // @ts-expect-error: read-pkg mocking test
    readPkg.mockReturnValueOnce(Promise.resolve({ name: '@maeum/pet-store', version: '1.1.1' }));

    const metadata = await getMetadata(
      { options: { database: 'i-am-database' } },
      { ...env.buildOption, versionFrom: 'timestamp' },
    );

    tspSpyOn01.mockRestore();
    tspSpyOn02.mockRestore();

    expect(metadata).toMatchObject({
      name: '@maeum_pet-store',
      title: undefined,
      version: timestamp,
      createdAt: datetime,
      updatedAt: datetime,
    });
  });
});

describe('getProjectName', () => {
  test('pass aplication name', async () => {
    const expectation = 'i-am-application-name';
    const name = await getProjectName({ options: { database: undefined } }, { name: expectation }, env.buildOption);
    expect(name).toEqual(expectation);
  });

  test('pass database name', async () => {
    const expectation = 'i-am-database-name';
    const name = await getProjectName(
      { options: { database: expectation } },
      { name: expectation },
      { ...env.buildOption, projectName: 'db' },
    );
    expect(name).toEqual(expectation);
  });

  test('pass application name instead of database name', async () => {
    const expectation = 'i-am-application-name';
    const name = await getProjectName(
      { options: { database: undefined } },
      { name: expectation },
      { ...env.buildOption, projectName: 'db' },
    );
    expect(name).toEqual(expectation);
  });
});

describe('getPackageName', () => {
  test('pass', () => {
    const name = getPackageName({ name: 'erdia' });
    expect(name).toEqual('erdia');
  });

  test('exception', () => {
    expect(() => {
      getPackageName({});
    }).toThrowError();
  });
});

describe('getDatabaseName', () => {
  test('pass with string', () => {
    const expectation = 'i-am-database-name';
    const name = getDatabaseName({ database: expectation });
    expect(name).toEqual(expectation);
  });

  test('pass with buffer', () => {
    const expectation = 'i-am-database-name';
    const name = getDatabaseName({ database: Buffer.from(expectation) });
    expect(name).toEqual(expectation);
  });

  test('default', () => {
    const expectation = 'default';
    const name = getDatabaseName({ database: undefined });
    expect(name).toEqual(expectation);
  });
});

describe('getFindFile', () => {
  test('pass', async () => {
    const expectation = '/a/b';
    // @ts-expect-error: find-up mocking test
    findUp.mockReturnValueOnce(expectation);

    try {
      const finded = await getFindFile('', {});
      expect(finded).toEqual(expectation);
    } catch (caught) {
      const err = isError(caught, new Error('error'));
      console.log(err.message);
      console.log(err.stack);
    }
  });
});
