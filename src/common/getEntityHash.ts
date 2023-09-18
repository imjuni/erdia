import type IEntityRecord from '#/databases/interfaces/IEntityRecord';

export default function getEntityHash(entity: Pick<IEntityRecord, 'entity' | 'dbName'>): string {
  const baseHash = [entity.entity, entity.dbName].join(':');
  const base64 = Buffer.from(baseHash).toString('base64');

  return base64;
}
