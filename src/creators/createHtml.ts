import consola from 'consola';
import path from 'path';
import { CE_DEFAULT_VALUE } from 'src/configs/const-enum/CE_DEFAULT_VALUE';
import { CE_OUTPUT_COMPONENT } from 'src/configs/const-enum/CE_OUTPUT_COMPONENT';
import type IBuildCommandOption from 'src/configs/interfaces/IBuildCommandOption';
import getCwd from 'src/configs/modules/getCwd';
import applyPrettier from 'src/creators/applyPretter';
import type getRenderData from 'src/creators/getRenderData';
import type IErdiaDocument from 'src/creators/interfaces/IErdiaDocument';
import { CE_TEMPLATE_NAME } from 'src/template/cosnt-enum/CE_TEMPLATE_NAME';
import evaluateTemplate from 'src/template/evaluateTemplate';
import getOutputDirectory from 'src/tools/files/getOutputDirectory';
import type { AsyncReturnType } from 'type-fest';

async function getTables(
  option: IBuildCommandOption,
  renderData: AsyncReturnType<typeof getRenderData>,
  outputDir: string,
): Promise<IErdiaDocument[]> {
  if (!option.components.includes(CE_OUTPUT_COMPONENT.TABLE)) {
    return [];
  }

  const rawTables = await evaluateTemplate(CE_TEMPLATE_NAME.HTML_DOCUMENT, renderData);
  const prettiedTables = await applyPrettier(rawTables, 'html', option.prettierConfig);
  const tablesFileName = path.join(outputDir, CE_DEFAULT_VALUE.HTML_INDEX_FILENAME);
  return [
    {
      dirname: path.resolve(outputDir),
      filename: path.resolve(tablesFileName),
      content: prettiedTables,
    },
  ];
}

async function getDiagram(
  option: IBuildCommandOption,
  renderData: AsyncReturnType<typeof getRenderData>,
  outputDir: string,
): Promise<IErdiaDocument[]> {
  if (!option.components.includes(CE_OUTPUT_COMPONENT.ER)) {
    return [];
  }

  const rawDiagram = await evaluateTemplate(CE_TEMPLATE_NAME.HTML_MERMAID, renderData);
  const prettiedDiagram = await applyPrettier(rawDiagram, 'html', option.prettierConfig);
  const diagramFileName = option.components.includes(CE_OUTPUT_COMPONENT.TABLE)
    ? path.join(outputDir, CE_DEFAULT_VALUE.HTML_MERMAID_FILENAME)
    : path.join(outputDir, CE_DEFAULT_VALUE.HTML_INDEX_FILENAME);

  return [
    {
      dirname: path.resolve(outputDir),
      filename: path.resolve(diagramFileName),
      content: prettiedDiagram,
    },
  ];
}

export default async function createHtml(
  option: IBuildCommandOption,
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
