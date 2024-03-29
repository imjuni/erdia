import { getPlainRelationType } from '#/common/getPlainRelationType';
import type { IRelationRecord } from '#/databases/interfaces/IRelationRecord';

export function getRelationHash(
  relation: Pick<IRelationRecord, 'entity' | 'inverseEntityName' | 'relationType'>,
): string {
  const entities = [relation.entity, relation.inverseEntityName].sort((l, r) => l.localeCompare(r));

  const plainRelationType = getPlainRelationType(relation.relationType);
  const baseHash = [...entities, plainRelationType].join(':');
  const base64 = Buffer.from(baseHash).toString('base64');

  return base64;
}
