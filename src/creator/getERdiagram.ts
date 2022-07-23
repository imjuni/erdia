import IErdiaHtmlOption from '@config/interface/IErdiaHtmlOption';
import IErdiaImageOption from '@config/interface/IErdiaImageOption';
import IErdiaMarkdownOption from '@config/interface/IErdiaMarkdownOption';
import IErdiaPDFOption from '@config/interface/IErdiaPDFOption';
import dedupeRelationDatas from '@creator/dedupeRelations';
import getEntityDiagramData from '@creator/getEntityDiagramData';
import getRelationDiagramData from '@creator/getRelationDiagramData';
import mermaidCodeTemplate from '@template/mermaidCodeTemplate';
import eol from '@tool/eol';
import getRelationData from '@typeorm/getRelationData';
import IEntityData from '@typeorm/interface/IEntityData';
import IRelationData from '@typeorm/interface/IRelationData';
import { IPass, isPass } from 'my-only-either';

export default function getERdiagram(
  entityDatas: IEntityData[],
  relationDatas: ReturnType<typeof getRelationData>[],
  option: IErdiaHtmlOption | IErdiaMarkdownOption | IErdiaPDFOption | IErdiaImageOption,
) {
  const dedupedRelationDatas = dedupeRelationDatas(
    relationDatas
      .filter((relationData): relationData is IPass<IRelationData[]> => isPass(relationData))
      .map((relationData) => relationData.pass)
      .flat(),
  ).sort((l, r) => {
    const compared = l.relationHash.localeCompare(r.relationHash);
    return compared !== 0 ? compared : l.entityName.localeCompare(r.entityName);
  });

  const entityDiagrams = entityDatas.map((entityData) => getEntityDiagramData(entityData, option));
  const relationDiagrams = dedupedRelationDatas.map((relationData) => getRelationDiagramData(relationData));

  const entityMermaids = entityDiagrams.map((diagram) => diagram.mermaid).join(eol(2));
  const relationMermaids = relationDiagrams.map((diagram) => diagram.mermaid).join(eol());

  return mermaidCodeTemplate(entityMermaids, relationMermaids);
}
