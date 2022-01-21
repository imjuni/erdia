import { ColumnType } from 'typeorm';

const getColumnType = (columnType: ColumnType) => {
  if (typeof columnType === 'function') {
    return columnType.name.toString().toLowerCase();
  }

  return columnType.toString();
};

export default getColumnType;
