import { TextDecoder } from 'util';

export default function getDatabaseName(dataSource: {
  options: { database: string | Uint8Array | undefined };
}): string {
  const name = dataSource.options.database;

  if (typeof name === 'string') {
    return name;
  }

  if (name instanceof Uint8Array) {
    return new TextDecoder().decode(name);
  }

  return 'default';
}
