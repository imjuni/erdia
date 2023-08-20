export const CE_OUTPUT_FORMAT = {
  HTML: 'html',
  MARKDOWN: 'md',
  PDF: 'pdf',
  IMAGE: 'image',
} as const;

export type CE_OUTPUT_FORMAT = (typeof CE_OUTPUT_FORMAT)[keyof typeof CE_OUTPUT_FORMAT];
