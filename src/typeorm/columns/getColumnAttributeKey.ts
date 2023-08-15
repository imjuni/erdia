import { CE_COLUMN_ATTRIBUTE } from '#configs/const-enum/CE_COLUMN_ATTRIBUTE';
import type { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata';

export default function getColumnAttributeKey(columnMetadata: Pick<ColumnMetadata, 'relationMetadata' | 'isPrimary'>) {
  return [
    columnMetadata.relationMetadata != null ? CE_COLUMN_ATTRIBUTE.FK : undefined,
    columnMetadata.isPrimary ? CE_COLUMN_ATTRIBUTE.PK : undefined,
  ].filter((attribute): attribute is CE_COLUMN_ATTRIBUTE => attribute != null);
}
