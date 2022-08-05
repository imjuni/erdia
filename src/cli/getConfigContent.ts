import orderedComponents from '@common/orderedComponents';
import htmlDefaultConfig from '@config/htmlDefaultConfig';
import imageDefaultConfig from '@config/imageDefaultConfig';
import { IInitDocAnswer, IInitImageAnswer } from '@config/interface/InquirerAnswer';
import TOutputComponent from '@config/interface/TOutputComponent';
import markdownDefaultConfig from '@config/markdownDefaultConfig';
import pdfDefaultConfig from '@config/pdfDefaultConfig';
import logger from '@tool/logger';
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

export default async function getConfigContent() {
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

  const answer = await inquirer.prompt<IInitDocAnswer | IInitImageAnswer>([
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
    {
      type: 'list',
      name: 'theme',
      message: 'Select mermaid theme: ',
      choices: [
        { name: 'default', value: 'default' },
        { name: 'forest', value: 'forest' },
        { name: 'dark', value: 'dark' },
        { name: 'neutral', value: 'neutral' },
      ],
    },
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
      when: (answerForWhen: IInitDocAnswer | IInitImageAnswer) => {
        return answerForWhen.documentType !== 'image';
      },
    },
    {
      type: 'list',
      name: 'imageFormat',
      message: 'Select image format: ',
      choices: [
        { name: 'svg', checked: true },
        { name: 'png', checked: false },
      ],
      when: (answerForWhen: IInitDocAnswer | IInitImageAnswer) => {
        return answerForWhen.documentType === 'image';
      },
    },
  ]);

  log.trace(`answer: ${answer.documentType}`);

  if (answer.documentType === 'image') {
    const jsoncConfigContent = imageDefaultConfig({
      output: `"erdiagram.${answer.imageFormat}"`,
      dataSourceFilePath: dataSourceFileAnswer.dataSourceFile,
      imageFormat: answer.imageFormat,
      theme: answer.theme,
    });

    return jsoncConfigContent;
  }

  const configTemplate = (() => {
    if (answer.documentType === 'html') {
      return htmlDefaultConfig;
    }

    if (answer.documentType === 'md') {
      return markdownDefaultConfig;
    }

    if (answer.documentType === 'pdf') {
      return pdfDefaultConfig;
    }

    throw new Error('invalid document type');
  })();

  const jsoncConfigContent = configTemplate({
    output: getOutputFilename(answer.components, answer.documentType).join(', '),
    dataSourceFilePath: dataSourceFileAnswer.dataSourceFile,
    components: answer.components.map((component) => `"${component}"`).join(', '),
    theme: answer.theme,
  });

  return jsoncConfigContent;
}
