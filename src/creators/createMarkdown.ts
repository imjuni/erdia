import { getDirname } from 'my-node-fp';
import path from 'path';
import type IBuildCommandOption from 'src/configs/interfaces/IBuildCommandOption';
import applyPrettier from 'src/creators/applyPretter';
import type getRenderData from 'src/creators/getRenderData';
import type IErdiaDocument from 'src/creators/interfaces/IErdiaDocument';
import { CE_TEMPLATE_NAME } from 'src/template/cosnt-enum/CE_TEMPLATE_NAME';
import evaluateTemplate from 'src/template/evaluateTemplate';
import type { AsyncReturnType } from 'type-fest';

export default async function createMarkdown(
  option: IBuildCommandOption,
  renderData: AsyncReturnType<typeof getRenderData>,
): Promise<IErdiaDocument> {
  const rawMarkdown = await evaluateTemplate(CE_TEMPLATE_NAME.MARKDOWN_DOCUMENT, renderData);
  const prettiedMarkdown = await applyPrettier(rawMarkdown, 'md', option.prettierConfig);
  const markdownFileName = `${renderData.metadata.name}.md`;
  const outputDir = await getDirname(option.output ?? process.cwd());

  return {
    filename: path.resolve(path.join(outputDir, markdownFileName)),
    dirname: path.resolve(outputDir),
    content: prettiedMarkdown,
  } satisfies IErdiaDocument;
}
