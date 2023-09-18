import { getDirname } from 'my-node-fp';
import { randomUUID } from 'node:crypto';
import path from 'path';
import type IBuildCommandOption from 'src/configs/interfaces/IBuildCommandOption';
import applyPrettier from 'src/creators/applyPretter';
import type getRenderData from 'src/creators/getRenderData';
import type IErdiaDocument from 'src/creators/interfaces/IErdiaDocument';
import { CE_TEMPLATE_NAME } from 'src/template/cosnt-enum/CE_TEMPLATE_NAME';
import evaluateTemplate from 'src/template/evaluateTemplate';
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
