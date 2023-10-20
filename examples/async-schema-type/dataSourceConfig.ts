import path from 'path';
import { DataSource, type DataSourceOptions } from 'typeorm';
import { License } from './License';
import { Organization } from './Organization';
import { Photo } from './Photo';
import { User } from './User';

const handle = async () => {
  const dataSourceOption: DataSourceOptions = {
    type: 'better-sqlite3',
    database: path.join(__dirname, '..', 'db', 'sqlite3.sqlite3'),
    synchronize: true,
    dropSchema: true,
    enableWAL: true,
    entities: [User, Photo, License, Organization],
  };

  const dataSource = new DataSource(dataSourceOption);

  return dataSource;
};

export default handle();
