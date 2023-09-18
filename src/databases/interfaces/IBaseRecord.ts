import type { CE_CHANGE_KIND } from '#/databases/const-enum/CE_CHANGE_KIND';
import type { CE_RECORD_KIND } from '#/databases/const-enum/CE_RECORD_KIND';
import type IRecordMetadata from '#/databases/interfaces/IRecordMetadata';
import type TDatabaseRecord from '#/databases/interfaces/TDatabaseRecord';

export default interface IBaseRecord extends IRecordMetadata {
  $kind: CE_RECORD_KIND;

  /** entity name of metadata */
  entity: string;

  /** database value change kind */
  change: CE_CHANGE_KIND;

  /** prev entity */
  prev?: TDatabaseRecord;
}
