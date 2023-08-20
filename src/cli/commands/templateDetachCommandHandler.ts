import type ICommonOption from '#configs/interfaces/ICommonOption';
import getCwd from '#configs/modules/getCwd';
import { CE_TEMPLATE_NAME } from '#template/cosnt-enum/CE_TEMPLATE_NAME';
import defaultTemplates from '#template/defaultTemplates';
import getOutputDirectory from '#tools/files/getOutputDirectory';
import fs from 'fs';
import { isFalse } from 'my-easy-fp';
import { exists, getDirname } from 'my-node-fp';
import path from 'path';

export default async function templateDetachCommandHandler(option: Pick<ICommonOption, 'output'>) {
  const outputDir = await getOutputDirectory(option, getCwd(process.env));

  const writeFile = async (template: CE_TEMPLATE_NAME) => {
    const filename = path.resolve(path.join(outputDir, 'template', `${template}.ejs`));
    const dirname = await getDirname(filename);

    if (isFalse(await exists(dirname))) {
      await fs.promises.mkdir(dirname, { recursive: true });
    }

    await fs.promises.writeFile(filename, defaultTemplates[template]);
  };

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
    ].map((template) => writeFile(template)),
  );
}