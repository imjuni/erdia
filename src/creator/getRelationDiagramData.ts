import IRelationData from '@typeorm/interface/IRelationData';

export default function getRelationDiagramData(relation: IRelationData) {
  if (relation.relationType === 'many-to-many') {
    // many-to-many relation using join-table, so join column is n/a
    return {
      relation,
      mermaid: `${relation.entityName} ${relation.joinColumnNullable ?? false ? '}o' : '}|'}--${
        relation.inverseJoinColumnNullable ?? false ? 'o{' : '|{'
      } ${relation.inverseEntityName}: ${relation.joinColumnName}`,
    };
  }

  if (relation.relationType === 'many-to-one') {
    return {
      relation,
      mermaid: `${relation.entityName} ${relation.joinColumnNullable ?? false ? '}o' : '}|'}--${
        relation.inverseJoinColumnNullable ?? false ? 'o|' : '||'
      } ${relation.inverseEntityName}: "${relation.joinColumnName}"`,
    };
  }
  if (relation.relationType === 'one-to-many') {
    return {
      relation,
      mermaid: `${relation.entityName} ${relation.joinColumnNullable ?? false ? '|o' : '||'}--${
        relation.inverseJoinColumnNullable ?? false ? 'o{' : '|{'
      } ${relation.inverseEntityName}: "${relation.joinColumnName}"`,
    };
  }

  if (relation.relationType === 'one-to-one') {
    return {
      relation,
      mermaid: `${relation.entityName} ${relation.joinColumnNullable ?? false ? '|o' : '||'}--${
        relation.inverseJoinColumnNullable ?? false ? 'o|' : '||'
      } ${relation.inverseEntityName}: "${relation.joinColumnName}"`,
    };
  }

  throw new Error('');
}
