import { getCwd } from '#/configs/modules/getCwd';
import { describe, expect, test } from 'vitest';

describe('getCwd', () => {
  test('pass - process.cwd()', async () => {
    const cwd = getCwd({});
    expect(cwd).toEqual(process.cwd());
  });

  test('pass - INIT_CWD', async () => {
    const expectation = 'init-cwd-directory';
    const cwd = getCwd({ INIT_CWD: expectation, USE_INIT_CWD: 'false' });
    expect(cwd).toEqual(process.cwd());
  });

  test('pass - INIT_CWD', async () => {
    const expectation = 'init-cwd-directory';
    const cwd = getCwd({ INIT_CWD: expectation, USE_INIT_CWD: 'true' });
    expect(cwd).toEqual(expectation);
  });

  test('pass - nullable INIT_CWD', async () => {
    const cwd = getCwd({ INIT_CWD: undefined, USE_INIT_CWD: 'true' });
    expect(cwd).toEqual(process.cwd());
  });
});
