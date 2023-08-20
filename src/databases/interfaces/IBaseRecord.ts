import type { CE_CHANGE_KIND } from '#databases/interfaces/CE_CHANGE_KIND';
import type IRecordMetadata from '#databases/interfaces/IRecordMetadata';

export default interface IBaseRecord extends IRecordMetadata {
  $kind: 'column' | 'entity' | 'relation';

  /** entity name of metadata */
  entity: string;

  /** database value change kind */
  change: CE_CHANGE_KIND;
}
