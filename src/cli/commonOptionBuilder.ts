import IErdiaCommonOption from '@config/interface/IErdiaCommonOption';

import { Argv } from 'yargs';

export default function commonOptionBuilder(args: Argv<IErdiaCommonOption>) {
  // option
  args
    .option('config', {
      alias: 'c',
      describe: 'file path of configuration',
      type: 'string',
    })
    .option('output', {
      alias: 'o',
      describe: 'output file name',
      type: 'array',
    })
    .option('indent', {
      describe: 'indent size of mermaid.js code',
      type: 'number',
      default: 2,
    })

    .option('er-columns', {
      describe: 'output column',
      choices: ['attribute-key', 'comment'],
      default: ['attribute-key', 'comment'],
      type: 'array',
    })
    .option('verbose', {
      alias: 'v',
      describe: 'verbose message',
      type: 'boolean',
    })
    .option('theme', {
      describe: 'mermaid theme',
      choices: ['default', 'forest', 'dark', 'neutral', 'null'],
      default: 'neutral',
      type: 'string',
    })
    .option('data-source-path', {
      alias: 'd',
      describe: 'dataSource file path',
      type: 'string',
    });

  return args;
}
