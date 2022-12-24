import IRelationData from '@typeorm/interface/IRelationData';

export default function getPlainRelationType(relationType: IRelationData['relationType']) {
  if (relationType === 'one-to-one') {
    return 'one-to-one';
  }

  if (relationType === 'many-to-many') {
    return 'many-to-many';
  }

  return 'one-to-many';
}
