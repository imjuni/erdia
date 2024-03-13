import type { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata';

export function getIsNullable(metadata: {
  isNullable: ColumnMetadata['isNullable'];
  isPrimary: ColumnMetadata['isPrimary'];
}) {
  if (metadata.isPrimary) {
    return '';
  }

  if (metadata.isNullable === false) {
    return '';
  }

  return 'nullable';
}
