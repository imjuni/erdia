import createEntityDiagram from '@creator/createEntityDiagram';
import dedupeRelations from '@creator/dedupeRelations';
import getRelationDiagram from '@creator/getRelationDiagram';
import { Connection } from 'typeorm';
import os from 'os';
import eol from '@misc/eol';
import getEntityName from '@common/getEntityName';

async function erdiagram(conn: Connection) {
  const entities = conn.entityMetadatas.sort((a, b) =>
    getEntityName(a).localeCompare(getEntityName(b)),
  );
  const entityDiagrams = entities.map((entity) => createEntityDiagram({ entity }));

  const relations = entities
    .map((entity) => entity.relations)
    .flatMap((entity) => entity)
    .sort((a, b) => getEntityName(a.entityMetadata).localeCompare(getEntityName(b.entityMetadata)));
  const deduped = dedupeRelations(relations);
  const relationDiagrams = deduped.map((relation) => getRelationDiagram(relation));

  return `erDiagram${eol(2)}${entityDiagrams.join(os.EOL)}${eol(2)}${relationDiagrams.join(
    os.EOL,
  )}`;
}

export default erdiagram;
