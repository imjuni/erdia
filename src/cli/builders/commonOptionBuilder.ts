import outputOptionBuilder from '#cli/builders/outputOptionBuilder';
import type { Argv } from 'yargs';

export default function commonOptionBuilder<T>(args: Argv<T>) {
  // option
  outputOptionBuilder(args)
    .option('config', {
      alias: 'c',
      describe: 'define the path to to configuration file: .erdiarc',
      type: 'string',
    })
    .option('data-source-path', {
      alias: 'd',
      describe: 'define the path to TypeORM data source file',
      type: 'string',
    })
    .demandOption('data-source-path');

  return args;
}
