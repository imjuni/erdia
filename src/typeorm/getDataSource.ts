import IErdiaCommonOption from '@config/interface/IErdiaCommonOption';
import logger from '@tool/logger';
import { isEmpty, isFalse } from 'my-easy-fp';
import { exists } from 'my-node-fp';
import path from 'path';
import { DataSource, InstanceChecker } from 'typeorm';
import { importOrRequireFile } from 'typeorm/util/ImportUtils';

const log = logger();

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
    log.verbose(`Unable to open file: ${dataSourceFilePath}". ${err.message}`);
    throw new Error(`Unable to open file: "${dataSourceFilePath}". ${err.message}`);
  }

  if (!dataSourceFileExports || typeof dataSourceFileExports !== 'object') {
    log.verbose('Given data source file must contain export of a DataSource instance');
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
    log.verbose('Given data source file must contain export of a DataSource instance');
    throw new Error('Given data source file must contain export of a DataSource instance');
  }
  if (dataSourceExports.length > 1) {
    log.verbose('Given data source file must contain only one export of DataSource instance');
    throw new Error('Given data source file must contain only one export of DataSource instance');
  }
  return dataSourceExports[0];
}

export default async function getDataSource(options: IErdiaCommonOption): Promise<DataSource> {
  const dataSourcePath = path.resolve(options.dataSourcePath);

  if (isFalse(await exists(dataSourcePath))) {
    throw new Error(`Cannot found dataSource: ${dataSourcePath}`);
  }

  const dataSource: any = loadDataSource(dataSourcePath);

  if (isEmpty(dataSource)) {
    throw new Error(`Cannot found dataSource in ${options.dataSourcePath}`);
  }

  return dataSource;
}
