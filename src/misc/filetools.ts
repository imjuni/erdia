import * as fs from 'fs';
import { isEmpty, isFalse } from 'my-easy-fp';
import * as path from 'path';

/**
 * check file existing, if file exists return true, don't exists return false
 * @param filepath filename with path
 */
export async function exists(filepath: string): Promise<boolean> {
  try {
    const accessed = await fs.promises.access(filepath);
    return isEmpty(accessed);
  } catch (err) {
    return false;
  }
}

export async function isDirectory(filepath: string): Promise<boolean> {
  try {
    const lstat = await fs.promises.lstat(filepath);

    return lstat.isDirectory();
  } catch (catched) {
    const err =
      catched instanceof Error ? catched : new Error(`unknown error from dirname: ${filepath}`);

    throw err;
  }
}

export async function getDirname(filepath: string, resolved?: boolean): Promise<string> {
  try {
    const lstat = await fs.promises.lstat(filepath);

    if (lstat.isDirectory()) {
      return resolved ?? false ? filepath : path.resolve(filepath);
    }

    const dirname = path.dirname(filepath);

    if (isFalse(await exists(dirname))) {
      throw new Error(`Cannot found dirname: ${dirname}`);
    }

    return resolved ?? false ? dirname : path.resolve(dirname);
  } catch (catched) {
    const err =
      catched instanceof Error ? catched : new Error(`unknown error from dirname: ${filepath}`);

    throw err;
  }
}
