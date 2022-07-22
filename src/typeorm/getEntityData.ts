import IErdiaHtmlOption from '@config/interface/IErdiaHtmlOption';
import IErdiaImageOption from '@config/interface/IErdiaImageOption';
import IErdiaMarkdownOption from '@config/interface/IErdiaMarkdownOption';
import IErdiaPDFOption from '@config/interface/IErdiaPDFOption';
import getColumnData from '@typeorm/getColumnData';
import IEntityData from '@typeorm/interface/IEntityData';
import { EntityMetadata } from 'typeorm';

export default function getEntityData(
  entityMetadata: EntityMetadata,
  option: IErdiaHtmlOption | IErdiaMarkdownOption | IErdiaPDFOption | IErdiaImageOption,
): IEntityData {
  const { tableName } = entityMetadata;
  const entityName = entityMetadata.name;
  const columns = entityMetadata.columns
    .map((column) => getColumnData(column, option))
    .sort((l, r) => r.weight - l.weight);

  return {
    tableName,
    entityName,
    columns,
  };
}
