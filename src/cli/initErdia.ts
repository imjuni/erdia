import orderedComponents from '@common/orderedComponents';
import htmlDefaultConfig from '@config/htmlDefaultConfig';
import imageDefaultConfig from '@config/imageDefaultConfig';
import IErdiaImageOption from '@config/interface/IErdiaImageOption';
import { IInitDocAnswer, IInitImageAnswer } from '@config/interface/InquirerAnswer';
import TOutputComponent from '@config/interface/TOutputComponent';
import markdownDefaultConfig from '@config/markdownDefaultConfig';
import pdfDefaultConfig from '@config/pdfDefaultConfig';
import logger from '@tool/logger';
import fs from 'fs';
import Fuse from 'fuse.js';
import globby from 'globby';
import inquirer from 'inquirer';
import inquirerPrompt from 'inquirer-autocomplete-prompt';
import { bignumber } from 'mathjs';

const log = logger();

function getOutputFilename(components: TOutputComponent[], extname: string) {
  if (components.includes('er') && components.includes('table')) {
    return components.map((component) => (component === 'er' ? `"erdiagram.${extname}"` : `"entity.${extname}"`));
  }

  if (components.includes('er')) {
    return [`"erdiagram.${extname}"`];
  }

  if (components.includes('table')) {
    return [`"erdiagram.${extname}"`];
  }

  throw new Error('invalid components name!');
}

export default async function initErdia() {
  /**
   * html     - er, table
   *          - er
   *          - table
   * markdown - er, table
   *          - er
   *          - table
   * pdf      - er, table
   *          - er
   *          - table
   * image    - svg
   *          - png
   */

  const sourceFiles = await globby(['**/*.js', '**/*.cjs', '**/*.mjs', '**/*.ts', '**/*.cts', '**/*.mts'], {
    cwd: process.cwd(),
    onlyFiles: true,
    gitignore: true,
    dot: true,
  });

  const fuse = new Fuse(sourceFiles, { includeScore: true });

  const docAnswer: IInitDocAnswer = {
    type: 'document',
    documentType: 'html',
    components: [],
  };

  const imageAnswer: IInitImageAnswer = {
    type: 'image',
    documentType: 'image',
    imageFormat: 'svg',
  };

  const fuzzyScoreLimit = 50;
  inquirer.registerPrompt('autocomplete', inquirerPrompt);

  const dataSourceFileAnswer = await inquirer.prompt([
    {
      type: 'autocomplete',
      name: 'dataSourceFile',
      message: 'Select a dataSource file: ',
      source: (_answersSoFar: any, input: string | undefined) => {
        const safeInput = input === undefined || input === null ? '' : input;

        return fuse
          .search(safeInput)
          .map((matched) => {
            return {
              ...matched,
              oneBased: bignumber(1)
                .sub(bignumber(matched.score ?? 0))
                .mul(100)
                .floor()
                .div(100)
                .toNumber(),
              percent: bignumber(1)
                .sub(bignumber(matched.score ?? 0))
                .mul(10000)
                .floor()
                .div(100)
                .toNumber(),
            };
          })
          .filter((matched) => matched.percent > fuzzyScoreLimit)
          .sort((l, r) => r.percent - l.percent)
          .map((matched) => matched.item);
      },
    },
  ]);

  const docTypeAnswer = await inquirer.prompt<{
    documentType: IInitDocAnswer['documentType'] | IInitImageAnswer['documentType'];
  }>([
    {
      type: 'list',
      name: 'documentType',
      message: 'Select output type: ',
      choices: [
        { name: 'html', value: 'html' },
        { name: 'markdown', value: 'md' },
        { name: 'pdf', value: 'pdf' },
        { name: 'image', value: 'image' },
      ],
    },
  ]);

  log.debug(`first answer: ${docTypeAnswer.documentType}`);

  if (docTypeAnswer.documentType === 'image') {
    const imageFormatAnswer = await inquirer.prompt<{ imageFormat: IErdiaImageOption['imageFormat'] }>([
      {
        type: 'list',
        name: 'imageFormat',
        message: 'Select image format: ',
        choices: [
          { name: 'svg', checked: true },
          { name: 'png', checked: false },
        ],
      },
    ]);

    imageAnswer.imageFormat = imageFormatAnswer.imageFormat;

    log.debug(`test: ${imageAnswer}`);

    const jsoncConfigContent = imageDefaultConfig({
      output: `"erdiagram.${imageFormatAnswer.imageFormat}"`,
      dataSourceFilePath: dataSourceFileAnswer.dataSourceFile,
      imageFormat: imageFormatAnswer.imageFormat,
    });

    await fs.promises.writeFile('.erdiarc', jsoncConfigContent);

    return true;
  }

  docAnswer.documentType = docTypeAnswer.documentType;

  const componentCheckboxAnswer = await inquirer.prompt<{ components: TOutputComponent[] }>([
    {
      type: 'checkbox',
      name: 'components',
      message: 'Check component in document: ',
      choices: [
        ...orderedComponents.map((component) =>
          component === 'er'
            ? { name: 'ER diagram', value: 'er', checked: true }
            : { name: 'Entity schema table', value: 'table', checked: true },
        ),
      ],
    },
  ]);

  docAnswer.components.push(...componentCheckboxAnswer.components);

  const configTemplate = (() => {
    if (docAnswer.documentType === 'html') {
      return htmlDefaultConfig;
    }

    if (docAnswer.documentType === 'md') {
      return markdownDefaultConfig;
    }

    if (docAnswer.documentType === 'pdf') {
      return pdfDefaultConfig;
    }

    throw new Error('invalid document type');
  })();

  const jsoncConfigContent = configTemplate({
    output: getOutputFilename(componentCheckboxAnswer.components, docAnswer.documentType).join(', '),
    dataSourceFilePath: dataSourceFileAnswer.dataSourceFile,
    components: componentCheckboxAnswer.components.map((component) => `"${component}"`).join(', '),
  });

  await fs.promises.writeFile('.erdiarc', jsoncConfigContent);

  return true;
}
