import { isTrue } from 'my-easy-fp';
import type { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata';

export default function getColumnType(
  columnMetadata: Pick<ColumnMetadata, 'type' | 'length'>,
  includeLength?: boolean,
) {
  if (typeof columnMetadata.type === 'function') {
    if (isTrue(includeLength ?? false) && columnMetadata.length !== '') {
      return `${columnMetadata.type.name.toString().toLowerCase()}(${columnMetadata.length})`;
    }

    return columnMetadata.type.name.toString().toLowerCase();
  }

  if (isTrue(includeLength ?? false) && columnMetadata.length !== '') {
    return `${columnMetadata.type.toString()}(${columnMetadata.length})`;
  }

  return columnMetadata.type.toString();
}
