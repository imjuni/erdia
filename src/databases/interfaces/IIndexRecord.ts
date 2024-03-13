import type { CE_RECORD_KIND } from '#/databases/const-enum/CE_RECORD_KIND';
import type { IBaseRecord } from '#/databases/interfaces/IBaseRecord';
import type { IndexMetadata } from 'typeorm/metadata/IndexMetadata';

export interface IIndexRecord extends IBaseRecord {
  /** kind of record */
  $kind: typeof CE_RECORD_KIND.INDEX;

  /** name from property name */
  name: string;

  /** name from database */
  dbName: string;

  /** the table name(entity) that containing index */
  tableName: string;

  /** the table name(db) that containing index */
  tableDBName: string;

  /** Indicates if this index must be unique. */
  isUnique: IndexMetadata['isUnique'];

  /**
   * The FULLTEXT modifier indexes the entire column and does not allow prefixing.
   * Works only in MySQL.
   */
  isFulltext: IndexMetadata['isFulltext'];

  /**
   * The SPATIAL modifier indexes the entire column and does not allow indexed columns to contain NULL values.
   * Works only in MySQL.
   */
  isSpatial: IndexMetadata['isSpatial'];

  /** the column name that building index */
  columnNames: string[];
}
