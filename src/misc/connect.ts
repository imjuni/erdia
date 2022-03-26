import chalk from 'chalk';
import consola from 'consola';
import stringify from 'fast-safe-stringify';
import { isEmpty, isNotEmpty } from 'my-easy-fp';
import { ConnectionOptions, ConnectionOptionsReader, createConnection } from 'typeorm';
import ormconfigFinder from './configFinder';
import { getDirname } from './filetools';
import { IErdiaCliOptions } from './options';

function getConnectionOption(
  connectionOptions: ConnectionOptions[],
  options: IErdiaCliOptions,
): ConnectionOptions | undefined {
  try {
    if (connectionOptions.length < 1) {
      return undefined;
    }

    const finded = connectionOptions.find(
      (connectionOption) => connectionOption.name === options.name,
    );

    if (isNotEmpty(finded)) {
      return finded;
    }

    const [firstOption] = connectionOptions;

    return firstOption;
  } catch {
    return undefined;
  }
}

const connect = async (options: IErdiaCliOptions) => {
  const ormconfigFile = await ormconfigFinder(options);

  consola.success(`find ormconfig file: "${chalk.yellowBright(`${ormconfigFile.path}`)}"`);

  const connectionOptionsReader = new ConnectionOptionsReader({
    root: await getDirname(ormconfigFile.path),
    configName: ormconfigFile.name,
  });

  const connectionOptions = await connectionOptionsReader.all();
  const connectionOption = getConnectionOption(connectionOptions, options);

  if (isEmpty(connectionOption)) {
    throw new Error(`Cannot found configuration name (${options.name}) in ${ormconfigFile.path}`);
  }

  consola.success(
    `connection initialize: "${chalk.yellowBright(`${JSON.stringify(connectionOption.name)}`)}"`,
  );

  consola.success(stringify(connectionOption, undefined, 2));
  consola.log('');

  const conn = await createConnection(connectionOption);
  return conn;
};

export default connect;
