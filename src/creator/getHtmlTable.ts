import IErdiaHtmlOption from '@config/interface/IErdiaHtmlOption';
import IErdiaPDFOption from '@config/interface/IErdiaPDFOption';
import TTableColumn, { weight as tableColumnWeight } from '@config/interface/TTableColumn';
import tableHeadingCaption from '@creator/tableHeadingCaption';
import eol from '@tool/eol';
import logger from '@tool/logger';
import getEntityData from '@typeorm/getEntityData';
import IColumnData from '@typeorm/interface/IColumnData';
import IEntityData from '@typeorm/interface/IEntityData';
import { DataSource } from 'typeorm';

const log = logger();

function columnDataToMarkdown(columnData: IColumnData, exportColumns: TTableColumn[]) {
  const columns = exportColumns.map((column) => {
    if (column === 'column-name') {
      return columnData.columnName;
    }

    if (column === 'column-type') {
      return columnData.columnTypeWithLength;
    }

    if (column === 'attribute-key') {
      return columnData.attributeKey;
    }

    if (column === 'comment') {
      return columnData.comment;
    }

    if (column === 'entity-name') {
      return columnData.propertyName;
    }

    return '';
  });

  return columns;
}

function getEntityNameHeading(entityData: IEntityData): string {
  if (entityData.tableName !== undefined && entityData.tableName !== null) {
    return `${entityData.tableName} (${entityData.entityName})`;
  }

  return `${entityData.entityName}`;
}

function template(entity: string, headingSize: number, tableHead: string, tableBody: string) {
  return `
<h${headingSize} class="title is-${headingSize + 1}">
  ${entity}
</h${headingSize}>

<table class="table is-fullwidth is-striped is-hoverable">
  <thead>
    ${tableHead}
  </thead>

  <tbody>
    ${tableBody}
  </tbody>
</table>
  `.trim();
}

export default function getHtmlTable(dataSource: DataSource, option: IErdiaHtmlOption | IErdiaPDFOption) {
  const entityDatas = dataSource.entityMetadatas.map((entityMetadata) => getEntityData(entityMetadata, option));

  const exportColumns: TTableColumn[] = ['column-type' as const, 'column-name' as const, ...option.tableColumns].sort(
    (l, r) => (tableColumnWeight[l] ?? 0) - (tableColumnWeight[r] ?? 0),
  );

  log.debug(`will export column: ${exportColumns.join(', ')}`);

  const table = entityDatas.map((entityData) => {
    const headings = `<tr>${exportColumns.map((column) => `<td>${tableHeadingCaption[column]}</td>`).join(eol())}</tr>`;

    const rows = entityData.columns.map((column) => {
      const row = columnDataToMarkdown(column, exportColumns);
      return `<tr> ${row.map((element) => `<td>${element}</td>`).join(eol())} </tr>`;
    });

    return template(getEntityNameHeading(entityData), 2, headings, rows.join(eol()));
  });

  return table.join(eol(2));
}
