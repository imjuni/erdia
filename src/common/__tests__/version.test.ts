import { getFileVersion } from '#/common/getFileVersion';
import { getVersion } from '#/common/getVersion';
import * as getFindFile from '#/tools/files/getFindFile';
import * as getOutputDirectory from '#/tools/files/getOutputDirectory';
import dayjs from 'dayjs';
import fs from 'fs';
import { describe, expect, test, vitest } from 'vitest';

describe('getFileVersion', () => {
  test('pass - plain', async () => {
    const expectation = '1.1.1';
    const version = getFileVersion(Buffer.from('1.1.1'));
    expect(version).toEqual(expectation);
  });

  test('pass - json', async () => {
    const expectation = '1.1.1';
    const version = getFileVersion(Buffer.from('{ "version": "1.1.1" }'));
    expect(version).toEqual(expectation);
  });

  test('exception - json', async () => {
    expect(() => {
      getFileVersion(Buffer.from('{ "version": "" }'));
    }).toThrowError();
  });
});

describe('getVersion', () => {
  test('pass with package.json version', async () => {
    const version = await getVersion({ version: '1.1.1' }, { versionFrom: 'package.json' });
    expect(version).toEqual({ version: '1.1.1' });
  });

  test('pass using timestamp', async () => {
    const expectation = '1692373636445';
    const tspSpyOn = vitest.spyOn(dayjs.prototype, 'valueOf').mockImplementation(() => expectation);
    const version = await getVersion({ version: '1.1.1' }, { versionFrom: 'timestamp' });

    tspSpyOn.mockRestore();

    expect(version).toEqual({ version: expectation });
  });

  test('pass using timestamp by configuration', async () => {
    const expectation = '1692373636445';
    const tspSpyOn = vitest.spyOn(dayjs.prototype, 'valueOf').mockImplementation(() => expectation);

    const version = await getVersion({ version: '1.1.1' }, { versionFrom: 'timestamp' });

    tspSpyOn.mockRestore();

    expect(version).toEqual({ version: expectation });
  });

  test('pass using file', async () => {
    const expectation = '1692373636445';
    const tspSpyOn01 = vitest.spyOn(dayjs.prototype, 'valueOf').mockImplementation(() => expectation);
    const tspSpyOn02 = vitest.spyOn(getFindFile, 'getFindFile').mockImplementation(() => Promise.resolve('/a/b/c'));
    const tspSpyOn03 = vitest
      .spyOn(fs.promises, 'readFile')
      .mockImplementation(() => Promise.resolve(Buffer.from('1.1.1')));

    const version = await getVersion({ version: '1.1.1' }, { versionFrom: 'file' });

    tspSpyOn01.mockRestore();
    tspSpyOn02.mockRestore();
    tspSpyOn03.mockRestore();

    expect(version).toMatchObject({ version: '1.1.1' });
  });

  test('pass using file with versionPath', async () => {
    const expectation = '1692373636445';
    const tspSpyOn01 = vitest.spyOn(dayjs.prototype, 'valueOf').mockImplementation(() => expectation);
    const tspSpyOn02 = vitest.spyOn(getFindFile, 'getFindFile').mockImplementation(() => Promise.resolve('/a/b/c'));
    const tspSpyOn03 = vitest
      .spyOn(fs.promises, 'readFile')
      .mockImplementation(() => Promise.resolve(Buffer.from('1.1.1')));
    const tspSpyOn04 = vitest
      .spyOn(getOutputDirectory, 'getOutputDirectory')
      .mockImplementation(() => Promise.resolve('/a/b/c'));

    const version = await getVersion({ version: '1.1.1' }, { versionFrom: 'file', versionPath: '/a/b/c' });

    tspSpyOn01.mockRestore();
    tspSpyOn02.mockRestore();
    tspSpyOn03.mockRestore();
    tspSpyOn04.mockRestore();

    expect(version).toMatchObject({ version: '1.1.1' });
  });

  test('exception using package.json', async () => {
    const expectation = '1692373636445';
    const tspSpyOn01 = vitest.spyOn(dayjs.prototype, 'valueOf').mockImplementation(() => expectation);
    const tspSpyOn02 = vitest.spyOn(getFindFile, 'getFindFile').mockImplementation(() => Promise.resolve(undefined));

    await expect(async () => {
      try {
        await getVersion({ version: undefined }, { versionFrom: 'package.json' });
      } finally {
        tspSpyOn01.mockRestore();
        tspSpyOn02.mockRestore();
      }
    }).rejects.toThrowError();
  });

  test('exception using file', async () => {
    const expectation = '1692373636445';
    const tspSpyOn01 = vitest.spyOn(dayjs.prototype, 'valueOf').mockImplementation(() => expectation);
    const tspSpyOn02 = vitest.spyOn(getFindFile, 'getFindFile').mockImplementation(() => Promise.resolve(undefined));

    await expect(async () => {
      try {
        await getVersion({ version: '1.1.1' }, { versionFrom: 'file' });
      } finally {
        tspSpyOn01.mockRestore();
        tspSpyOn02.mockRestore();
      }
    }).rejects.toThrowError();
  });
});
