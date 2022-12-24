import columnWeight from '@config/interface/columnWeight';
import IErdiaHtmlOption from '@config/interface/IErdiaHtmlOption';
import IErdiaPDFOption from '@config/interface/IErdiaPDFOption';
import { TTABLE_COLUMN } from '@config/interface/TTABLE_COLUMN';
import tableHeadingCaption from '@creator/tableHeadingCaption';
import eol from '@tool/eol';
import logger from '@tool/logger';
import IColumnData from '@typeorm/interface/IColumnData';
import IEntityData from '@typeorm/interface/IEntityData';

const log = logger();

function columnDataToMarkdown(columnData: IColumnData, exportColumns: TTABLE_COLUMN[]) {
  const columns = exportColumns.map((column) => {
    if (column === TTABLE_COLUMN.COLUMN_NAME) {
      return columnData.columnName;
    }

    if (column === TTABLE_COLUMN.COLUMN_TYPE) {
      return columnData.columnTypeWithLength;
    }

    if (column === TTABLE_COLUMN.ATTRIBUTE_KEY) {
      return columnData.attributeKey;
    }

    if (column === TTABLE_COLUMN.COMMENT) {
      return columnData.comment;
    }

    if (column === TTABLE_COLUMN.IS_NULLABLE) {
      return columnData.isNullable;
    }

    if (column === TTABLE_COLUMN.CHARSET) {
      return columnData.charset;
    }

    if (column === TTABLE_COLUMN.ENTITY_NAME) {
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
<div class="tile">
  <div class="tile is-parent is-vertical">
    <article class="tile is-child notification is-info">
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
    </article>
  </div>
</div>
  `.trim();
}

export default function getHtmlTable(entityDatas: IEntityData[], option: IErdiaHtmlOption | IErdiaPDFOption) {
  const exportColumns: TTABLE_COLUMN[] = [
    TTABLE_COLUMN.COLUMN_TYPE,
    TTABLE_COLUMN.COLUMN_NAME,
    TTABLE_COLUMN.IS_NULLABLE,
    ...option.tableColumns,
  ].sort((l, r) => (columnWeight[l] ?? 0) - (columnWeight[r] ?? 0));

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
