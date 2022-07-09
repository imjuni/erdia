import IErdiaHtmlOption from '@config/interface/IErdiaHtmlOption';

import { Argv } from 'yargs';

export default function htmlOptionBuilder(args: Argv<IErdiaHtmlOption>) {
  // option
  args
    .option('width', {
      describe: 'ER diagram width, it will be set width css attribute',
      type: 'string',
      default: '100%',
    })
    .demandOption('data-source-path');

  return args;
}
