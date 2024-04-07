import { templateEjectCommandHandler } from '#/cli/commands/templateEjectCommandHandler';
import { CE_DEFAULT_VALUE } from '#/configs/const-enum/CE_DEFAULT_VALUE';
import { CE_ENTITY_VERSION_FROM } from '#/configs/const-enum/CE_ENTITY_VERSION_FROM';
import { CE_IMAGE_FORMAT } from '#/configs/const-enum/CE_IMAGE_FORMAT';
import { CE_MERMAID_THEME } from '#/configs/const-enum/CE_MERMAID_THEME';
import { CE_OUTPUT_COMPONENT } from '#/configs/const-enum/CE_OUTPUT_COMPONENT';
import { CE_OUTPUT_FORMAT } from '#/configs/const-enum/CE_OUTPUT_FORMAT';
import type { IInitDocAnswer } from '#/configs/interfaces/InquirerAnswer';
import { getAutoCompleteSource } from '#/configs/modules/getAutoCompleteSource';
import { getCwd } from '#/configs/modules/getCwd';
import { container } from '#/modules/containers/container';
import { SymbolTemplateRenderer } from '#/modules/containers/keys/SymbolTemplateRenderer';
import { getGlobFiles } from '#/modules/files/getGlobFiles';
import { defaultExclude } from '#/modules/scopes/defaultExclude';
import type { TemplateRenderer } from '#/templates/TemplateRenderer';
import { CE_TEMPLATE_NAME } from '#/templates/cosnt-enum/CE_TEMPLATE_NAME';
import Fuse from 'fuse.js';
import { Glob } from 'glob';
import inquirer from 'inquirer';
import inquirerPrompt from 'inquirer-autocomplete-prompt';
import pathe from 'pathe';

