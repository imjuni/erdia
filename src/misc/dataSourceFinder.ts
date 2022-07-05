/* eslint-disable prefer-const */
/* eslint-disable no-restricted-syntax */
import { isFalse } from 'my-easy-fp';
import { exists } from 'my-node-fp';
import path from 'path';
import { DataSource, InstanceChecker } from 'typeorm';
import { importOrRequireFile } from 'typeorm/util/ImportUtils';
import { IErdiaCliOptions } from './options';

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
  } catch (err: any) {
    throw new Error(`Unable to open file: "${dataSourceFilePath}". ${err.message}`);
  }

  if (!dataSourceFileExports || typeof dataSourceFileExports !== 'object') {
    throw new Error(`Given data source file must contain export of a DataSource instance`);
  }

  const dataSourceExports = [];
  for (let fileExport in dataSourceFileExports) {
    if (InstanceChecker.isDataSource(dataSourceFileExports[fileExport])) {
      dataSourceExports.push(dataSourceFileExports[fileExport]);
    }
  }

  if (dataSourceExports.length === 0) {
    throw new Error(`Given data source file must contain export of a DataSource instance`);
  }
  if (dataSourceExports.length > 1) {
    throw new Error(`Given data source file must contain only one export of DataSource instance`);
  }
  return dataSourceExports[0];
}

/**
 * find and load dataSource, using typeorm CommandUtils
 *
 * @param options erdia option
 * @returns dataSource
 */
export default async function dataSourceFinder(options: IErdiaCliOptions): Promise<DataSource> {
  const dataSourcePath = path.resolve(options.dataSourcePath);

  if (isFalse(await exists(dataSourcePath))) {
    throw new Error(`Cannot found dataSource: ${dataSourcePath}`);
  }

  const dataSource: any = loadDataSource(dataSourcePath);
  return dataSource;
}
