import { CE_ENTITY_VERSION_FROM } from '#configs/const-enum/CE_ENTITY_VERSION_FROM';
import { CE_MERMAID_THEME } from '#configs/const-enum/CE_MERMAID_THEME';
import { CE_OUTPUT_COMPONENT } from '#configs/const-enum/CE_OUTPUT_COMPONENT';
import { CE_OUTPUT_FORMAT } from '#configs/const-enum/CE_OUTPUT_FORMAT';
import { CE_PROJECT_NAME_FROM } from '#configs/const-enum/CE_PROJECT_NAME_FROM';
import type { Argv } from 'yargs';

export default function documentOptionBuilder<T>(args: Argv<T>) {
  // option
  args
    .option('components', {
      alias: 't',
      describe: 'define the output component to builded documents',
      choices: [CE_OUTPUT_COMPONENT.TABLE, CE_OUTPUT_COMPONENT.ER],
      type: 'array',
      default: [CE_OUTPUT_COMPONENT.TABLE, CE_OUTPUT_COMPONENT.ER],
    })
    .option('project-name', {
      describe: 'define whether project name will come from the `package.json` name field or database name',
      type: 'string',
      choices: [CE_PROJECT_NAME_FROM.APPLICATION, CE_PROJECT_NAME_FROM.DATABASE],
      default: CE_PROJECT_NAME_FROM.APPLICATION,
    })
    .option('database-path', {
      describe: 'define the directory to store `erdiadb.json`',
      type: 'string',
      default: undefined,
    })
    .option('template-path', {
      describe: 'define the directory to ETA templates',
      type: 'string',
    })
    .option('skip-image-in-html', {
      describe: 'enabling the this option will skip attaching the ER diagram image file to the html document',
      type: 'boolean',
      default: false,
    })
    .option('format', {
      describe: 'define the output format to builded documents',
      choices: [CE_OUTPUT_FORMAT.HTML, CE_OUTPUT_FORMAT.MARKDOWN, CE_OUTPUT_FORMAT.PDF, CE_OUTPUT_FORMAT.IMAGE],
      type: 'string',
      default: CE_OUTPUT_FORMAT.HTML,
    })
    .option('version-from', {
      describe:
        'define whether document version will come from the `package.json` version field or specific file, timestamp',
      choices: [CE_ENTITY_VERSION_FROM.PACKAGE_JSON, CE_ENTITY_VERSION_FROM.FILE, CE_ENTITY_VERSION_FROM.TIMESTAMP],
      type: 'string',
      default: CE_ENTITY_VERSION_FROM.PACKAGE_JSON,
    })
    .option('version-path', {
      describe: 'If the versionFrom option set `file`, read the file from this path',
      type: 'string',
      default: undefined,
    })
    .option('theme', {
      describe: 'define the mermaid.js plugin theme. see https://mermaid-js.github.io/mermaid/#/Setup?id=theme',
      choices: [
        CE_MERMAID_THEME.DEFAULT,
        CE_MERMAID_THEME.DARK,
        CE_MERMAID_THEME.FOREST,
        CE_MERMAID_THEME.DARK,
        CE_MERMAID_THEME.NEUTRAL,
        CE_MERMAID_THEME.NULL,
      ],
      default: CE_MERMAID_THEME.DARK,
      type: 'string',
    });

  return args;
}
