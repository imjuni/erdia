/**
 * ER Diagram output component
 *
 * - table: Entity spec.
 * - er: ER diagram
 */
export const CE_OUTPUT_COMPONENT = {
  ER: "er",
  TABLE: "table",
} as const;

export type CE_OUTPUT_COMPONENT =
  (typeof CE_OUTPUT_COMPONENT)[keyof typeof CE_OUTPUT_COMPONENT];
