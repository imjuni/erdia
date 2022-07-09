import IErdiaHtmlOption from '@config/interface/IErdiaHtmlOption';
import IErdiaImageOption from '@config/interface/IErdiaImageOption';
import IErdiaMarkdownOption from '@config/interface/IErdiaMarkdownOption';
import IErdiaPDFOption from '@config/interface/IErdiaPDFOption';
import dedupeRelationDatas from '@creator/dedupeRelations';
import getEntityDiagramData from '@creator/getEntityDiagramData';
import getRelationDiagramData from '@creator/getRelationDiagramData';
import eol from '@tool/eol';
import logger from '@tool/logger';
import getEntityData from '@typeorm/getEntityData';
import getRelationData from '@typeorm/getRelationData';
import getSelectedEntityName from '@typeorm/getSelectedEntityName';
import IRelationData from '@typeorm/interface/IRelationData';
import { IPass, isPass } from 'my-only-either';
import { DataSource } from 'typeorm';

const log = logger();

function template(entity: string, relation: string) {
  return `
erDiagram

${entity}

${relation}
`.trim();
}

export default function getERdiagram(
  dataSource: DataSource,
  option: IErdiaHtmlOption | IErdiaMarkdownOption | IErdiaPDFOption | IErdiaImageOption,
) {
  const entityDatas = dataSource.entityMetadatas.map((entityMetadata) => getEntityData(entityMetadata, option));
  const relationDatas = dataSource.entityMetadatas
    .map((entityMetadata) => {
      log.debug(`Entity: ${getSelectedEntityName(entityMetadata)}, Length: ${entityMetadata.relations.length}`);
      return entityMetadata.relations.map((relation) => getRelationData(dataSource.entityMetadatas, relation));
    })
    .flat();

  const dedupedRelationDatas = dedupeRelationDatas(
    relationDatas
      .filter((relationData): relationData is IPass<IRelationData[]> => isPass(relationData))
      .map((relationData) => relationData.pass)
      .flat(),
  );

  const entityDiagrams = entityDatas.map((entityData) => getEntityDiagramData(entityData, option));
  const relationDiagrams = dedupedRelationDatas.map((relationData) => getRelationDiagramData(relationData));

  const entityMermaids = entityDiagrams.map((diagram) => diagram.mermaid).join(eol(2));
  const relationMermaids = relationDiagrams.map((diagram) => diagram.mermaid).join(eol());

  return template(entityMermaids, relationMermaids);
}
