import type { CE_RECORD_KIND } from '#/databases/const-enum/CE_RECORD_KIND';
import type IBaseRecord from '#/databases/interfaces/IBaseRecord';

export default interface IEntityRecord extends IBaseRecord {
  /** kind of record */
  $kind: typeof CE_RECORD_KIND.ENTITY;

  /** name from property name */
  name: string;

  /** name from database */
  dbName: string;

  /** entity has relation that is set true otherwise false */
  hasRelation: boolean;
}
