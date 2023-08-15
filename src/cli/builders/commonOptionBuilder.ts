import type { Argv } from 'yargs';

export default function commonOptionBuilder<T>(args: Argv<T>) {
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
      type: 'string',
    })
    .option('data-source-path', {
      alias: 'd',
      describe: 'dataSource file path',
      type: 'string',
    })
    .demandOption('data-source-path');

  return args;
}
