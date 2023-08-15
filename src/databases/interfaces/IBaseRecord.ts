import type IRecordMetadata from '#databases/interfaces/IRecordMetadata';

export default interface IBaseRecord extends IRecordMetadata {
  $kind: 'column' | 'entity' | 'relation';

  /** entity name of metadata */
  entity: string;
}
