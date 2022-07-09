import IRelationData from '@typeorm/interface/IRelationData';

function getPlainRelationType(relationType: IRelationData['relationType']) {
  if (relationType === 'one-to-one') {
    return 'one-to-one';
  }

  if (relationType === 'many-to-many') {
    return 'many-to-many';
  }

  return 'one-to-many';
}

export default function getRelationHash(
  relationData: Pick<IRelationData, 'entityName' | 'inverseEntityName' | 'relationType'>,
): string {
  const entities = [relationData.entityName, relationData.inverseEntityName].sort((l, r) => l.localeCompare(r));

  const plainRelationType = getPlainRelationType(relationData.relationType);
  const baseHash = [...entities, plainRelationType].join(':');
  const base64 = Buffer.from(baseHash).toString('base64');

  return base64;
}
