import { TTABLE_COLUMN } from '@config/interface/TTABLE_COLUMN';

const tableHeadingCaption: Record<TTABLE_COLUMN, string> = {
  [TTABLE_COLUMN.COLUMN_TYPE]: 'Type',
  [TTABLE_COLUMN.COLUMN_NAME]: 'Name',
  [TTABLE_COLUMN.ENTITY_NAME]: 'Name of Entity',
  [TTABLE_COLUMN.COMMENT]: 'Comment',
  [TTABLE_COLUMN.IS_NULLABLE]: 'Nullable',
  [TTABLE_COLUMN.CHARSET]: 'Charset',
  [TTABLE_COLUMN.ATTRIBUTE_KEY]: 'Attribute Key',
};

export default tableHeadingCaption;
