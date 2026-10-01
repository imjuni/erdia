import fs from "node:fs";

import { parse } from "jsonc-parser";
import { isFalse } from "my-easy-fp";
import { exists } from "my-node-fp";
import { join } from "pathe";

import { CE_DEFAULT_VALUE } from "#/configs/const-enum/CE_DEFAULT_VALUE";
import type { IBuildCommandOption } from "#/configs/interfaces/IBuildCommandOption";
import type { TDatabaseRecord } from "#/databases/interfaces/TDatabaseRecord";
import { getOutputDirPath } from "#/modules/files/getOutputDirPath";

export const openDatabase = async (
  option: Pick<IBuildCommandOption, "databasePath">
): Promise<TDatabaseRecord[]> => {
  const dirname = await getOutputDirPath(
    { output: option.databasePath },
    process.cwd()
  );
  const filename = join(dirname, CE_DEFAULT_VALUE.DATABASE_FILENAME);
  if (filename === null || filename === undefined) {
    return [];
  }
  if (isFalse(await exists(filename))) {
    return [];
  }
  const databaseContent = await fs.promises.readFile(filename);
  const db = parse(databaseContent.toString()) as TDatabaseRecord[];
  return db;
};
