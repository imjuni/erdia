import { TextDecoder } from 'util';

export function getDatabaseName(options: { database?: string | Uint8Array | undefined }): string {
  const name = options.database;

  if (typeof name === 'string') {
    return name;
  }

  if (name instanceof Uint8Array) {
    return new TextDecoder().decode(name);
  }

  return 'default';
}
