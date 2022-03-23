import getColumnType from '@common/getColumnType';
import getEntityName from '@common/getEntityName';
import chalk from 'chalk';
import consola from 'consola';
import { populate } from 'my-easy-fp';
import os from 'os';
import { EntityMetadata } from 'typeorm';

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

    const hasMermaidBug = true;
    const columns = entity.columns;

    const indentString = originIndent ?? ' ';
    const size = originSize ?? 2;
    const indent = populate(size)
      .map(() => indentString)
      .join('');

    const columnDiagrams = columns.map((column) => {
      if (hasMermaidBug) {
        return `${getColumnType(column.type)} ${column.databaseName}`;
      }

      return column.isPrimary
        ? `${getColumnType(column.type)} ${column.databaseName}  PK "The ${entity.name} #"`
        : `${getColumnType(column.type)} ${column.databaseName}`;
    });

    return `${getEntityName(entity)} {${os.EOL}${columnDiagrams
      .map((column) => `${indent}${column}`)
      .join(os.EOL)}${os.EOL}}`;
  } catch (catched) {
    const err = catched instanceof Error ? catched : new Error('unknown error raised!');

    // console.error('Error raised1');
    // console.error(chalk.redBright(err.message));
    // console.error(chalk.redBright(err.stack));

    throw err;
  }
};

export default createEntityDiagram;
