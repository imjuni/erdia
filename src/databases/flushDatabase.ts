import fs from 'fs';
import path from 'path';
import { CE_DEFAULT_VALUE } from 'src/configs/const-enum/CE_DEFAULT_VALUE';
import type IBuildCommandOption from 'src/configs/interfaces/IBuildCommandOption';
import type TDatabaseRecord from 'src/databases/interfaces/TDatabaseRecord';
import getOutputDirectory from 'src/tools/files/getOutputDirectory';

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
