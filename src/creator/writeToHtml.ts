import IErdiaHtmlOption from '@config/interface/IErdiaHtmlOption';
import TOutputComponent from '@config/interface/TOutputComponent';
import applyPrettier from '@creator/applyPretter';
import htmlMermaidTemplate from '@template/htmlMermaidTemplate';
import htmlTemplate from '@template/htmlTemplate';
import logger from '@tool/logger';
import fs from 'fs';
import { isEmpty, isNotEmpty } from 'my-easy-fp';

const log = logger();

export default async function writeToHtml(
  option: Omit<IErdiaHtmlOption, 'output'> & { output: Required<IErdiaHtmlOption>['output'] },
  diagram: string,
  table: string,
) {
  // export every component to single file
  if (option.output.length === 1 && option.components.includes('er') && option.components.includes('table')) {
    const filename = option.output.at(0);
    const document = await applyPrettier(htmlTemplate(table, htmlMermaidTemplate(diagram, true, option)), 'html');

    if (isEmpty(filename)) {
      throw new Error(`invalid output filename: ${filename}`);
    }

    log.info(`Component ${option.components.join(', ')} will be write on ${filename}`);
    await fs.promises.writeFile(filename, document);

    return true;
  }

  log.debug(`component/file: ${option.components.join(', ')} - ${option.output.join(', ')}`);

  // export every component to each file
  const [diagramDocument, tableDocument] = await Promise.all([
    applyPrettier(htmlTemplate('', htmlMermaidTemplate(diagram, true, option)), 'html'),
    applyPrettier(htmlTemplate(table, ''), 'html'),
  ]);

  const nullableFileInfos = option.components.map((component, index) => ({
    component,
    filename: option.output.at(index),
  }));

  // need overwrtie check
  const fileInfos = nullableFileInfos.filter(
    (filename): filename is { component: TOutputComponent; filename: string } => isNotEmpty(filename.filename),
  );

  await Promise.all(
    fileInfos.map(async (fileInfo) => {
      log.info(`Component ${fileInfo.component} will be write on ${fileInfo.filename}`);
      await fs.promises.writeFile(fileInfo.filename, fileInfo.component === 'er' ? diagramDocument : tableDocument);
    }),
  );

  return true;
}
