import type IBaseRecord from '#databases/interfaces/IBaseRecord';
import type TDatabaseRecord from '#databases/interfaces/TDatabaseRecord';

export default interface IEntityRecord extends IBaseRecord {
  /** kind of record */
  $kind: 'entity';

  /** name from property name */
  name: string;

  /** name from database */
  dbName: string;

  /** entity has relation that is set true otherwise false */
  hasRelation: boolean;

  /** prev entity */
  prev?: TDatabaseRecord;
}