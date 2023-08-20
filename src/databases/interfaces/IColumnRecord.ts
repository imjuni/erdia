import type { CE_COLUMN_ATTRIBUTE } from '#configs/const-enum/CE_COLUMN_ATTRIBUTE';
import type IBaseRecord from '#databases/interfaces/IBaseRecord';
import type TDatabaseRecord from '#databases/interfaces/TDatabaseRecord';

export default interface IColumnRecord extends IBaseRecord {
  $kind: 'column';

  /** property name of entity */
  name: string;

  /** table name of database */
  dbName: string;

  /** column attribute key, (e.g., PK, FK) */
  attributeKey: CE_COLUMN_ATTRIBUTE[];

  /** column type */
  columnType: string;

  /** column is nullable */
  isNullable: string;

  /** column charset */
  charset: string;

  /** column type with column length(if column is lengthed typed) */
  columnTypeWithLength: string;

  /** column sort weight */
  weight: number;

  /** comment of entity, column */
  comment: string;

  prev?: TDatabaseRecord;
}
