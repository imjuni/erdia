import type { IBuildCommandOption } from '#/configs/interfaces/IBuildCommandOption';
import { applyPrettier } from '#/creators/applyPretter';
import type { getRenderData } from '#/creators/getRenderData';
import type { IErdiaDocument } from '#/creators/interfaces/IErdiaDocument';
import { container } from '#/modules/containers/container';
import { SymbolTemplateRenderer } from '#/modules/containers/keys/SymbolTemplateRenderer';
import type { TemplateRenderer } from '#/templates/TemplateRenderer';
import { CE_TEMPLATE_NAME } from '#/templates/cosnt-enum/CE_TEMPLATE_NAME';
import { getDirname } from 'my-node-fp';
import pathe from 'pathe';
import type { AsyncReturnType } from 'type-fest';

export async function createMarkdown(
  option: Pick<IBuildCommandOption, 'output' | 'prettierConfig'>,
  renderData: AsyncReturnType<typeof getRenderData>,
): Promise<IErdiaDocument> {
  const renderer = container.resolve<TemplateRenderer>(SymbolTemplateRenderer);
  const rawMarkdown = await renderer.evaluate(CE_TEMPLATE_NAME.MARKDOWN_DOCUMENT, renderData);
  const prettiedMarkdown = await applyPrettier(rawMarkdown, 'md', option.prettierConfig);
  const markdownFileName = `${renderData.metadata.name}.md`;
  const outputDir = await getDirname(option.output ?? process.cwd());

  return {
    filename: pathe.resolve(pathe.join(outputDir, markdownFileName)),
    dirname: pathe.resolve(outputDir),
    content: prettiedMarkdown,
  } satisfies IErdiaDocument;
}
