export default interface IColumnData {
  /** entity name of metadata */
  entityName: string;

  /** property name of entity */
  propertyName: string;

  /** table name of database */
  columnName: string;

  /** column attribute key, (e.g., PK, FK) */
  attributeKey: string;

  /** column type */
  columnType: string;

  /** column type with column length(if column is lengthed typed) */
  columnTypeWithLength: string;

  /** column sort weight */
  weight: number;

  /** comment of entity, column */
  comment: string;
}