export async function getConfigContent() {
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

  const sourceGlobFiles = new Glob(['**/*.js', '**/*.cjs', '**/*.mjs', '**/*.ts', '**/*.cts', '**/*.mts'], {
    absolute: true,
    ignore: defaultExclude,
    cwd: process.cwd(),
    onlyFiles: true,
  });
  const sourceFiles = getGlobFiles(sourceGlobFiles);

  const everyGlobFiles = new Glob(['**/*'], {
    absolute: true,
    ignore: defaultExclude,
    cwd: process.cwd(),
    dot: true,
    onlyFiles: true,
  });
  const everyFiles = getGlobFiles(everyGlobFiles);

  const directoryGlobDirPaths = new Glob(['**/*'], {
    absolute: true,
    ignore: defaultExclude,
    cwd: process.cwd(),
    dot: true,
    onlyDirectories: true,
  });
  const directories = getGlobFiles(directoryGlobDirPaths);

  const sourceFilesFuse = new Fuse(sourceFiles, { includeScore: true });
  const everyFilesFuse = new Fuse(everyFiles, { includeScore: true });
  const directoriesFuse = new Fuse(directories, { includeScore: true });

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
      source: getAutoCompleteSource(directoriesFuse, CE_DEFAULT_VALUE.OUTPUT_DIRECTORY_FUZZY_SCORE_LIMIT),
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
      name: 'isEjectTemplate',
      message: 'Want to eject template? ',
      choices: [
        { name: 'use custom template: eject template', value: true },
        { name: 'use default template: not eject template', value: false },
      ],
    },
    {
      type: 'list',
      name: 'format',
      message: 'Select output type: ',
      default: CE_OUTPUT_FORMAT.HTML,
      choices: [
        { name: 'html', value: CE_OUTPUT_FORMAT.HTML },
        { name: 'markdown', value: CE_OUTPUT_FORMAT.MARKDOWN },
        { name: 'pdf', value: CE_OUTPUT_FORMAT.PDF },
        { name: 'image', value: CE_OUTPUT_FORMAT.IMAGE },
      ],
    },
    {
      type: 'list',
      name: 'isSelectDatabasePath',
      message: 'Want to select the entity database file path?',
      default: false,
      choices: [
        { name: 'yes', value: true },
        { name: 'no', value: false },
      ],
    },
    {
      type: 'autocomplete',
      name: 'databasePath',
      message: 'Select the entity database file path: ',
      source: getAutoCompleteSource(directoriesFuse, CE_DEFAULT_VALUE.OUTPUT_DIRECTORY_FUZZY_SCORE_LIMIT),
      when: (answerForWhen: IInitDocAnswer) => {
        return answerForWhen.isSelectDatabasePath;
      },
    },
    {
      type: 'list',
      name: 'isEnterRouteBasePath',
      message: 'Want to enter route base path for html document? ',
      default: false,
      choices: [
        { name: 'enter rotue base path', value: true },
        { name: 'skip', value: false },
      ],
      when: (answerForWhen: IInitDocAnswer) => {
        return answerForWhen.format === CE_OUTPUT_FORMAT.HTML;
      },
    },
    {
      type: 'input',
      name: 'routeBasePath',
      message: 'Enter your route base path: ',
      when: (answerForWhen: IInitDocAnswer) => {
        return answerForWhen.format === CE_OUTPUT_FORMAT.HTML && answerForWhen.isEnterRouteBasePath;
      },
    },
    {
      type: 'list',
      name: 'versionFrom',
      message: 'Select version extract style: ',
      choices: [
        { name: 'extract from package.json', value: CE_ENTITY_VERSION_FROM.PACKAGE_JSON },
        { name: 'extract from file(need version file selection)', value: CE_ENTITY_VERSION_FROM.FILE },
        { name: 'use timestamp(all stored different version)', value: CE_ENTITY_VERSION_FROM.TIMESTAMP },
      ],
      when: (answerForWhen: IInitDocAnswer) => {
        return answerForWhen.format !== CE_OUTPUT_FORMAT.IMAGE;
      },
    },
    {
      type: 'autocomplete',
      name: 'versionPath',
      message: 'Select the version file path: ',
      source: getAutoCompleteSource(everyFilesFuse, CE_DEFAULT_VALUE.OUTPUT_DIRECTORY_FUZZY_SCORE_LIMIT),
      when: (answerForWhen: IInitDocAnswer) => {
        return answerForWhen.versionFrom === CE_ENTITY_VERSION_FROM.FILE;
      },
    },
    {
      type: 'list',
      name: 'theme',
      message: 'Select mermaid theme: ',
      choices: [
        { name: 'default', value: CE_MERMAID_THEME.DEFAULT },
        { name: 'forest', value: CE_MERMAID_THEME.FOREST },
        { name: 'dark', value: CE_MERMAID_THEME.DARK },
        { name: 'neutral', value: CE_MERMAID_THEME.NEUTRAL },
        { name: 'null', value: CE_MERMAID_THEME.NULL },
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
        { name: 'svg', checked: CE_IMAGE_FORMAT.SVG },
        { name: 'png', checked: CE_IMAGE_FORMAT.PNG },
      ],
      when: (answerForWhen: IInitDocAnswer) => {
        return answerForWhen.format === 'image';
      },
    },
  ]);

  const templateDir = await (answer.isEjectTemplate
    ? templateEjectCommandHandler({ output: getCwd(process.env), showLogo: false })
    : Promise.resolve(undefined));
  const renderer = container.resolve<TemplateRenderer>(SymbolTemplateRenderer);
  const file = await renderer.evaluate(CE_TEMPLATE_NAME.CONFIG_JSON, {
    config: {
      ...answer,
      templatePath: templateDir != null ? pathe.relative(getCwd(process.env), templateDir) : templateDir,
      versionFrom: answer.versionFrom != null ? answer.versionFrom : CE_ENTITY_VERSION_FROM.TIMESTAMP,
      config: CE_DEFAULT_VALUE.CONFIG_FILE_NAME,
    },
  });

  return file;
}
