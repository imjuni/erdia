import IErdiaHtmlOption from '@config/interface/IErdiaHtmlOption';
import IErdiaImageOption from '@config/interface/IErdiaImageOption';
import IErdiaMarkdownOption from '@config/interface/IErdiaMarkdownOption';
import IErdiaPDFOption from '@config/interface/IErdiaPDFOption';
import getEntityData from '@typeorm/getEntityData';
import IEntityData from '@typeorm/interface/IEntityData';
import { DataSource } from 'typeorm';

export default function getEntityDatas(
  dataSource: DataSource,
  option: IErdiaHtmlOption | IErdiaMarkdownOption | IErdiaPDFOption | IErdiaImageOption,
): IEntityData[] {
  const entityDatas = dataSource.entityMetadatas.map((entityMetadata) => getEntityData(entityMetadata, option));

  return entityDatas;
}
