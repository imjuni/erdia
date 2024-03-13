/* eslint-disable @typescript-eslint/no-unsafe-member-access, no-await-in-loop, @typescript-eslint/no-unsafe-assignment, guard-for-in */
import { isError } from 'my-easy-fp';
import { InstanceChecker, type DataSource } from 'typeorm';
import { importOrRequireFile } from 'typeorm/util/ImportUtils';

/**
 * load dataSource, from [CommandUtils.ts](https://github.com/typeorm/typeorm/blob/master/src/commands/CommandUtils.ts#L13)
 *
 * @param dataSourceFilePath dataSource file path
 * @returns
 */
export async function loadDataSource(dataSourceFilePath: string): Promise<DataSource> {
  let dataSourceFileExports;

  try {
    [dataSourceFileExports] = await importOrRequireFile(dataSourceFilePath);
  } catch (caught) {
    const err = isError(caught, new Error(`Unable to open file: "${dataSourceFilePath}".`));
    throw new Error(`Unable to open file: "${dataSourceFilePath}". ${err.message}`);
  }

  if (!dataSourceFileExports || typeof dataSourceFileExports !== 'object') {
    throw new Error(`Given data source file must contain export of a DataSource instance`);
  }

  if (InstanceChecker.isDataSource(dataSourceFileExports)) {
    return dataSourceFileExports;
  }

  const dataSourceExports = [];

  for (const fileExportKey in dataSourceFileExports) {
    const fileExport = dataSourceFileExports[fileExportKey];
    // It is necessary to await here in case of the exported async value (Promise<DataSource>).
    // e.g. the DataSource is instantiated with an async factory in the source file
    // It is safe to await regardless of the export being async or not due to `awaits` definition:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await#return_value
    const awaitedFileExport = await fileExport;
    if (InstanceChecker.isDataSource(awaitedFileExport)) {
      dataSourceExports.push(awaitedFileExport);
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
