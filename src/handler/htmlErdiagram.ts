import getEntityName from '@common/getEntityName';
import createEntityDiagram from '@creator/createEntityDiagram';
import dedupeRelations from '@creator/dedupeRelations';
import getRelationDiagram from '@creator/getRelationDiagram';
import eol from '@misc/eol';
import consola from 'consola';
import os from 'os';
import { DataSource } from 'typeorm';

async function htmlErdiagram(dataSource: DataSource) {
  consola.start('generate erdiagram, ...\n');

  const entities = dataSource.entityMetadatas.sort((a, b) => getEntityName(a).localeCompare(getEntityName(b)));
  const entityDiagrams = entities.map((entity) => createEntityDiagram({ entity }));

  consola.log('');

  const relations = entities
    .map((entity) => entity.relations)
    .flatMap((entity) => entity)
    .sort((a, b) => getEntityName(a.entityMetadata).localeCompare(getEntityName(b.entityMetadata)));
  const deduped = dedupeRelations(relations);
  const relationDiagrams = deduped.map((relation) => getRelationDiagram(relation));

  return [
    `<pre class="mermaid">
erDiagram

${entityDiagrams.join(os.EOL)}

${relationDiagrams.join(os.EOL)}

</pre>`,
    `<form style="margin-top: 20px;">
  <textarea class="textarea" rows="7">
erDiagram

${entityDiagrams.join(os.EOL)}

${relationDiagrams.join(os.EOL)}
  </textarea>
</form>`,
  ].join(eol(3));
}

export default htmlErdiagram;
