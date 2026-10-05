import type { EntityMetadata } from "typeorm";
import type { RelationMetadata } from "typeorm/metadata/RelationMetadata";

import { getEntityName } from "#/loaders/typeorm/entities/getEntityName";

export const getManyToManyEntityMetadata = (
  entityMetadatas: EntityMetadata[],
  relationMetadata: Pick<
    RelationMetadata,
    "entityMetadata" | "joinTableName" | "inverseEntityMetadata"
  >,
) => {
  const entityName = getEntityName(relationMetadata.entityMetadata);
  const { joinTableName } = relationMetadata;
  const joinEntityMetadata = entityMetadatas.find(
    (entityMetadata) => entityMetadata.name === joinTableName,
  );
  if (joinEntityMetadata !== null && joinEntityMetadata !== undefined) {
    return joinEntityMetadata;
  }
  const manyToManyRelation = relationMetadata.inverseEntityMetadata.manyToManyRelations.find(
    (manyToOneRelationMetadata) => {
      const inverseEntityName = getEntityName(manyToOneRelationMetadata.inverseEntityMetadata);
      return inverseEntityName === entityName;
    },
  );
  if (manyToManyRelation === null || manyToManyRelation === undefined) {
    throw new Error("many-to-many relations need JoinTable more than one!");
  }
  const inverseJoinTableName = manyToManyRelation.joinTableName;
  const inverseJoinEntityMetadata = entityMetadatas.find(
    (entityMetadata) => entityMetadata.name === inverseJoinTableName,
  );
  if (inverseJoinEntityMetadata === null || inverseJoinEntityMetadata === undefined) {
    throw new Error(`[many-to-many] cannot found entity: ${inverseJoinTableName}`);
  }
  return inverseJoinEntityMetadata;
};
