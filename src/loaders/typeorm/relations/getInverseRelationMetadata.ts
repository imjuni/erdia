import { atOrUndefined } from "my-easy-fp";
import type { RelationMetadata } from "typeorm/metadata/RelationMetadata";

import { getEntityName } from "#/loaders/typeorm/entities/getEntityName";

export const getInverseRelationMetadata = (
  relationMetadata: Pick<
    RelationMetadata,
    "entityMetadata" | "inverseEntityMetadata" | "inverseJoinColumns"
  >,
) => {
  const entityName = getEntityName(relationMetadata.entityMetadata);
  const fromInverseMetadata = relationMetadata.inverseEntityMetadata.relations.find(
    (relation) => getEntityName(relation.inverseEntityMetadata) === entityName,
  );
  const fromInverseJoinColumns = atOrUndefined(relationMetadata.inverseJoinColumns, 0);
  const inverseRelationMetadata = fromInverseMetadata ?? fromInverseJoinColumns?.relationMetadata;
  if (inverseRelationMetadata === null || inverseRelationMetadata === undefined) {
    throw new Error(
      `Cannot found relation from inverse entity metadata: ${relationMetadata.inverseEntityMetadata.name}`,
    );
  }
  return inverseRelationMetadata;
};
