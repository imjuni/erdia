import buildConfig from '#/template/config/init-command';
import { CE_TEMPLATE_NAME } from '#/template/cosnt-enum/CE_TEMPLATE_NAME';
import htmlDocument from '#/template/html/document';
import htmlToC from '#/template/html/document-toc';
import htmlMermaid from '#/template/html/mermaid';
import mermaidScript from '#/template/html/mermaid-script';
import mermaidToC from '#/template/html/mermaid-toc';
import htmlStyle from '#/template/html/style';
import htmlTable from '#/template/html/table';
import imageDocument from '#/template/image/document';
import imageMermaidScript from '#/template/image/mermaid-script';
import imageStyle from '#/template/image/style';
import markdownDocument from '#/template/markdown/document';
import markdownMermaid from '#/template/markdown/mermaid';
import markdownTable from '#/template/markdown/table';
import markdownToC from '#/template/markdown/toc';
import mermaidDocument from '#/template/mermaid/document';
import mermaidEntity from '#/template/mermaid/entity';
import mermaidRelation from '#/template/mermaid/relation';
import pdfDocument from '#/template/pdf/document';
import pdfToC from '#/template/pdf/document-toc';
import pdfMermaidScript from '#/template/pdf/mermaid-script';
import pdfStyle from '#/template/pdf/style';
import pdfTable from '#/template/pdf/table';

const defaultTemplates: Record<CE_TEMPLATE_NAME, string> = {
  [CE_TEMPLATE_NAME.HTML_DOCUMENT_TOC]: htmlToC,
  [CE_TEMPLATE_NAME.HTML_DOCUMENT]: htmlDocument,
  [CE_TEMPLATE_NAME.HTML_MERMAID_SCRIPT]: mermaidScript,
  [CE_TEMPLATE_NAME.HTML_MERMAID_TOC]: mermaidToC,
  [CE_TEMPLATE_NAME.HTML_MERMAID]: htmlMermaid,
  [CE_TEMPLATE_NAME.HTML_STYLE]: htmlStyle,
  [CE_TEMPLATE_NAME.HTML_TABLE]: htmlTable,

  [CE_TEMPLATE_NAME.IMAGE_DOCUMENT]: imageDocument,
  [CE_TEMPLATE_NAME.IMAGE_MERMAID_SCRIPT]: imageMermaidScript,
  [CE_TEMPLATE_NAME.IMAGE_STYLE]: imageStyle,

  [CE_TEMPLATE_NAME.MARKDOWN_DOCUMENT]: markdownDocument,
  [CE_TEMPLATE_NAME.MARKDOWN_MERMAID]: markdownMermaid,
  [CE_TEMPLATE_NAME.MARKDOWN_TABLE]: markdownTable,
  [CE_TEMPLATE_NAME.MARKDOWN_TOC]: markdownToC,

  [CE_TEMPLATE_NAME.MERMAID_DOCUMENT]: mermaidDocument,
  [CE_TEMPLATE_NAME.MERMAID_ENTITY]: mermaidEntity,
  [CE_TEMPLATE_NAME.MERMAID_RELATION]: mermaidRelation,

  [CE_TEMPLATE_NAME.PDF_DOCUMENT_TOC]: pdfToC,
  [CE_TEMPLATE_NAME.PDF_DOCUMENT]: pdfDocument,
  [CE_TEMPLATE_NAME.PDF_MERMAID_SCRIPT]: pdfMermaidScript,
  [CE_TEMPLATE_NAME.PDF_STYLE]: pdfStyle,
  [CE_TEMPLATE_NAME.PDF_TABLE]: pdfTable,

  [CE_TEMPLATE_NAME.CONFIG_JSON]: buildConfig,
};

export default defaultTemplates;
