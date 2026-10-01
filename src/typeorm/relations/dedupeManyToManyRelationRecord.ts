import { atOrThrow } from "my-easy-fp";

import { toSorted } from "#/common/toSorted";
import type { IRelationRecord } from "#/databases/interfaces/IRelationRecord";

export const dedupeManyToManyRelationRecord = (
  relations: IRelationRecord[]
) => {
  const otherRelations = relations.filter(
    (relation) => relation.relationType !== "many-to-many"
  );
  const manyToManyRelations = relations.filter(
    (relation) => relation.relationType === "many-to-many"
  );
  const relationMap: Record<string, IRelationRecord[]> = {};
  for (const relation of manyToManyRelations) {
    const chunk = relationMap[relation.relationHash] ?? [];
    chunk.push(relation);
    relationMap[relation.relationHash] = chunk;
  }
  const nextRelations = Object.values(relationMap).map((chunkedRelations) => {
    const sortedRelations = toSorted(chunkedRelations, (left, right) =>
      left.dbName.localeCompare(right.dbName)
    );
    const firstRelation = atOrThrow(
      sortedRelations,
      0,
      new Error(
        `Cannot found relation: ${sortedRelations.at(0)?.entity} - ${sortedRelations.at(1)?.entity}`
      )
    );
    const secondRelation =
      sortedRelations.length > 1 ? sortedRelations[1] : null;
    if (secondRelation) {
      const firstNext = {
        ...firstRelation,
        inverseJoinColumnName: secondRelation.joinColumnName,
      };
      const secondNext = {
        ...secondRelation,
        inverseJoinColumnName: firstRelation.joinColumnName,
        isDuplicate: true,
      };
      return [firstNext, secondNext];
    }
    const firstNext = { ...firstRelation };
    return [firstNext];
  });
  return [...otherRelations, ...nextRelations.flat()];
};
