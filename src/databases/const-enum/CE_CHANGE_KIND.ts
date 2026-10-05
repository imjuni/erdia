export const CE_CHANGE_KIND = {
  ADD: "add",
  CHANGE: "change",
  DELETE: "delete",
  NONE: "none",
} as const;

export type CE_CHANGE_KIND = (typeof CE_CHANGE_KIND)[keyof typeof CE_CHANGE_KIND];
