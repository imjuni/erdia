import type { IRelationRecord } from '#/databases/interfaces/IRelationRecord';
import { atOrThrow } from 'my-easy-fp';

export function dedupeManaToManyRelationRecord(relations: IRelationRecord[]) {
  const otherRelations = relations.filter((relation) => relation.relationType !== 'many-to-many');
  const manyToManyRelations = relations.filter((relation) => relation.relationType === 'many-to-many');

  const relationMap = manyToManyRelations.reduce<Record<string, IRelationRecord[]>>((aggregation, relation) => {
    if (aggregation[relation.relationHash] == null) {
      return { ...aggregation, [relation.relationHash]: [relation] };
    }

    return { ...aggregation, [relation.relationHash]: [...aggregation[relation.relationHash], relation] };
  }, {});

  const nextRelations = Object.values(relationMap).map((chunkedRelations) => {
    const sortedRelations = chunkedRelations.sort((l, r) => l.dbName.localeCompare(r.dbName));

    const firstRelation = atOrThrow(
      sortedRelations,
      0,
      new Error(`Cannot found relation: ${sortedRelations.at(0)?.entity} - ${sortedRelations.at(1)?.entity}`),
    );
    const secondRelation = atOrThrow(
      sortedRelations,
      1,
      new Error(`Cannot found relation: ${sortedRelations.at(0)?.entity} - ${sortedRelations.at(1)?.entity}`),
    );

    const firstNext = { ...firstRelation, inverseJoinColumnName: secondRelation.joinColumnName };
    const secondNext = { ...secondRelation, inverseJoinColumnName: firstRelation.joinColumnName, isDuplicate: true };

    return [firstNext, secondNext];
  });

  return [...otherRelations, ...nextRelations.flat()];
}
