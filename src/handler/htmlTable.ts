import getColumnTypeWithLength from '@common/getColumnTypeWithLength';
import getEntityName from '@common/getEntityName';
import eol from '@misc/eol';
import escape, { reaplceNewline } from '@misc/escape';
import { DataSource } from 'typeorm';

async function htmlTable(dataSource: DataSource, heading?: number) {
  const headingSize = heading ?? 1;
  const headingTag = `h${headingSize}`;
  const entities = dataSource.entityMetadatas.sort((a, b) => getEntityName(a).localeCompare(getEntityName(b)));

  const entityTable = entities.map((entity) => {
    const { columns } = entity;

    const columnMarkdowns = columns.map((column) => {
      return [
        '<tr>',
        `<td>${column.propertyName}</td>`,
        `<td>${column.databaseName}</td>`,
        `<td>${getColumnTypeWithLength(column)}</td>`,
        `<td>${escape(reaplceNewline(column.comment ?? 'N/A', '<br />'), '. ')}</td>`,
        '</tr>',
      ].join(eol());
    });

    const columnHeading = `<thead>
  <tr>
    <th>Name</th>
    <th>Name in DB</th>
    <th>Type</th>
    <th>Commont</th>
  </tr>
</thead>
`;

    const columnTable = [columnHeading, '<tbody>', columnMarkdowns.join(eol()), '</tbody>'].join(eol());

    return `<${headingTag} class="title is-${headingSize + 1}">${entity.tableName} (${
      entity.name
    })</${headingTag}>${eol(2)}<table class="table is-striped is-hoverable">${columnTable}</table>`;
  });

  return entityTable.join(eol(3));
}

export default htmlTable;
