import IColumnData from '@typeorm/interface/IColumnData';

export default interface IEntityData {
  /** table name of database */
  tableName?: string;

  /** entity name of metadata */
  entityName: string;

  /** information of columns */
  columns: IColumnData[];
}
