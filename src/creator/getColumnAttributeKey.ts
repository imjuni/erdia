import { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata';

export default function getColumnAttributeKey(columnMetadata: ColumnMetadata) {
  if (columnMetadata.relationMetadata !== undefined && columnMetadata.relationMetadata !== null) {
    return 'FK';
  }

  if (columnMetadata.isPrimary) {
    return 'PK';
  }

  return '';
}
