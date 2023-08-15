export const CE_COMMAND_LIST = {
  BUILD: 'build',
  INIT: 'init',
  CLEAN: 'clean',

  BUILD_ALIAS: 'b',
  INIT_ALIAS: 'i',
  CLEAN_ALIAS: 'c',
} as const;

export type CE_COMMAND_LIST = (typeof CE_COMMAND_LIST)[keyof typeof CE_COMMAND_LIST];
