import type { IBuildCommandOption } from '#/configs/interfaces/IBuildCommandOption';
import { applyPrettier } from '#/creators/applyPretter';
import type { getRenderData } from '#/creators/getRenderData';
import type { IErdiaDocument } from '#/creators/interfaces/IErdiaDocument';
import { CE_TEMPLATE_NAME } from '#/template/cosnt-enum/CE_TEMPLATE_NAME';
import { evaluateTemplate } from '#/template/evaluateTemplate';
import { getDirname } from 'my-node-fp';
import { randomUUID } from 'node:crypto';
import path from 'path';
import type { AsyncReturnType } from 'type-fest';

export async function createPdfHtml(option: IBuildCommandOption, renderData: AsyncReturnType<typeof getRenderData>) {
  const rawHtml = await evaluateTemplate(CE_TEMPLATE_NAME.PDF_DOCUMENT, renderData);
  const prettiedHtml = await applyPrettier(rawHtml, 'html', option.prettierConfig);
  const outputDir = await getDirname(option.output ?? process.cwd());
  const tempFileName = path.join(outputDir, `${randomUUID()}.html`);

  return {
    dirname: path.resolve(outputDir),
    content: prettiedHtml,
    filename: path.resolve(tempFileName),
  } satisfies IErdiaDocument;
}
