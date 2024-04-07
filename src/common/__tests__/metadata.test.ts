import * as env from '#/common/__tests__/test-config';
import { getDatabaseName } from '#/common/getDatabaseName';
import { getMetadata } from '#/common/getMetadata';
import { getPackageName } from '#/common/getPackageName';
import { getProjectName } from '#/common/getProjectName';
import { container } from '#/modules/containers/container';
import { SymbolDataSource } from '#/modules/containers/keys/SymbolDataSource';
import { getFindFile } from '#/modules/files/getFindFile';
import { asValue } from 'awilix';
import dayjs from 'dayjs';
import * as findUp from 'find-up';
import { isError } from 'my-easy-fp';
import * as readPkg from 'read-pkg';
import { describe, expect, test, vitest } from 'vitest';

vitest.mock('dayjs', async (importOriginal) => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  const mod = await importOriginal<typeof import('dayjs')>();
  return {
    ...mod,
  };
});

vitest.mock('read-pkg', async (importOriginal) => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  const mod = await importOriginal<typeof import('read-pkg')>();
  return {
    ...mod,
  };
});

vitest.mock('find-up', async (importOriginal) => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  const mod = await importOriginal<typeof import('find-up')>();
  return {
    ...mod,
  };
});

describe('getMetadata', () => {
  test('project name from application', async () => {
    const timestamp = '1692373636445';
    const datetime = '2023-08-19T11:37:20+09:00';
    const tspSpyOn01 = vitest.spyOn(dayjs.prototype, 'valueOf').mockImplementationOnce(() => timestamp);
    const tspSpyOn02 = vitest
      .spyOn(dayjs.prototype, 'format')
      .mockImplementationOnce(() => datetime)
      .mockImplementationOnce(() => datetime);
    const tspSpyOn03 = vitest
      .spyOn(readPkg, 'default')
      .mockImplementationOnce(() => Promise.resolve({ name: 'erdia', version: '1.1.1' }));

    container.register(SymbolDataSource, asValue({ options: { database: 'i-am-database' } }));
    const metadata = await getMetadata({ ...env.buildOption, versionFrom: 'timestamp' });

    tspSpyOn01.mockRestore();
    tspSpyOn02.mockRestore();
    tspSpyOn03.mockRestore();

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
    const tspSpyOn01 = vitest.spyOn(dayjs.prototype, 'valueOf').mockImplementationOnce(() => timestamp);
    const tspSpyOn02 = vitest
      .spyOn(dayjs.prototype, 'format')
      .mockImplementationOnce(() => datetime)
      .mockImplementationOnce(() => datetime);
    const tspSpyOn03 = vitest
      .spyOn(readPkg, 'default')
      .mockImplementationOnce(() => Promise.resolve({ name: '@maeum_pet-store', version: '1.1.1' }));

    container.register(SymbolDataSource, asValue({ options: { database: 'i-am-database' } }));
    const metadata = await getMetadata({ ...env.buildOption, versionFrom: 'timestamp' });

    tspSpyOn01.mockRestore();
    tspSpyOn02.mockRestore();
    tspSpyOn03.mockRestore();

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
    const tspSpyOn01 = vitest.spyOn(findUp, 'default').mockImplementation(() => Promise.resolve(expectation));

    try {
      const finded = await getFindFile('', {});
      tspSpyOn01.mockRestore();
      expect(finded).toEqual(expectation);
    } catch (caught) {
      const err = isError(caught, new Error('error'));
      console.log(err.message);
      console.log(err.stack);
    }
  });
});
