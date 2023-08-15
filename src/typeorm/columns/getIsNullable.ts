import type { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata';

export default function getIsNullable(metadata: {
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
