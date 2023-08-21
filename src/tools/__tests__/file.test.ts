import getOutputDirectory from '#tools/files/getOutputDirectory';
import getPuppeteerConfig from '#tools/getPuppeteerConfig';
import getSlashEndRoutePath from '#tools/getSlashEndRoutePath';
import fs from 'fs';
import 'jest';
import * as mnf from 'my-node-fp';
import path from 'path';

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
    const existsSpyOn = jest.spyOn(mnf, 'exists').mockImplementation(() => Promise.resolve(false));
    const mkdirSpyOn = jest.spyOn(fs.promises, 'mkdir').mockImplementation(() => Promise.resolve(''));

    const p = await getOutputDirectory({ output: undefined }, 'i-am-cwd');

    existsSpyOn.mockRestore();
    mkdirSpyOn.mockRestore();

    expect(p).toEqual(path.join(process.cwd(), 'i-am-cwd'));
  });

  test('pass - current directory', async () => {
    const existsSpyOn = jest.spyOn(mnf, 'exists').mockImplementation(() => Promise.resolve(true));
    const isDirectorySpyOn = jest.spyOn(mnf, 'isDirectory').mockImplementation(() => Promise.resolve(false));
    const mkdirSpyOn = jest.spyOn(fs.promises, 'mkdir').mockImplementation(() => Promise.resolve(''));

    const p = await getOutputDirectory({ output: undefined }, 'examples');

    existsSpyOn.mockRestore();
    isDirectorySpyOn.mockRestore();
    mkdirSpyOn.mockRestore();

    expect(p).toEqual(path.join(process.cwd(), 'examples'));
  });

  test('pass - cwd directory', async () => {
    const existsSpyOn = jest.spyOn(mnf, 'exists').mockImplementation(() => Promise.resolve(true));
    const isDirectorySpyOn = jest.spyOn(mnf, 'isDirectory').mockImplementation(() => Promise.resolve(true));
    const mkdirSpyOn = jest.spyOn(fs.promises, 'mkdir').mockImplementation(() => Promise.resolve(''));

    const p = await getOutputDirectory({ output: undefined }, 'examples');

    existsSpyOn.mockRestore();
    isDirectorySpyOn.mockRestore();
    mkdirSpyOn.mockRestore();

    expect(p).toEqual(path.join(process.cwd(), 'examples'));
  });
});

describe('getPuppeteerConfig', () => {
  test('pass - empty path', async () => {
    const config = await getPuppeteerConfig();
    expect(config).toMatchObject({});
  });

  test('pass - not found', async () => {
    const existsSpyOn = jest.spyOn(mnf, 'exists').mockImplementation(() => Promise.resolve(false));
    const config = await getPuppeteerConfig('config-path');

    existsSpyOn.mockRestore();

    expect(config).toMatchObject({});
  });

  test('pass - read-config', async () => {
    const existsSpyOn = jest.spyOn(mnf, 'exists').mockImplementation(() => Promise.resolve(true));
    const readFileSpyOn = jest
      .spyOn(fs.promises, 'readFile')
      .mockImplementation(() => Promise.resolve(Buffer.from('{ "name": "hello" }')));

    const config = await getPuppeteerConfig('config-path');

    existsSpyOn.mockRestore();
    readFileSpyOn.mockRestore();

    expect(config).toMatchObject({ name: 'hello' });
  });

  test('exception', async () => {
    const existsSpyOn = jest.spyOn(mnf, 'exists').mockImplementation(() => {
      throw new Error('invalid configuration path');
    });
    const readFileSpyOn = jest
      .spyOn(fs.promises, 'readFile')
      .mockImplementation(() => Promise.resolve(Buffer.from('{ "name": "hello" }')));

    const config = await getPuppeteerConfig('config-path');

    existsSpyOn.mockRestore();
    readFileSpyOn.mockRestore();

    expect(config).toMatchObject({});
  });
});
