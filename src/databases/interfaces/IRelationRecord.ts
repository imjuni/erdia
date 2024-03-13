import type { CE_RECORD_KIND } from '#/databases/const-enum/CE_RECORD_KIND';
import type { IBaseRecord } from '#/databases/interfaces/IBaseRecord';
import type { RelationType } from 'typeorm/metadata/types/RelationTypes';

export interface IRelationRecord extends IBaseRecord {
  $kind: typeof CE_RECORD_KIND.RELATION;

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
}
