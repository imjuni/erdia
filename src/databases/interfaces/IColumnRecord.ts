import type { CE_COLUMN_ATTRIBUTE } from '#/configs/const-enum/CE_COLUMN_ATTRIBUTE';
import type { CE_RECORD_KIND } from '#/databases/const-enum/CE_RECORD_KIND';
import type IBaseRecord from '#/databases/interfaces/IBaseRecord';

export default interface IColumnRecord extends IBaseRecord {
  $kind: typeof CE_RECORD_KIND.COLUMN;

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
}
