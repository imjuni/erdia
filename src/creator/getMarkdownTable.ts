import IErdiaMarkdownOption from '@config/interface/IErdiaMarkdownOption';
import TTableColumn, { weight as tableColumnWeight } from '@config/interface/TTableColumn';
import tableHeadingCaption from '@creator/tableHeadingCaption';
import eol from '@tool/eol';
import logger from '@tool/logger';
import getEntityData from '@typeorm/getEntityData';
import IColumnData from '@typeorm/interface/IColumnData';
import IEntityData from '@typeorm/interface/IEntityData';
import { DataSource } from 'typeorm';

const log = logger();

const tableSplitter: Record<TTableColumn, string> = {
  'column-type': ':-',
  'column-name': ':-',
  'entity-name': ':-',
  comment: ':-',
  'attribute-key': ':-:',
};

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

export default function getMarkdownTable(dataSource: DataSource, option: IErdiaMarkdownOption) {
  const entityDatas = dataSource.entityMetadatas.map((entityMetadata) => getEntityData(entityMetadata, option));

  const exportColumns: TTableColumn[] = ['column-type' as const, 'column-name' as const, ...option.tableColumns].sort(
    (l, r) => (tableColumnWeight[l] ?? 0) - (tableColumnWeight[r] ?? 0),
  );

  log.debug(`will export column: ${exportColumns.join(', ')}`);

  const table = entityDatas.map((entityData) => {
    const headings = `| ${exportColumns.map((column) => tableHeadingCaption[column]).join(' | ')} |`;
    const splitter = `| ${exportColumns.map((column) => tableSplitter[column]).join(' | ')} |`;
    const rows = entityData.columns.map((column) => {
      const row = columnDataToMarkdown(column, exportColumns);
      return `| ${row.join(' | ')} |`;
    });

    return [`# ${getEntityNameHeading(entityData)}`, headings, splitter, rows.join(eol())].join(eol());
  });

  return table.join(eol(2));
}
