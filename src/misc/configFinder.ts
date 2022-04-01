import { isFalse, isNotEmpty } from 'my-easy-fp';
import { exists } from 'my-node-fp';
import path from 'path';
import { DataSource } from 'typeorm';
import { IErdiaCliOptions } from './options';

/**
 *
 * @param options
 * @returns
 */
export default async function dataSourceFinder(options: IErdiaCliOptions): Promise<DataSource> {
  const dataSourcePath = path.resolve(options.dataSourcePath);

  if (isFalse(await exists(dataSourcePath))) {
    throw new Error(`Cannot found dataSource: ${dataSourcePath}`);
  }

  const dataSourceFile = await import(dataSourcePath);

  if (isNotEmpty(dataSourceFile.default)) {
    return dataSourceFile.default;
  }

  const finded = Object.entries<DataSource>(dataSourceFile)
    .map(([key, value]) => ({ key, value }))
    .find((entry) => entry.value instanceof DataSource);

  if (isNotEmpty(finded)) {
    return finded.value;
  }

  throw new Error(`Cannot found dataSource: ${dataSourcePath}`);
}
