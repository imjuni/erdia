export const CE_DEFAULT_VALUE = {
  CONFIG_FILE_NAME: ".erdiarc",
  DATABASE_FILENAME: "erdiadb.json",
  DATA_SOURCE_FILE_FUZZY_SCORE_LIMIT: 50,
  HTML_INDEX_FILENAME: "index.html",
  HTML_MERMAID_FILENAME: "mermaid.html",
  MARKDOWN_FILENAME: "erdia.md",
  OUTPUT_DIRECTORY_FUZZY_SCORE_LIMIT: 50,
  TEMPLATES_PATH: "templates",
  TSCONFIG_FILE_NAME: "tsconfig.json",
  VERSION_FILENAME: ".erdiaverrc",
} as const;

export type CE_DEFAULT_VALUE =
  (typeof CE_DEFAULT_VALUE)[keyof typeof CE_DEFAULT_VALUE];
