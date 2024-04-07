import { CE_DEFAULT_VALUE } from '#/configs/const-enum/CE_DEFAULT_VALUE';
import type { IBuildCommandOption } from '#/configs/interfaces/IBuildCommandOption';
import type { TDatabaseRecord } from '#/databases/interfaces/TDatabaseRecord';
import { getOutputDirectory } from '#/modules/files/getOutputDirectory';
import fs from 'node:fs';
import pathe from 'pathe';

export async function flushDatabase(
  option: Pick<IBuildCommandOption, 'databasePath'>,
  records: TDatabaseRecord[],
): Promise<TDatabaseRecord[]> {
  const dirname = await getOutputDirectory({ output: option.databasePath }, process.cwd());
  const filename = pathe.join(dirname, CE_DEFAULT_VALUE.DATABASE_FILENAME);

  if (filename == null) {
    throw new Error(`invalid database name: undefined`);
  }

  await fs.promises.writeFile(
    pathe.join(dirname, CE_DEFAULT_VALUE.DATABASE_FILENAME),
    JSON.stringify(records, undefined, 2),
  );

  return records;
}
