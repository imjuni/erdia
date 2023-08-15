import { CE_DEFAULT_VALUE } from '#configs/const-enum/CE_DEFAULT_VALUE';
import { CE_OUTPUT_COMPONENT } from '#configs/const-enum/CE_OUTPUT_COMPONENT';
import type { IInitDocAnswer } from '#configs/interfaces/InquirerAnswer';
import { CE_TEMPLATE_NAME } from '#template/cosnt-enum/CE_TEMPLATE_NAME';
import evaluateTemplate from '#template/evaluateTemplate';
import Fuse from 'fuse.js';
import globby from 'globby';
import inquirer from 'inquirer';
import inquirerPrompt from 'inquirer-autocomplete-prompt';
import getAutoCompleteSource from './getAutoCompleteSource';

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

  const directories = await globby(['**'], {
    cwd: process.cwd(),
    onlyDirectories: true,
    dot: true,
  });

  const sourceFilesFuse = new Fuse(sourceFiles, { includeScore: true });
  const directoryFuse = new Fuse(directories, { includeScore: true });

  inquirer.registerPrompt('autocomplete', inquirerPrompt);

  const answer = await inquirer.prompt<IInitDocAnswer>([
    {
      type: 'autocomplete',
      name: 'dataSourceFile',
      message: 'Select a dataSource file: ',
      source: getAutoCompleteSource(sourceFilesFuse, CE_DEFAULT_VALUE.DATA_SOURCE_FILE_FUZZY_SCORE_LIMIT),
    },
    {
      type: 'autocomplete',
      name: 'output',
      message: 'Select directory for output files: ',
      source: getAutoCompleteSource(directoryFuse, CE_DEFAULT_VALUE.OUTPUT_DIRECTORY_FUZZY_SCORE_LIMIT),
    },
    {
      type: 'list',
      name: 'projectName',
      message: 'Select output type: ',
      choices: [
        { name: 'database: document name came from database name', value: 'db' },
        { name: 'application: document name came from name in package.json', value: 'app' },
      ],
    },
    {
      type: 'list',
      name: 'format',
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
        { name: 'base', value: 'base' },
      ],
    },
    {
      type: 'checkbox',
      name: 'components',
      message: 'Check component in document: ',
      choices: [
        ...[CE_OUTPUT_COMPONENT.TABLE, CE_OUTPUT_COMPONENT.ER].map((component) =>
          component === CE_OUTPUT_COMPONENT.ER
            ? { name: 'ER diagram', value: 'er', checked: true }
            : { name: 'Entity specification table', value: 'table', checked: true },
        ),
      ],
      when: (answerForWhen: IInitDocAnswer) => {
        return answerForWhen.format !== 'image';
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
      when: (answerForWhen: IInitDocAnswer) => {
        return answerForWhen.format === 'image';
      },
    },
  ]);

  const file = await evaluateTemplate(CE_TEMPLATE_NAME.CONFIG_JSON, {
    config: { ...answer, config: CE_DEFAULT_VALUE.CONFIG_FILE_NAME },
  });
  return file;
}
