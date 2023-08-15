import { CE_OUTPUT_COMPONENT } from '#configs/const-enum/CE_OUTPUT_COMPONENT';
import { CE_OUTPUT_FORMAT } from '#configs/const-enum/CE_OUTPUT_FORMAT';
import type { Argv } from 'yargs';

export default function documentOptionBuilder<T>(args: Argv<T>) {
  // option
  args
    .option('components', {
      alias: 't',
      describe: 'output components of result type',
      choices: [CE_OUTPUT_COMPONENT.TABLE, CE_OUTPUT_COMPONENT.ER],
      type: 'array',
      default: [CE_OUTPUT_COMPONENT.TABLE, CE_OUTPUT_COMPONENT.ER],
    })
    .option('format', {
      describe: 'output format of generated documents',
      choices: [CE_OUTPUT_FORMAT.HTML, CE_OUTPUT_FORMAT.MARKDOWN, CE_OUTPUT_FORMAT.PDF, CE_OUTPUT_FORMAT.IMAGE],
      type: 'string',
      default: CE_OUTPUT_FORMAT.HTML,
    })
    .option('template-path', {
      describe: 'template file path',
      type: 'string',
    })
    .option('theme', {
      describe: 'mermaid.js plugin theme configuration. see https://mermaid-js.github.io/mermaid/#/Setup?id=theme',
      choices: ['default', 'forest', 'dark', 'neutral', 'null'],
      default: 'neutral',
      type: 'string',
    });

  return args;
}
