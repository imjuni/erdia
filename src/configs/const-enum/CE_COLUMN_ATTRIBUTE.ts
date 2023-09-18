/**
 * ER Diagram column attribute
 *
 * - PK: primary key
 * - FK: foreign key
 * - UK: unique key
 */
export const CE_COLUMN_ATTRIBUTE = {
  PK: 'PK',
  FK: 'FK',
  UK: 'UK',
} as const;

export type CE_COLUMN_ATTRIBUTE = (typeof CE_COLUMN_ATTRIBUTE)[keyof typeof CE_COLUMN_ATTRIBUTE];
