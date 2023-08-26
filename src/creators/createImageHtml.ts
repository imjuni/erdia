import type IBuildCommandOption from '#configs/interfaces/IBuildCommandOption';
import applyPrettier from '#creators/applyPretter';
import type getRenderData from '#creators/getRenderData';
import type IErdiaDocument from '#creators/interfaces/IErdiaDocument';
import { CE_TEMPLATE_NAME } from '#template/cosnt-enum/CE_TEMPLATE_NAME';
import evaluateTemplate from '#template/evaluateTemplate';
import { getDirname } from 'my-node-fp';
import { randomUUID } from 'node:crypto';
import path from 'path';
import type { AsyncReturnType } from 'type-fest';

export default async function createImageHtml(
  option: IBuildCommandOption,
  renderData: AsyncReturnType<typeof getRenderData>,
): Promise<IErdiaDocument> {
  const rawHtml = await evaluateTemplate(CE_TEMPLATE_NAME.IMAGE_DOCUMENT, {
    ...renderData,
    option: { ...renderData.option, width: '200vw' },
  });
  const prettiedHtml = await applyPrettier(rawHtml, 'html', option.prettierConfig);
  const outputDir = await getDirname(option.output ?? process.cwd());
  const tempFileName = path.join(outputDir, `${randomUUID()}.html`);

  return {
    dirname: path.resolve(outputDir),
    content: prettiedHtml,
    filename: path.resolve(tempFileName),
  } satisfies IErdiaDocument;
}
