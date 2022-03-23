import { isEmpty } from 'my-easy-fp';
import { ConnectionOptionsReader, createConnection } from 'typeorm';
import ormconfigFinder from './configFinder';
import { getDirname } from './filetools';
import { IErdiaCliOptions } from './options';

const connect = async (options: IErdiaCliOptions) => {
  const ormconfigFile = await ormconfigFinder(options);
  const connectionOptionsReader = new ConnectionOptionsReader({
    root: await getDirname(ormconfigFile),
    configName: 'ormconfig',
  });

  const connectionOptions = await connectionOptionsReader.all();
  const connectionOption = connectionOptions.find(
    (connectionOption) => connectionOption.name === options.name,
  );

  if (isEmpty(connectionOption)) {
    throw new Error(`Cannot found configuration name (${options.name}) in ${ormconfigFile}`);
  }

  const conn = await createConnection(connectionOption);
  return conn;
};

export default connect;
