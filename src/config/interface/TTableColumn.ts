/**
 * Entity table additional column
 *
 * column-type, column-name is default value
 */
type TTableColumn = 'column-type' | 'column-name' | 'entity-name' | 'comment' | 'attribute-key';

export const weight: Record<string, number> = {
  'column-name': 0,
  'entity-name': 1,
  'column-type': 2,
  'attribute-key': 3,
  comment: 4,
};

export default TTableColumn;
