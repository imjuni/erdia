export const CE_TEMPLATE_NAME = {
  HTML_DOCUMENT_TOC: 'html-document-toc',
  HTML_DOCUMENT: 'html-document',
  HTML_MERMAID: 'html-mermaid',
  HTML_MERMAID_TOC: 'html-mermaid-toc',
  HTML_MERMAID_DIAGRAM: 'html-mermaid-diagram',
  HTML_STYLE: 'html-style',
  HTML_TABLE: 'html-table',

  IMAGE_DOCUMENT: 'image-document',
  IMAGE_MERMAID_DIAGRAM: 'image-mermaid-diagram',
  IMAGE_STYLE: 'image-style',

  MARKDOWN_DOCUMENT: 'markdown-document',
  MARKDOWN_MERMAID_DIAGRAM: 'markdown-mermaid-diagram',
  MARKDOWN_TABLE: 'markdown-table',
  MARKDOWN_TOC: 'markdown-toc',

  PDF_DOCUMENT_TOC: 'pdf-document-toc',
  PDF_DOCUMENT: 'pdf-document',
  PDF_MERMAID_DIAGRAM: 'pdf-mermaid-diagram',
  PDF_STYLE: 'pdf-style',
  PDF_TABLE: 'pdf-table',

  CONFIG_JSON: 'config-json',
} as const;

export type CE_TEMPLATE_NAME = (typeof CE_TEMPLATE_NAME)[keyof typeof CE_TEMPLATE_NAME];
