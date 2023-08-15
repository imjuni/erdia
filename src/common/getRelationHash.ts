import getPlainRelationType from '#common/getPlainRelationType';
import type IRelationRecord from '#databases/interfaces/IRelationRecord';

export default function getRelationHash(
  relationData: Pick<IRelationRecord, 'entity' | 'inverseEntityName' | 'relationType'>,
): string {
  const entities = [relationData.entity, relationData.inverseEntityName].sort((l, r) => l.localeCompare(r));

  const plainRelationType = getPlainRelationType(relationData.relationType);
  const baseHash = [...entities, plainRelationType].join(':');
  const base64 = Buffer.from(baseHash).toString('base64');

  return base64;
}
