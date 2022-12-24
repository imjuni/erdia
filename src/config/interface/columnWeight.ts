import { TTABLE_COLUMN } from '@config/interface/TTABLE_COLUMN';

const columnWeight: Readonly<Record<TTABLE_COLUMN, number>> = {
  [TTABLE_COLUMN.COLUMN_NAME]: 0,
  [TTABLE_COLUMN.ENTITY_NAME]: 1,
  [TTABLE_COLUMN.COLUMN_TYPE]: 2,
  [TTABLE_COLUMN.IS_NULLABLE]: 3,
  [TTABLE_COLUMN.ATTRIBUTE_KEY]: 4,
  [TTABLE_COLUMN.CHARSET]: 5,
  [TTABLE_COLUMN.COMMENT]: 6,
};

export default columnWeight;
