import { isFalse } from 'my-easy-fp';
import { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata';
import getColumnType from './getColumnType';

const getColumnTypeWithLength = (column: ColumnMetadata) => {
  try {
    const columnType = getColumnType(column.type);
    const columnLength = parseInt(column.length, 10);

    if (isFalse(isNaN(columnLength))) {
      return `${columnType}(${columnLength})`;
    }

    return `${columnType}`;
  } catch {
    return 'N/A';
  }
};

export default getColumnTypeWithLength;
