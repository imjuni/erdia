import { RelationType } from 'typeorm/metadata/types/RelationTypes';

export default interface IRelationData {
  /** entity name */
  entityName: string;

  /** inverse entity name */
  inverseEntityName: string;

  /** join property name of entity */
  joinPropertyName: string;

  /** join entity name of database */
  joinColumnName: string;

  joinColumnOne: boolean;
  joinColumnNullable: boolean;

  inverseJoinColumnOne: boolean;
  inverseJoinColumnNullable: boolean;

  /** relation type */
  relationType: RelationType;

  /** hash of sort entity name pair */
  relationHash: string;
}
