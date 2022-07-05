import { RelationMetadata } from 'typeorm/metadata/RelationMetadata';

const dedupeRelations = (relations: RelationMetadata[]) => {
  const dedupeTable = relations.reduce<Record<string, RelationMetadata>>((table, relation) => {
    const inverseEntityMeta = relation.inverseEntityMetadata;
    const entityMeta = relation.entityMetadata;

    const key = [inverseEntityMeta.name, entityMeta.name].sort((left, right) => left.localeCompare(right)).join(':');

    if (table[key] === undefined || table[key] === null) {
      return { ...table, [key]: relation };
    }

    return table;
  }, {});

  return Object.values(dedupeTable);
};

export default dedupeRelations;
