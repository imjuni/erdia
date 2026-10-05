export const CE_COMMAND_LIST = {
  BUILD: "build",
  BUILD_ALIAS: "b",
  CLEAN: "clean",
  CLEAN_ALIAS: "c",
  EJECT: "eject",
  EJECT_ALIAS: "e",
  INIT: "init",
  INIT_ALIAS: "i",
} as const;

export type CE_COMMAND_LIST = (typeof CE_COMMAND_LIST)[keyof typeof CE_COMMAND_LIST];
