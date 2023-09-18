import fs from 'fs';
import { parse } from 'jsonc-parser';
import { isFalse } from 'my-easy-fp';
import { exists } from 'my-node-fp';
import path from 'path';
import { CE_DEFAULT_VALUE } from 'src/configs/const-enum/CE_DEFAULT_VALUE';
import type IBuildCommandOption from 'src/configs/interfaces/IBuildCommandOption';
import type TDatabaseRecord from 'src/databases/interfaces/TDatabaseRecord';
import getOutputDirectory from 'src/tools/files/getOutputDirectory';

export default async function openDatabase(
  option: Pick<IBuildCommandOption, 'databasePath'>,
): Promise<TDatabaseRecord[]> {
  const dirname = await getOutputDirectory({ output: option.databasePath }, process.cwd());
  const filename = path.join(dirname, CE_DEFAULT_VALUE.DATABASE_FILENAME);

  if (filename == null) {
    return [];
  }

  if (isFalse(await exists(filename))) {
    return [];
  }

  const db = parse((await fs.promises.readFile(filename)).toString()) as TDatabaseRecord[];
  return db;
}
