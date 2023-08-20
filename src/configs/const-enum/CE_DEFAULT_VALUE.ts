export const CE_DEFAULT_VALUE = {
  CONFIG_FILE_NAME: '.erdiarc',
  TSCONFIG_FILE_NAME: 'tsconfig.json',

  HTML_INDEX_FILENAME: 'index.html',
  HTML_MERMAID_FILENAME: 'mermaid.html',

  MARKDOWN_FILENAME: 'erdia.md',

  DATABASE_FILENAME: 'erdiadb.json',
  VERSION_FILENAME: '.erdiaverrc',

  DATA_SOURCE_FILE_FUZZY_SCORE_LIMIT: 50,
  OUTPUT_DIRECTORY_FUZZY_SCORE_LIMIT: 50,
} as const;

export type CE_DEFAULT_VALUE = (typeof CE_DEFAULT_VALUE)[keyof typeof CE_DEFAULT_VALUE];
