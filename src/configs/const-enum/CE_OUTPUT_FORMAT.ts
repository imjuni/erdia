export const CE_OUTPUT_FORMAT = {
  HTML: "html",
  IMAGE: "image",
  MARKDOWN: "md",
  PDF: "pdf",
} as const;

export type CE_OUTPUT_FORMAT =
  (typeof CE_OUTPUT_FORMAT)[keyof typeof CE_OUTPUT_FORMAT];
