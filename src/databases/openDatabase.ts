import { CE_DEFAULT_VALUE } from '#/configs/const-enum/CE_DEFAULT_VALUE';
import type { IBuildCommandOption } from '#/configs/interfaces/IBuildCommandOption';
import type { TDatabaseRecord } from '#/databases/interfaces/TDatabaseRecord';
import { getOutputDirectory } from '#/modules/files/getOutputDirectory';
import { parse } from 'jsonc-parser';
import { isFalse } from 'my-easy-fp';
import { exists } from 'my-node-fp';
import fs from 'node:fs';
import pathe from 'pathe';

export async function openDatabase(option: Pick<IBuildCommandOption, 'databasePath'>): Promise<TDatabaseRecord[]> {
  const dirname = await getOutputDirectory({ output: option.databasePath }, process.cwd());
  const filename = pathe.join(dirname, CE_DEFAULT_VALUE.DATABASE_FILENAME);

  if (filename == null) {
    return [];
  }

  if (isFalse(await exists(filename))) {
    return [];
  }

  const db = parse((await fs.promises.readFile(filename)).toString()) as TDatabaseRecord[];
  return db;
}
