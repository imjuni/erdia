/**
 * ER Diagram output component
 *
 * - table: Entity spec.
 * - er: ER diagram
 */
export const CE_OUTPUT_COMPONENT = {
  TABLE: 'table',
  ER: 'er',
} as const;

export type CE_OUTPUT_COMPONENT = (typeof CE_OUTPUT_COMPONENT)[keyof typeof CE_OUTPUT_COMPONENT];
