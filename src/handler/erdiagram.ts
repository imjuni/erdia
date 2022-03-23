import getEntityName from '@common/getEntityName';
import createEntityDiagram from '@creator/createEntityDiagram';
import dedupeRelations from '@creator/dedupeRelations';
import getRelationDiagram from '@creator/getRelationDiagram';
import eol from '@misc/eol';
import consola from 'consola';
import os from 'os';
import { Connection } from 'typeorm';

async function erdiagram(conn: Connection) {
  consola.start('generate erdiagram, ...\n');

  const entities = conn.entityMetadatas.sort((a, b) =>
    getEntityName(a).localeCompare(getEntityName(b)),
  );
  const entityDiagrams = entities.map((entity) => createEntityDiagram({ entity }));

  consola.log('');

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
