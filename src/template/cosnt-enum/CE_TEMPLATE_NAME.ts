export const CE_TEMPLATE_NAME = {
  HTML_DOCUMENT_TOC: 'html/document-toc',
  HTML_DOCUMENT: 'html/document',
  HTML_MERMAID_SCRIPT: 'html/mermaid-script',
  HTML_MERMAID_TOC: 'html/mermaid-toc',
  HTML_MERMAID: 'html/mermaid',
  HTML_STYLE: 'html/style',
  HTML_TABLE: 'html/table',

  IMAGE_DOCUMENT: 'image/document',
  IMAGE_MERMAID_SCRIPT: 'image/mermaid-script',
  IMAGE_STYLE: 'image/style',

  MARKDOWN_DOCUMENT: 'markdown/document',
  MARKDOWN_MERMAID: 'markdown/mermaid',
  MARKDOWN_TABLE: 'markdown/table',
  MARKDOWN_TOC: 'markdown/toc',

  MERMAID_DOCUMENT: 'mermaid/document',
  MERMAID_ENTITY: 'mermaid/entity',
  MERMAID_RELATION: 'mermaid/relation',

  PDF_DOCUMENT_TOC: 'pdf/document-toc',
  PDF_DOCUMENT: 'pdf/document',
  PDF_MERMAID_SCRIPT: 'pdf/mermaid-script',
  PDF_STYLE: 'pdf/style',
  PDF_TABLE: 'pdf/table',
} as const;

export type CE_TEMPLATE_NAME = (typeof CE_TEMPLATE_NAME)[keyof typeof CE_TEMPLATE_NAME];
