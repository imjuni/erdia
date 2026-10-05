import { consola } from "consola";
import type { RelationMetadata } from "typeorm/metadata/RelationMetadata";

import type { IRelationRecord } from "#/databases/interfaces/IRelationRecord";
import { getEntityName } from "#/loaders/typeorm/entities/getEntityName";
import { getInverseRelationMetadata } from "#/loaders/typeorm/relations/getInverseRelationMetadata";

export const getManyToManyJoinColumn = (
  relationMetadata: Pick<
    RelationMetadata,
    | "joinTableName"
    | "joinColumns"
    | "entityMetadata"
    | "inverseEntityMetadata"
    | "inverseJoinColumns"
  >,
): Pick<
  IRelationRecord,
  | "joinColumnName"
  | "joinPropertyName"
  | "inverseJoinColumnOne"
  | "inverseJoinColumnNullable"
  | "isDuplicate"
> => {
  const joinTable = relationMetadata.joinTableName;
  const joinColumn = relationMetadata.joinColumns.find(
    (column) => getEntityName(column.entityMetadata) === joinTable,
  );
  const inverseRelationMetadata = getInverseRelationMetadata(relationMetadata);
  if (joinColumn !== null && joinColumn !== undefined) {
    consola.debug(`M:N entity: ${joinColumn.propertyName}-${relationMetadata.joinTableName}`);
    return {
      inverseJoinColumnOne: false,
      inverseJoinColumnNullable: inverseRelationMetadata.isNullable,
      joinPropertyName: joinColumn.propertyName,
      joinColumnName: joinColumn.databaseName,
      isDuplicate: false,
    };
  }
  const entityName = getEntityName(relationMetadata.entityMetadata);
  const manyToManyRelation = relationMetadata.inverseEntityMetadata.manyToManyRelations.find(
    (manyToOneRelationMetadata) => {
      const inverseEntityName = getEntityName(manyToOneRelationMetadata.inverseEntityMetadata);
      return inverseEntityName === entityName;
    },
  );
  if (manyToManyRelation === null || manyToManyRelation === undefined) {
    throw new Error(
      `Cannot found relation on many-to-many side: ${relationMetadata.entityMetadata.name}`,
    );
  }
  const inverseJoinTable = manyToManyRelation.joinTableName;
  const inverseJoinColumn = manyToManyRelation.joinColumns.find(
    (column) => getEntityName(column.entityMetadata) === inverseJoinTable,
  );
  if (inverseJoinColumn === null || inverseJoinColumn === undefined) {
    throw new Error(
      `Cannot found join-column on many-to-many side: ${manyToManyRelation.entityMetadata.name}`,
    );
  }
  return {
    inverseJoinColumnOne: false,
    inverseJoinColumnNullable: inverseRelationMetadata.isNullable,
    joinPropertyName: inverseJoinColumn.propertyName,
    joinColumnName: inverseJoinColumn.databaseName,
    isDuplicate: false,
  };
};
