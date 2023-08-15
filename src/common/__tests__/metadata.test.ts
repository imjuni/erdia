import * as env from '#common/__tests__/test-config';
import getDatabaseName from '#common/getDatabaseName';
import getMetadata from '#common/getMetadata';
import getPackageName from '#common/getPackageName';
import getProjectName from '#common/getProjectName';
import getVersion from '#common/getVersion';
import dayjs from 'dayjs';
import 'jest';

describe('getMetadata', () => {
  test('pass', async () => {
    const timestamp = '2023-08-15T11:22:33.000+09:00';
    const tspSpyOn = jest.spyOn(dayjs.prototype, 'format').mockImplementation(() => timestamp);
    const metadata = await getMetadata({ options: { database: 'i-am-database' } }, env.buildOption);

    tspSpyOn.mockRestore();

    expect(metadata).toMatchObject({
      name: 'erdia',
      title: undefined,
      version: timestamp,
      createdAt: timestamp,
      updatedAt: timestamp,
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

describe('getVersion', () => {
  test('pass with package.json version', async () => {
    const version = getVersion({ version: '1.1.1' }, true);
    expect(version).toEqual('1.1.1');
  });

  test('pass with nullable version', async () => {
    const expectation = '2023-01-01T11:22:33.000+09:00';
    const tspSpyOn = jest.spyOn(dayjs.prototype, 'format').mockImplementation(() => expectation);
    const version = getVersion({ version: undefined }, true);

    tspSpyOn.mockRestore();

    expect(version).toEqual(expectation);
  });

  test('pass using timestamp', async () => {
    const expectation = '2023-01-01T11:22:33.000+09:00';
    const tspSpyOn = jest.spyOn(dayjs.prototype, 'format').mockImplementation(() => expectation);
    const version = getVersion({ version: '1.1.1' });

    tspSpyOn.mockRestore();

    expect(version).toEqual(expectation);
  });

  test('pass using timestamp by configuration', async () => {
    const expectation = '2023-01-01T11:22:33.000+09:00';
    const tspSpyOn = jest.spyOn(dayjs.prototype, 'format').mockImplementation(() => expectation);

    const version = getVersion({ version: '1.1.1' }, false);

    tspSpyOn.mockRestore();

    expect(version).toEqual(expectation);
  });
});
