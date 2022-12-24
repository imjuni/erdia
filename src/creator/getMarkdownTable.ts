import columnWeight from '@config/interface/columnWeight';
import IErdiaMarkdownOption from '@config/interface/IErdiaMarkdownOption';
import { TTABLE_COLUMN } from '@config/interface/TTABLE_COLUMN';
import tableHeadingCaption from '@creator/tableHeadingCaption';
import eol from '@tool/eol';
import logger from '@tool/logger';
import IColumnData from '@typeorm/interface/IColumnData';
import IEntityData from '@typeorm/interface/IEntityData';

const log = logger();

const tableSplitter: Record<TTABLE_COLUMN, string> = {
  [TTABLE_COLUMN.COLUMN_TYPE]: ':-',
  [TTABLE_COLUMN.COLUMN_NAME]: ':-',
  [TTABLE_COLUMN.ENTITY_NAME]: ':-',
  [TTABLE_COLUMN.IS_NULLABLE]: ':-:',
  [TTABLE_COLUMN.CHARSET]: ':-:',
  [TTABLE_COLUMN.COMMENT]: ':-',
  [TTABLE_COLUMN.ATTRIBUTE_KEY]: ':-:',
};

function columnDataToMarkdown(columnData: IColumnData, exportColumns: TTABLE_COLUMN[]) {
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

    if (column === 'is-nullable') {
      return columnData.isNullable;
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

export default function getMarkdownTable(entityDatas: IEntityData[], option: IErdiaMarkdownOption) {
  const exportColumns: TTABLE_COLUMN[] = [
    TTABLE_COLUMN.COLUMN_TYPE,
    TTABLE_COLUMN.COLUMN_NAME,
    TTABLE_COLUMN.IS_NULLABLE,
    ...option.tableColumns,
  ].sort((l, r) => (columnWeight[l] ?? 0) - (columnWeight[r] ?? 0));

  log.debug(`will export column: ${exportColumns.join(', ')}`);

  const table = entityDatas.map((entityData) => {
    const headings = `| ${exportColumns.map((column) => tableHeadingCaption[column]).join(' | ')} |`;
    const splitter = `| ${exportColumns.map((column) => tableSplitter[column]).join(' | ')} |`;
    const rows = entityData.columns.map((column) => {
      const row = columnDataToMarkdown(column, exportColumns);
      return `| ${row.join(' | ')} |`;
    });

    return [`## ${getEntityNameHeading(entityData)}`, headings, splitter, rows.join('\n')].join('\n');
  });

  return table.join(eol(2));
}
