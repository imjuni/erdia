import type IRelationRecord from '#/databases/interfaces/IRelationRecord';

export default function getPlainRelationType(relationType: IRelationRecord['relationType']) {
  if (relationType === 'one-to-one') {
    return 'one-to-one';
  }

  if (relationType === 'many-to-many') {
    return 'many-to-many';
  }

  return 'one-to-many';
}
