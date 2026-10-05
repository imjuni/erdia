import { isFalse } from "my-easy-fp";
import { exists } from "my-node-fp";
import { resolve } from "pathe";
import type { DataSource } from "typeorm";

import type { ICommonOption } from "#/configs/interfaces/ICommonOption";
import { loadDataSource } from "#/loaders/typeorm/connections/loadDataSource";

export const getDataSource = async (
  options: Pick<ICommonOption, "dataSourcePath">,
): Promise<DataSource> => {
  const dataSourcePath = resolve(options.dataSourcePath);
  if (isFalse(await exists(dataSourcePath))) {
    throw new Error(`Cannot found dataSource: ${dataSourcePath}`);
  }
  const dataSource = await loadDataSource(dataSourcePath);
  if (dataSource === null || dataSource === undefined) {
    throw new Error(`Cannot found dataSource in ${options.dataSourcePath}`);
  }
  return dataSource;
};
