/* eslint-disable @typescript-eslint/no-redeclare, @typescript-eslint/naming-convention */

/**
 * Entity table additional column
 *
 * column-type, column-name is default value
 */
export const TTABLE_COLUMN = {
  COLUMN_TYPE: 'column-type',
  COLUMN_NAME: 'column-name',
  ENTITY_NAME: 'entity-name',
  IS_NULLABLE: 'is-nullable',
  COMMENT: 'comment',
  ATTRIBUTE_KEY: 'attribute-key',
  CHARSET: 'charset',
} as const;

export type TTABLE_COLUMN = typeof TTABLE_COLUMN[keyof typeof TTABLE_COLUMN];
