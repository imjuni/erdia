/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return */
import consola from 'consola';
import { isError, isFalse } from 'my-easy-fp';
import { exists } from 'my-node-fp';
import path from 'path';
import type ICommonOption from 'src/configs/interfaces/ICommonOption';
import { InstanceChecker, type DataSource } from 'typeorm';
import { importOrRequireFile } from 'typeorm/util/ImportUtils';

/**
 * load dataSource, from [CommandUtils.ts](https://github.com/typeorm/typeorm/blob/master/src/commands/CommandUtils.ts#L13)
 *
 * @param dataSourceFilePath dataSource file path
 * @returns
 */
async function loadDataSource(dataSourceFilePath: string): Promise<DataSource> {
  let dataSourceFileExports;

  try {
    [dataSourceFileExports] = await importOrRequireFile(dataSourceFilePath);
  } catch (caught) {
    const err = isError(caught, new Error(`Unknown error raised from 'loadDataSource'`));

    consola.verbose(`Unable to open file: ${dataSourceFilePath}". ${err.message}`);
    throw new Error(`Unable to open file: "${dataSourceFilePath}". ${err.message}`);
  }

  if (dataSourceFileExports == null || typeof dataSourceFileExports !== 'object') {
    consola.verbose('Given data source file must contain export of a DataSource instance');
    throw new Error('Given data source file must contain export of a DataSource instance');
  }

  const dataSourceExports = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const fileExport in dataSourceFileExports) {
    if (InstanceChecker.isDataSource(dataSourceFileExports[fileExport])) {
      dataSourceExports.push(dataSourceFileExports[fileExport]);
    }
  }

  if (dataSourceExports.length === 0) {
    consola.verbose('Given data source file must contain export of a DataSource instance');
    throw new Error('Given data source file must contain export of a DataSource instance');
  }
  if (dataSourceExports.length > 1) {
    consola.verbose('Given data source file must contain only one export of DataSource instance');
    throw new Error('Given data source file must contain only one export of DataSource instance');
  }
  return dataSourceExports[0];
}

export default async function getDataSource(options: ICommonOption): Promise<DataSource> {
  const dataSourcePath = path.resolve(options.dataSourcePath);

  if (isFalse(await exists(dataSourcePath))) {
    throw new Error(`Cannot found dataSource: ${dataSourcePath}`);
  }

  const dataSource = loadDataSource(dataSourcePath);

  if (dataSource == null) {
    throw new Error(`Cannot found dataSource in ${options.dataSourcePath}`);
  }

  return dataSource;
}
