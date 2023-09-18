import type { CE_RECORD_KIND } from '#/databases/const-enum/CE_RECORD_KIND';
import type IBaseRecord from '#/databases/interfaces/IBaseRecord';
import type IColumnRecord from '#/databases/interfaces/IColumnRecord';
import type IIndexRecord from '#/databases/interfaces/IIndexRecord';
import type IRelationRecord from '#/databases/interfaces/IRelationRecord';

export default interface IEntityWithColumnAndRelationAndIndex extends IBaseRecord {
  /** kind of record */
  $kind: typeof CE_RECORD_KIND.ENTITY;

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

  /** index record in this entity */
  indices: IIndexRecord[];
}
