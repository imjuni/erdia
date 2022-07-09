import logger from '@tool/logger';
import IRelationData from '@typeorm/interface/IRelationData';

const log = logger();

export default function dedupeRelationDatas(relations: IRelationData[]) {
  const relationRecord = relations.reduce<Record<string, IRelationData>>((record, relation) => {
    log.debug(`Relation: ${relation.relationHash} > ${relation.entityName}-${relation.inverseEntityName}`);

    return { ...record, [relation.relationHash]: relation };
  }, {});

  const dedupedRelations = Object.values(relationRecord);
  return dedupedRelations;
}
