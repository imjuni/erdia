import IErdiaHtmlOption from '@config/interface/IErdiaHtmlOption';
import IErdiaImageOption from '@config/interface/IErdiaImageOption';
import IErdiaMarkdownOption from '@config/interface/IErdiaMarkdownOption';
import IErdiaPDFOption from '@config/interface/IErdiaPDFOption';
import getColumnAttributeKey from '@creator/getColumnAttributeKey';
import getColumnType from '@typeorm/getColumnType';
import getComment from '@typeorm/getComment';
import getSelectedEntityName from '@typeorm/getSelectedEntityName';
import IColumnData from '@typeorm/interface/IColumnData';
import { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata';

export default function getColumnData(
  columnMetadata: ColumnMetadata,
  option: IErdiaHtmlOption | IErdiaMarkdownOption | IErdiaPDFOption | IErdiaImageOption,
): IColumnData {
  /** entity name of metadata */
  const entityName = getSelectedEntityName(columnMetadata.entityMetadata);

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

  return {
    entityName,
    propertyName,
    columnName,
    attributeKey,
    columnType,
    columnTypeWithLength,
    comment,
  };
}
