import type IRelationRecord from 'src/databases/interfaces/IRelationRecord';
import getEntityName from 'src/typeorm/entities/getEntityName';
import getManyToManyJoinColumn from 'src/typeorm/relations/getManyToManyJoinColumn';
import getManyToOneJoinColumn from 'src/typeorm/relations/getManyToOneJoinColumn';
import type { RelationMetadata } from 'typeorm/metadata/RelationMetadata';

export default function getJoinColumn(
  relationMetadata: RelationMetadata,
): Pick<
  IRelationRecord,
  'joinColumnName' | 'joinPropertyName' | 'inverseJoinColumnOne' | 'inverseJoinColumnNullable' | 'isDuplicate'
> {
  if (relationMetadata.relationType === 'one-to-one') {
    const joinColumn = relationMetadata.joinColumns.find(
      (column) => getEntityName(column.entityMetadata) === getEntityName(relationMetadata.entityMetadata),
    );

    if (joinColumn != null) {
      return {
        inverseJoinColumnOne: true,
        inverseJoinColumnNullable: joinColumn.isNullable,
        joinPropertyName: joinColumn.propertyName,
        joinColumnName: joinColumn.databaseName,
        isDuplicate: false,
      };
    }

    const entityName = getEntityName(relationMetadata.entityMetadata);
    const inverseRelationMetadata = relationMetadata.inverseEntityMetadata.oneToOneRelations.find(
      (oneToOneRelation) => {
        return getEntityName(oneToOneRelation.inverseEntityMetadata) === entityName;
      },
    );

    if (inverseRelationMetadata == null) {
      throw new Error(`Invalid joinColumn detected: ${relationMetadata.propertyName}`);
    }

    const inverseJoinColumn = inverseRelationMetadata.joinColumns.find(
      (column) => getEntityName(column.entityMetadata) === getEntityName(inverseRelationMetadata.entityMetadata),
    );

    if (inverseJoinColumn == null) {
      throw new Error(`Invalid joinColumn detected: ${relationMetadata.propertyName}`);
    }

    return {
      inverseJoinColumnOne: true,
      inverseJoinColumnNullable: inverseRelationMetadata.isNullable,
      joinPropertyName: inverseJoinColumn.propertyName,
      joinColumnName: inverseJoinColumn.databaseName,
      isDuplicate: true,
    };
  }

  if (relationMetadata.relationType === 'many-to-one') {
    return { ...getManyToOneJoinColumn(relationMetadata), inverseJoinColumnOne: true, isDuplicate: false };
  }

  if (relationMetadata.relationType === 'one-to-many') {
    const oneEntityName = getEntityName(relationMetadata.entityMetadata);

    const manyToOneRelation = relationMetadata.inverseEntityMetadata.manyToOneRelations.find(
      (manyToOneRelationMetadata) => {
        const entityName = getEntityName(manyToOneRelationMetadata.inverseEntityMetadata);
        return entityName === oneEntityName;
      },
    );

    if (manyToOneRelation == null) {
      throw new Error(`Cannot found relation on many-to-one side: ${relationMetadata.entityMetadata.name}`);
    }

    return { ...getManyToOneJoinColumn(manyToOneRelation), inverseJoinColumnOne: false, isDuplicate: true };
  }

  return getManyToManyJoinColumn(relationMetadata);
}
