import type { IBuildCommandOption } from '#/configs/interfaces/IBuildCommandOption';
import { applyPrettier } from '#/creators/applyPretter';
import type { getRenderData } from '#/creators/getRenderData';
import type { IErdiaDocument } from '#/creators/interfaces/IErdiaDocument';
import { container } from '#/modules/containers/container';
import { SymbolTemplateRenderer } from '#/modules/containers/keys/SymbolTemplateRenderer';
import { betterMkdir } from '#/modules/files/betterMkdir';
import type { TemplateRenderer } from '#/templates/TemplateRenderer';
import { CE_TEMPLATE_NAME } from '#/templates/cosnt-enum/CE_TEMPLATE_NAME';
import { getDirname } from 'my-node-fp';
import { randomUUID } from 'node:crypto';
import pathe from 'pathe';
import type { AsyncReturnType } from 'type-fest';

export async function createImageHtml(
  option: IBuildCommandOption,
  renderData: AsyncReturnType<typeof getRenderData>,
): Promise<IErdiaDocument> {
  const renderer = container.resolve<TemplateRenderer>(SymbolTemplateRenderer);
  const rawHtml = await renderer.evaluate(CE_TEMPLATE_NAME.IMAGE_DOCUMENT, {
    ...renderData,
    option: { ...renderData.option, width: '200vw' },
  });

  const prettiedHtml = await applyPrettier(rawHtml, 'html', option.prettierConfig);
  const outputDirPath = option.output != null ? pathe.resolve(option.output) : process.cwd();
  await betterMkdir(outputDirPath);
  const tempFileName = pathe.join(outputDirPath, `${randomUUID()}.html`);

  return {
    dirname: await getDirname(outputDirPath),
    content: prettiedHtml,
    filename: pathe.resolve(tempFileName),
  } satisfies IErdiaDocument;
}
