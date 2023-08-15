import type IBaseRecord from '#databases/interfaces/IBaseRecord';
import type IColumnRecord from '#databases/interfaces/IColumnRecord';
import type IRelationRecord from '#databases/interfaces/IRelationRecord';

export default interface IEntityWithColumnAndRelation extends IBaseRecord {
  /** kind of record */
  $kind: 'entity';

  /** name from property name */
  name: string;

  /** name from database */
  dbName: string;

  /** entity has relation that is set true otherwise false */
  hasRelation: boolean;

  /** column record in this entity */
  columns: IColumnRecord[];

  /** relation record in this entity */
  relations: IRelationRecord[];
}
