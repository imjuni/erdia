import type { ICommonOption } from '#/configs/interfaces/ICommonOption';
import { loadDataSource } from '#/typeorm/loadDataSource';
import { isFalse } from 'my-easy-fp';
import { exists } from 'my-node-fp';
import pathe from 'pathe';
import { type DataSource } from 'typeorm';

export async function getDataSource(options: Pick<ICommonOption, 'dataSourcePath'>): Promise<DataSource> {
  const dataSourcePath = pathe.resolve(options.dataSourcePath);

  if (isFalse(await exists(dataSourcePath))) {
    throw new Error(`Cannot found dataSource: ${dataSourcePath}`);
  }

  const dataSource = await loadDataSource(dataSourcePath);

  if (dataSource == null) {
    throw new Error(`Cannot found dataSource in ${options.dataSourcePath}`);
  }

  return dataSource;
}
