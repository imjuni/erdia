import IErdiaHtmlOption from '@config/interface/IErdiaHtmlOption';
import IErdiaImageOption from '@config/interface/IErdiaImageOption';
import IErdiaMarkdownOption from '@config/interface/IErdiaMarkdownOption';
import IErdiaPDFOption from '@config/interface/IErdiaPDFOption';
import getColumnDiagramData from '@creator/getColumnDiagramData';
import indent from '@tool/indent';
import logger from '@tool/logger';
import getSelectedEntityName from '@typeorm/getSelectedEntityName';
import IEntityData from '@typeorm/interface/IEntityData';
import chalk from 'chalk';

const log = logger();

function mermaidFormat(name: string, columns: string) {
  return `
${name} {
${columns}
}
`.trim();
}

export default function getEntityDiagramData(
  entity: IEntityData,
  option: IErdiaHtmlOption | IErdiaMarkdownOption | IErdiaPDFOption | IErdiaImageOption,
) {
  const columns = entity.columns.map((column) => getColumnDiagramData(column, option));
  const name = getSelectedEntityName(entity);

  log.debug(`${chalk.greenBright('start')} generate ${name} diagram data`);

  const mermaidColumns = columns
    .sort((l, r) => r.weight - l.weight)
    .map((column) => `${indent(option.indent)}${column.mermaid}`)
    .join('\n');

  return {
    name,
    columns,
    mermaid: mermaidFormat(name, mermaidColumns),
  };
}
