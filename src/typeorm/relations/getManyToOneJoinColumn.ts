import type IRelationRecord from '#/databases/interfaces/IRelationRecord';
import getEntityName from '#/typeorm/entities/getEntityName';
import type { RelationMetadata } from 'typeorm/metadata/RelationMetadata';

export default function getManyToOneJoinColumn(
  relationMetadata: Pick<RelationMetadata, 'joinColumns' | 'entityMetadata' | 'propertyName'>,
): Pick<IRelationRecord, 'joinColumnName' | 'joinPropertyName' | 'inverseJoinColumnNullable'> {
  const joinColumn = relationMetadata.joinColumns.find(
    (column) => getEntityName(column.entityMetadata) === getEntityName(relationMetadata.entityMetadata),
  );

  if (joinColumn == null) {
    throw new Error(
      `Invalid joinColumn detected: [${relationMetadata.joinColumns.length}] ${relationMetadata.propertyName}`,
    );
  }

  return {
    inverseJoinColumnNullable: joinColumn.isNullable,
    joinPropertyName: joinColumn.propertyName,
    joinColumnName: joinColumn.databaseName,
  };
}
