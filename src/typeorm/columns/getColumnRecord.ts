import type { IBuildCommandOption } from '#/configs/interfaces/IBuildCommandOption';
import { getColumnWeight } from '#/creators/columns/getColumnWeight';
import { CE_CHANGE_KIND } from '#/databases/const-enum/CE_CHANGE_KIND';
import type { IColumnRecord } from '#/databases/interfaces/IColumnRecord';
import type { IIndexRecord } from '#/databases/interfaces/IIndexRecord';
import type { IRecordMetadata } from '#/databases/interfaces/IRecordMetadata';
import { getColumnAttributeKey } from '#/typeorm/columns/getColumnAttributeKey';
import { getColumnType } from '#/typeorm/columns/getColumnType';
import { getComment } from '#/typeorm/columns/getComment';
import { getIsNullable } from '#/typeorm/columns/getIsNullable';
import { getEntityName } from '#/typeorm/entities/getEntityName';
import type { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata';

export function getColumnRecord(
  columnMetadata: ColumnMetadata,
  option: IBuildCommandOption,
  metadata: IRecordMetadata,
  indices: IIndexRecord[],
): IColumnRecord {
  /** entity name of metadata */
  const entityName = getEntityName(columnMetadata.entityMetadata);

  const { propertyName } = columnMetadata;

  /** table name of database */
  const columnName = columnMetadata.databaseName;

  /** column attribute key, (e.g., PK, FK) */
  const attributeKey = getColumnAttributeKey(columnMetadata, columnName, entityName, indices);

  /** type of column */
  const columnType = getColumnType(columnMetadata);

  /** type of column */
  const columnTypeWithLength = getColumnType(columnMetadata, true);

  /** comment of entity, column */
  const comment = getComment(option, columnMetadata.comment);

  const isNullable = getIsNullable(columnMetadata);

  const charset = columnMetadata.charset ?? '';

  const columnData: Omit<IColumnRecord, 'weight'> = {
    $kind: 'column',
    ...metadata,
    change: CE_CHANGE_KIND.ADD,
    entity: entityName,
    name: propertyName,
    dbName: columnName,
    attributeKey,
    isNullable,
    columnType,
    charset,
    columnTypeWithLength,
    comment,
  };

  const weight = getColumnWeight(columnData);

  return { ...columnData, weight: weight.toNumber() };
}
