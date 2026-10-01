import fs from "node:fs";

import { join } from "pathe";

import { CE_DEFAULT_VALUE } from "#/configs/const-enum/CE_DEFAULT_VALUE";
import type { IBuildCommandOption } from "#/configs/interfaces/IBuildCommandOption";
import type { TDatabaseRecord } from "#/databases/interfaces/TDatabaseRecord";
import { getOutputDirPath } from "#/modules/files/getOutputDirPath";

export const flushDatabase = async (
  option: Pick<IBuildCommandOption, "databasePath">,
  records: TDatabaseRecord[]
): Promise<TDatabaseRecord[]> => {
  const dirname = await getOutputDirPath(
    { output: option.databasePath },
    process.cwd()
  );
  const filename = join(dirname, CE_DEFAULT_VALUE.DATABASE_FILENAME);
  if (filename === null || filename === undefined) {
    throw new Error(`invalid database name: undefined`);
  }
  await fs.promises.writeFile(
    join(dirname, CE_DEFAULT_VALUE.DATABASE_FILENAME),
    JSON.stringify(records, undefined, 2)
  );
  return records;
};
