import type IDocumentOption from '#configs/interfaces/IDocumentOption';
import defaultTemplates from '#template/defaultTemplates';
import fs from 'fs';
import { isTrue } from 'my-easy-fp';
import { exists } from 'my-node-fp';
import path from 'path';
import { CE_TEMPLATE_NAME } from './cosnt-enum/CE_TEMPLATE_NAME';

const templates: Record<string, string> = { ...defaultTemplates };

export function getTemplates() {
  return templates;
}

export async function loadTemplates(option: Pick<IDocumentOption, 'templatePath'>) {
  const { templatePath } = option;

  if (templatePath == null) {
    return true;
  }

  await Promise.all(
    [
      CE_TEMPLATE_NAME.HTML_DOCUMENT_TOC,
      CE_TEMPLATE_NAME.HTML_DOCUMENT,
      CE_TEMPLATE_NAME.HTML_MERMAID_SCRIPT,
      CE_TEMPLATE_NAME.HTML_MERMAID_TOC,
      CE_TEMPLATE_NAME.HTML_MERMAID,
      CE_TEMPLATE_NAME.HTML_STYLE,
      CE_TEMPLATE_NAME.HTML_TABLE,
      CE_TEMPLATE_NAME.IMAGE_DOCUMENT,
      CE_TEMPLATE_NAME.IMAGE_MERMAID_SCRIPT,
      CE_TEMPLATE_NAME.IMAGE_STYLE,
      CE_TEMPLATE_NAME.MARKDOWN_DOCUMENT,
      CE_TEMPLATE_NAME.MARKDOWN_MERMAID,
      CE_TEMPLATE_NAME.MARKDOWN_TABLE,
      CE_TEMPLATE_NAME.MARKDOWN_TOC,
      CE_TEMPLATE_NAME.MERMAID_DOCUMENT,
      CE_TEMPLATE_NAME.MERMAID_ENTITY,
      CE_TEMPLATE_NAME.MERMAID_RELATION,
      CE_TEMPLATE_NAME.PDF_DOCUMENT_TOC,
      CE_TEMPLATE_NAME.PDF_DOCUMENT,
      CE_TEMPLATE_NAME.PDF_MERMAID_SCRIPT,
      CE_TEMPLATE_NAME.PDF_STYLE,
      CE_TEMPLATE_NAME.PDF_TABLE,
    ].map(async (template) => {
      const filename = path.resolve(path.join(templatePath, `${template}.ejs`));

      if (isTrue(await exists(filename))) {
        const buf = await fs.promises.readFile(filename);
        templates[template] = buf.toString();
      }
    }),
  );

  return true;
}
