/**
 * Entity table additional column
 *
 * column-type, column-name is default value
 */
type TTableColumn = 'column-type' | 'column-name' | 'entity-name' | 'is-nullable' | 'comment' | 'attribute-key';

export const weight: Record<string, number> = {
  'column-name': 0,
  'entity-name': 1,
  'column-type': 2,
  'is-nullable': 3,
  'attribute-key': 4,
  comment: 5,
};

export default TTableColumn;
