import path from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOption: DataSourceOptions = {
  type: 'better-sqlite3',
  database: path.join(__dirname, 'sqlite3.db'),
  synchronize: true,
  dropSchema: true,
  entities: ['./entities/User.ts', './entities/Photo.ts', './entities/License.ts', './entities/Organization.ts'],
};

const dataSource = new DataSource(dataSourceOption);

export default dataSource;
