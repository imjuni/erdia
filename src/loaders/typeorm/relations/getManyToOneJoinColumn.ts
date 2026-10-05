import type { RelationMetadata } from "typeorm/metadata/RelationMetadata";

import type { IRelationRecord } from "#/databases/interfaces/IRelationRecord";
import { getEntityName } from "#/loaders/typeorm/entities/getEntityName";

export const getManyToOneJoinColumn = (
  relationMetadata: Pick<RelationMetadata, "joinColumns" | "entityMetadata" | "propertyName">,
): Pick<IRelationRecord, "joinColumnName" | "joinPropertyName" | "inverseJoinColumnNullable"> => {
  const joinColumn = relationMetadata.joinColumns.find(
    (column) =>
      getEntityName(column.entityMetadata) === getEntityName(relationMetadata.entityMetadata),
  );
  if (joinColumn === null || joinColumn === undefined) {
    throw new Error(
      `Invalid joinColumn detected: [${relationMetadata.joinColumns.length}] ${relationMetadata.propertyName}`,
    );
  }
  return {
    inverseJoinColumnNullable: joinColumn.isNullable,
    joinPropertyName: joinColumn.propertyName,
    joinColumnName: joinColumn.databaseName,
  };
};
