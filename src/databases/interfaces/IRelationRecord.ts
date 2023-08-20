import type IBaseRecord from '#databases/interfaces/IBaseRecord';
import type TDatabaseRecord from '#databases/interfaces/TDatabaseRecord';
import type { RelationType } from 'typeorm/metadata/types/RelationTypes';

export default interface IRelationRecord extends IBaseRecord {
  $kind: 'relation';

  /** relation property name */
  name: string;
  /** relation database name */
  dbName: string;

  /** inverse property name */
  inverseEntityName: string;
  /** inverse entity database name */
  inverseEntityDBName: string;

  /** join property name of entity */
  joinPropertyName: string;

  /** join entity name of database */
  joinColumnName: string;
  inverseJoinColumnName?: string;

  joinColumnOne: boolean;
  joinColumnNullable: boolean;

  inverseJoinColumnOne: boolean;
  inverseJoinColumnNullable: boolean;

  /** relation type */
  relationType: RelationType;

  /** hash of sort entity name pair */
  relationHash: string;

  /** order of entity name */
  order: number;

  /** will be deduped */
  isDuplicate: boolean;

  prev?: TDatabaseRecord;
}
