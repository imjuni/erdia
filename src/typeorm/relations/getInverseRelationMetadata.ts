import { getEntityName } from '#/typeorm/entities/getEntityName';
import { atOrUndefined } from 'my-easy-fp';
import type { RelationMetadata } from 'typeorm/metadata/RelationMetadata';

export function getInverseRelationMetadata(
  relationMetadata: Pick<RelationMetadata, 'entityMetadata' | 'inverseEntityMetadata' | 'inverseJoinColumns'>,
) {
  const entityName = getEntityName(relationMetadata.entityMetadata);
  const raceInverseRelationMetadata = () => {
    const fromInverseMetadata = relationMetadata.inverseEntityMetadata.relations.find(
      (relation) => getEntityName(relation.inverseEntityMetadata) === entityName,
    );

    const fromInverseJoinColumns = atOrUndefined(relationMetadata.inverseJoinColumns, 0);

    if (fromInverseMetadata != null) {
      return fromInverseMetadata;
    }

    if (fromInverseJoinColumns?.relationMetadata != null) {
      return fromInverseJoinColumns.relationMetadata;
    }

    return undefined;
  };

  const inverseRelationMetadata = raceInverseRelationMetadata();

  if (inverseRelationMetadata == null) {
    throw new Error(
      `Cannot found relation from inverse entity metadata: ${relationMetadata.inverseEntityMetadata.name}`,
    );
  }

  return inverseRelationMetadata;
}
