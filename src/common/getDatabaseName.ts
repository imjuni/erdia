import { DataSource } from 'typeorm';
import { TextDecoder } from 'util';

export default function getDatabaseName(dataSource: DataSource): string {
  const nameFromOption = dataSource.options.database;

  if (typeof nameFromOption === 'string') {
    return nameFromOption;
  }

  if (nameFromOption instanceof Uint8Array) {
    return new TextDecoder().decode(nameFromOption);
  }

  return 'default';
}
