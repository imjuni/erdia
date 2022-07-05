import getColumnType from '@common/getColumnType';
import getEntityName from '@common/getEntityName';
import { reaplceNewline } from '@misc/escape';
import chalk from 'chalk';
import consola from 'consola';
import { populate } from 'my-easy-fp';
import os from 'os';
import { EntityMetadata } from 'typeorm';
import { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata';

function getColumnDesc(column: ColumnMetadata): string {
  try {
    const { relationMetadata, comment, isPrimary } = column;

    if (isPrimary && comment !== undefined && comment !== null) {
      const escapedComment = reaplceNewline(comment, ' ');
      return `PK "${escapedComment}"`;
    }

    if (relationMetadata !== undefined && comment !== undefined && comment !== null) {
      const escapedComment = reaplceNewline(comment, ' ');
      return `FK "${escapedComment}"`;
    }

    if (relationMetadata) {
      return `FK`;
    }

    if (isPrimary) {
      return `PK`;
    }

    if (comment !== undefined && comment !== null) {
      const escapedComment = reaplceNewline(comment, ' ');
      return `  "${escapedComment}"`;
    }

    return '';
  } catch {
    return '';
  }
}

const createEntityDiagram = ({
  entity,
  indent: originIndent,
  size: originSize,
}: {
  entity: EntityMetadata;
  indent?: string;
  size?: number;
}): string => {
  try {
    consola.success('Generate diagram: ', chalk.greenBright(getEntityName(entity)));

    const hasMermaidBug = false;
    const { columns } = entity;

    const indentString = originIndent ?? ' ';
    const size = originSize ?? 2;
    const indent = populate(size)
      .map(() => indentString)
      .join('');

    const columnDiagrams = columns.map((column) => {
      if (hasMermaidBug) {
        return `${getColumnType(column.type)} ${column.databaseName}`;
      }

      return `${getColumnType(column.type)} ${column.databaseName} ${getColumnDesc(column)}`;
    });

    return `${getEntityName(entity)} {${os.EOL}${columnDiagrams.map((column) => `${indent}${column}`).join(os.EOL)}${
      os.EOL
    }}`;
  } catch (catched) {
    const err = catched instanceof Error ? catched : new Error('unknown error raised!');

    throw err;
  }
};

export default createEntityDiagram;
