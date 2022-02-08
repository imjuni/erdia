import { createConnection, getConnectionOptions } from 'typeorm';
import { IErdiaCliOptions } from './options';

const connect = async (options: IErdiaCliOptions) => {
  const connectionOptions = await getConnectionOptions(options.database);
  const conn = await createConnection(connectionOptions);
  return conn;
};

export default connect;
