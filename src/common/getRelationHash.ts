import getPlainRelationType from '@common/getPlainRelationType';
import IRelationData from '@typeorm/interface/IRelationData';

export default function getRelationHash(
  relationData: Pick<IRelationData, 'entityName' | 'inverseEntityName' | 'relationType'>,
): string {
  const entities = [relationData.entityName, relationData.inverseEntityName].sort((l, r) => l.localeCompare(r));

  const plainRelationType = getPlainRelationType(relationData.relationType);
  const baseHash = [...entities, plainRelationType].join(':');
  const base64 = Buffer.from(baseHash).toString('base64');

  return base64;
}
