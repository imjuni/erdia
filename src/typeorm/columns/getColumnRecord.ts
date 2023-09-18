import type IBuildCommandOption from 'src/configs/interfaces/IBuildCommandOption';
import getColumnWeight from 'src/creators/columns/getColumnWeight';
import { CE_CHANGE_KIND } from 'src/databases/interfaces/CE_CHANGE_KIND';
import type IColumnRecord from 'src/databases/interfaces/IColumnRecord';
import type IRecordMetadata from 'src/databases/interfaces/IRecordMetadata';
import getColumnAttributeKey from 'src/typeorm/columns/getColumnAttributeKey';
import getColumnType from 'src/typeorm/columns/getColumnType';
import getComment from 'src/typeorm/columns/getComment';
import getIsNullable from 'src/typeorm/columns/getIsNullable';
import getEntityName from 'src/typeorm/entities/getEntityName';
import type { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata';

export default function getColumnRecord(
  columnMetadata: ColumnMetadata,
  option: IBuildCommandOption,
  metadata: IRecordMetadata,
): IColumnRecord {
  /** entity name of metadata */
  const entityName = getEntityName(columnMetadata.entityMetadata);

  const { propertyName } = columnMetadata;

  /** table name of database */
  const columnName = columnMetadata.databaseName;

  /** column attribute key, (e.g., PK, FK) */
  const attributeKey = getColumnAttributeKey(columnMetadata);

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
