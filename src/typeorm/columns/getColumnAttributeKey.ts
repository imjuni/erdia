import { CE_COLUMN_ATTRIBUTE } from '#/configs/const-enum/CE_COLUMN_ATTRIBUTE';
import type { IIndexRecord } from '#/databases/interfaces/IIndexRecord';
import alasql from 'alasql';
import { atOrUndefined } from 'my-easy-fp';
import type { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata';

export function getColumnAttributeKey(
  columnMetadata: Pick<ColumnMetadata, 'relationMetadata' | 'isPrimary'>,
  dbName: string,
  tableDBName: string,
  indexRecords: IIndexRecord[],
) {
  const indices = alasql('SELECT * FROM ? WHERE ? = ANY (columnNames) and tableDBName = ?', [
    indexRecords,
    dbName,
    tableDBName,
  ]) as IIndexRecord[];

  const index = atOrUndefined(indices, 0);

  return [
    columnMetadata.relationMetadata != null ? CE_COLUMN_ATTRIBUTE.FK : undefined,
    columnMetadata.isPrimary ? CE_COLUMN_ATTRIBUTE.PK : undefined,
    index?.isUnique ? CE_COLUMN_ATTRIBUTE.UK : undefined,
  ].filter((attribute): attribute is CE_COLUMN_ATTRIBUTE => attribute != null);
}
