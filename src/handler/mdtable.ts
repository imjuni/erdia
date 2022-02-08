import getColumnTypeWithLength from '@common/getColumnTypeWithLength';
import getEntityName from '@common/getEntityName';
import eol from '@misc/eol';
import escape from '@misc/escape';
import { populate } from 'my-easy-fp';
import { Connection } from 'typeorm';

async function mdtable(conn: Connection, heading?: number) {
  const headingChar = populate(heading ?? 2)
    .map(() => '#')
    .join('');
  const entities = conn.entityMetadatas.sort((a, b) =>
    getEntityName(a).localeCompare(getEntityName(b)),
  );

  const entityTable = entities.map((entity) => {
    const columns = entity.columns;

    const columnMarkdowns = columns.map((column) => {
      return `| ${column.propertyName} | ${column.databaseName} | ${getColumnTypeWithLength(
        column,
      )} | ${escape(column.comment ?? 'N/A')} |`;
    });

    const columnHeading = `| Name | Name in DB | Type | Comment |`;
    const columnSplitter = `| :-: | :-: | :-: | :- |`;
    const columnTable = [columnHeading, columnSplitter, columnMarkdowns.join(eol())].join(eol());

    return `${headingChar} ${entity.name}(${entity.tableName})${eol(2)}${columnTable}`;
  });

  return entityTable.join(eol(3));
}

export default mdtable;
