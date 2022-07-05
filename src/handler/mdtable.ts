import getColumnTypeWithLength from '@common/getColumnTypeWithLength';
import getEntityName from '@common/getEntityName';
import eol from '@misc/eol';
import escape, { reaplceNewline } from '@misc/escape';
import { IErdiaCliOptions } from '@misc/options';
import { populate } from 'my-easy-fp';
import { DataSource } from 'typeorm';

async function mdtable(dataSource: DataSource, option: IErdiaCliOptions, heading?: number) {
  const headingChar = populate(heading ?? 2)
    .map(() => '#')
    .join('');
  const entities = dataSource.entityMetadatas.sort((a, b) => getEntityName(a).localeCompare(getEntityName(b)));

  const entityTable = entities.map((entity) => {
    const { columns } = entity;

    const columnMarkdowns = columns.map((column) => {
      return `| ${column.propertyName} | ${column.databaseName} | ${getColumnTypeWithLength(column)} | ${escape(
        reaplceNewline(column.comment ?? 'N/A', option.html ? '<br />' : '. '),
        '. ',
      )} |`;
    });

    const columnHeading = `| Name | Name in DB | Type | Comment |`;
    const columnSplitter = `| :-: | :-: | :-: | :- |`;
    const columnTable = [columnHeading, columnSplitter, columnMarkdowns.join(eol())].join(eol());

    return `${headingChar} ${entity.tableName}(${entity.name})${eol(2)}${columnTable}`;
  });

  return entityTable.join(eol(3));
}

export default mdtable;
