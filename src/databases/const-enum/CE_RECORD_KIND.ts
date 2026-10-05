export const CE_RECORD_KIND = {
  COLUMN: "column",
  ENTITY: "entity",
  INDEX: "index",
  RELATION: "relation",
} as const;

export type CE_RECORD_KIND = (typeof CE_RECORD_KIND)[keyof typeof CE_RECORD_KIND];
