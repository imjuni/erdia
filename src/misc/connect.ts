import { Connection, createConnection, getConnectionOptions } from 'typeorm';
import { IErdiaCliOptions } from './options';

const connect = async (options: IErdiaCliOptions) => {
  if (options['use-loader-path'] !== undefined && options['use-loader-path'] !== null) {
    // if set useLoaderPath, apply first
    const module = await import(options['use-loader-path']);
    const conn: Connection = module(options.database);

    return conn;
  }

  // if set useOrmconfig, apply second
  if (options['use-ormconfig']) {
    const connectionOptions = await getConnectionOptions(options.database);
    const conn = await createConnection(connectionOptions);
    return conn;
  }

  throw new Error('you must set ');
};

export default connect;
