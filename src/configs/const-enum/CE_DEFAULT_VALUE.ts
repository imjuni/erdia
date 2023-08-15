export const CE_DEFAULT_VALUE = {
  CONFIG_FILE_NAME: '.erdiarc',
  TSCONFIG_FILE_NAME: 'tsconfig.json',

  HTML_INDEX_FILENAME: 'index.html',
  HTML_MERMAID_FILENAME: 'mermaid.html',

  MARKDOWN_FILENAME: 'erdia.md',
} as const;

export type CE_DEFAULT_VALUE = (typeof CE_DEFAULT_VALUE)[keyof typeof CE_DEFAULT_VALUE];
