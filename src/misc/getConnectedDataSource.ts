import chalk from 'chalk';
import consola from 'consola';
import fastSafeStringify from 'fast-safe-stringify';
import { isEmpty, isFalse } from 'my-easy-fp';
import dataSourceFinder from './dataSourceFinder';
import { IErdiaCliOptions } from './options';

const getConnectedDataSource = async (options: IErdiaCliOptions) => {
  const dataSource = await dataSourceFinder(options);

  if (isEmpty(dataSource)) {
    throw new Error(`Cannot found dataSource in ${options.dataSourcePath}`);
  }

  await dataSource.initialize();

  if (isFalse(dataSource.isInitialized)) {
    throw new Error(`Cannot initialize in ${fastSafeStringify(dataSource.options, undefined, 2)}`);
  }

  consola.success(`connection initialize: "${chalk.yellowBright(`${options.dataSourcePath}`)}"`);

  consola.success(fastSafeStringify(dataSource.options, undefined, 2));
  consola.log('');

  return dataSource;
};

export default getConnectedDataSource;
