import { getOutputDirectory } from '#/modules/files/getOutputDirectory';
import { getPuppeteerConfig } from '#/modules/getPuppeteerConfig';
import { getSlashEndRoutePath } from '#/modules/getSlashEndRoutePath';
import * as mnf from 'my-node-fp';
import fs from 'node:fs';
import pathe from 'pathe';
import { describe, expect, test, vitest } from 'vitest';

vitest.mock('my-node-fp', async (importOriginal) => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  const mod = await importOriginal<typeof import('my-node-fp')>();
  return {
    ...mod,
  };
});

describe('getSlashEndRoutePath', () => {
  test('pass - without slash', () => {
    const result = getSlashEndRoutePath('https://test.com');
    expect(result).toEqual('https://test.com/');
  });

  test('pass - with slash', () => {
    const result = getSlashEndRoutePath('https://test.com/');
    expect(result).toEqual('https://test.com/');
  });
});

describe('getOutputDirectory', () => {
  test('pass - cwd', async () => {
    const existsSpyOn = vitest.spyOn(mnf, 'exists').mockImplementation(() => Promise.resolve(false));
    const mkdirSpyOn = vitest.spyOn(fs.promises, 'mkdir').mockImplementation(() => Promise.resolve(''));

    const p = await getOutputDirectory({ output: undefined }, 'i-am-cwd');

    existsSpyOn.mockRestore();
    mkdirSpyOn.mockRestore();

    expect(p).toEqual(pathe.join(process.cwd(), 'i-am-cwd'));
  });

  test('pass - current directory', async () => {
    const existsSpyOn = vitest.spyOn(mnf, 'exists').mockImplementation(() => Promise.resolve(true));
    const isDirectorySpyOn = vitest.spyOn(mnf, 'isDirectory').mockImplementation(() => Promise.resolve(false));
    const mkdirSpyOn = vitest.spyOn(fs.promises, 'mkdir').mockImplementation(() => Promise.resolve(''));

    const p = await getOutputDirectory({ output: undefined }, 'examples');

    existsSpyOn.mockRestore();
    isDirectorySpyOn.mockRestore();
    mkdirSpyOn.mockRestore();

    expect(p).toEqual(pathe.join(process.cwd(), 'examples'));
  });

  test('pass - cwd directory', async () => {
    const existsSpyOn = vitest.spyOn(mnf, 'exists').mockImplementation(() => Promise.resolve(true));
    const isDirectorySpyOn = vitest.spyOn(mnf, 'isDirectory').mockImplementation(() => Promise.resolve(true));
    const mkdirSpyOn = vitest.spyOn(fs.promises, 'mkdir').mockImplementation(() => Promise.resolve(''));

    const p = await getOutputDirectory({ output: undefined }, 'examples');

    existsSpyOn.mockRestore();
    isDirectorySpyOn.mockRestore();
    mkdirSpyOn.mockRestore();

    expect(p).toEqual(pathe.join(process.cwd(), 'examples'));
  });
});

describe('getPuppeteerConfig', () => {
  test('pass - empty path', async () => {
    const config = await getPuppeteerConfig();
    expect(config).toMatchObject({});
  });

  test('pass - not found', async () => {
    const existsSpyOn = vitest.spyOn(mnf, 'exists').mockImplementation(() => Promise.resolve(false));
    const config = await getPuppeteerConfig('config-path');

    existsSpyOn.mockRestore();

    expect(config).toMatchObject({});
  });

  test('pass - read-config', async () => {
    const existsSpyOn = vitest.spyOn(mnf, 'exists').mockImplementation(() => Promise.resolve(true));
    const readFileSpyOn = vitest
      .spyOn(fs.promises, 'readFile')
      .mockImplementation(() => Promise.resolve(Buffer.from('{ "name": "hello" }')));

    const config = await getPuppeteerConfig('config-path');

    existsSpyOn.mockRestore();
    readFileSpyOn.mockRestore();

    expect(config).toMatchObject({ name: 'hello' });
  });

  test('exception', async () => {
    const existsSpyOn = vitest.spyOn(mnf, 'exists').mockImplementation(() => {
      throw new Error('invalid configuration path');
    });
    const readFileSpyOn = vitest
      .spyOn(fs.promises, 'readFile')
      .mockImplementation(() => Promise.resolve(Buffer.from('{ "name": "hello" }')));

    const config = await getPuppeteerConfig('config-path');

    existsSpyOn.mockRestore();
    readFileSpyOn.mockRestore();

    expect(config).toMatchObject({});
  });
});
