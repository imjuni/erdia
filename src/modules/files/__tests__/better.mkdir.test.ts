import { betterMkdir } from '#/modules/files/betterMkdir';
import { existsSync } from 'my-node-fp';
import fs from 'node:fs';
import pathe from 'pathe';
import { sync as rimrafSync } from 'rimraf';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

const testDirPath = pathe.join(process.cwd(), 'test-dir');

beforeAll(async () => {
  await fs.promises.mkdir(testDirPath, { recursive: true });
});

afterAll(() => {
  console.log('>> ', testDirPath);
  rimrafSync(testDirPath);
});

describe('betterMkdir', () => {
  it('non exists directory mkdir', async () => {
    await betterMkdir(pathe.join(testDirPath, '11'));
    expect(existsSync(pathe.join(testDirPath, '11'))).toBeTruthy();
  });

  it('already exists directory mkdir', async () => {
    await betterMkdir(pathe.join(testDirPath));
    expect(existsSync(pathe.join(testDirPath))).toBeTruthy();
  });

  it('non exists directory mkdir using filename', async () => {
    await betterMkdir(pathe.join(testDirPath, '33', 'test.txt'));
    expect(existsSync(pathe.join(testDirPath, '33'))).toBeTruthy();
  });
});
