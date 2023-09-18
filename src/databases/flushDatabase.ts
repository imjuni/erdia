import { CE_DEFAULT_VALUE } from '#/configs/const-enum/CE_DEFAULT_VALUE';
import type IBuildCommandOption from '#/configs/interfaces/IBuildCommandOption';
import type TDatabaseRecord from '#/databases/interfaces/TDatabaseRecord';
import getOutputDirectory from '#/tools/files/getOutputDirectory';
import fs from 'fs';
import path from 'path';

export default async function flushDatabase(
  option: Pick<IBuildCommandOption, 'databasePath'>,
  records: TDatabaseRecord[],
): Promise<TDatabaseRecord[]> {
  const dirname = await getOutputDirectory({ output: option.databasePath }, process.cwd());
  const filename = path.join(dirname, CE_DEFAULT_VALUE.DATABASE_FILENAME);

  if (filename == null) {
    throw new Error(`invalid database name: undefined`);
  }

  await fs.promises.writeFile(
    path.join(dirname, CE_DEFAULT_VALUE.DATABASE_FILENAME),
    JSON.stringify(records, undefined, 2),
  );

  return records;
}
