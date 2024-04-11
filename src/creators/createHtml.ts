import { CE_DEFAULT_VALUE } from '#/configs/const-enum/CE_DEFAULT_VALUE';
import { CE_OUTPUT_COMPONENT } from '#/configs/const-enum/CE_OUTPUT_COMPONENT';
import type { IBuildCommandOption } from '#/configs/interfaces/IBuildCommandOption';
import { getCwd } from '#/configs/modules/getCwd';
import { applyPrettier } from '#/creators/applyPretter';
import type { getRenderData } from '#/creators/getRenderData';
import type { IErdiaDocument } from '#/creators/interfaces/IErdiaDocument';
import { container } from '#/modules/containers/container';
import { SymbolTemplateRenderer } from '#/modules/containers/keys/SymbolTemplateRenderer';
import { getOutputDirectory } from '#/modules/files/getOutputDirectory';
import type { TemplateRenderer } from '#/templates/TemplateRenderer';
import { CE_TEMPLATE_NAME } from '#/templates/cosnt-enum/CE_TEMPLATE_NAME';
import consola from 'consola';
import pathe from 'pathe';
import type { AsyncReturnType } from 'type-fest';

async function getTables(
  option: Pick<IBuildCommandOption, 'output' | 'components' | 'prettierConfig'>,
  renderData: AsyncReturnType<typeof getRenderData>,
  outputDir: string,
): Promise<IErdiaDocument[]> {
  if (!option.components.includes(CE_OUTPUT_COMPONENT.TABLE)) {
    return [];
  }

  const renderer = container.resolve<TemplateRenderer>(SymbolTemplateRenderer);
  const rawTables = await renderer.evaluate(CE_TEMPLATE_NAME.HTML_DOCUMENT, renderData);
  const prettiedTables = await applyPrettier(rawTables, 'html', option.prettierConfig);
  const tablesFileName = pathe.join(outputDir, CE_DEFAULT_VALUE.HTML_INDEX_FILENAME);
  return [
    {
      dirname: pathe.resolve(outputDir),
      filename: pathe.resolve(tablesFileName),
      content: prettiedTables,
    },
  ];
}

async function getDiagram(
  option: Pick<IBuildCommandOption, 'output' | 'components' | 'prettierConfig'>,
  renderData: AsyncReturnType<typeof getRenderData>,
  outputDir: string,
): Promise<IErdiaDocument[]> {
  if (!option.components.includes(CE_OUTPUT_COMPONENT.ER)) {
    return [];
  }

  const renderer = container.resolve<TemplateRenderer>(SymbolTemplateRenderer);
  const rawDiagram = await renderer.evaluate(CE_TEMPLATE_NAME.HTML_MERMAID, renderData);
  const prettiedDiagram = await applyPrettier(rawDiagram, 'html', option.prettierConfig);
  const diagramFileName = option.components.includes(CE_OUTPUT_COMPONENT.TABLE)
    ? pathe.join(outputDir, CE_DEFAULT_VALUE.HTML_MERMAID_FILENAME)
    : pathe.join(outputDir, CE_DEFAULT_VALUE.HTML_INDEX_FILENAME);

  return [
    {
      dirname: pathe.resolve(outputDir),
      filename: pathe.resolve(diagramFileName),
      content: prettiedDiagram,
    },
  ];
}

export async function createHtml(
  option: Pick<IBuildCommandOption, 'output' | 'components' | 'prettierConfig'>,
  renderData: AsyncReturnType<typeof getRenderData>,
) {
  const outputDir = await getOutputDirectory(option, getCwd(process.env));

  consola.info(`export component: ${option.components.join(', ')}`);

  const documents = (
    await Promise.all(
      option.components.map(async (component) => {
        if (component === CE_OUTPUT_COMPONENT.TABLE) {
          return getTables(option, renderData, outputDir);
        }

        if (component === CE_OUTPUT_COMPONENT.ER) {
          return getDiagram(option, renderData, outputDir);
        }

        return [];
      }),
    )
  ).flat();

  return documents;
}
