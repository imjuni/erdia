import IErdiaDocumentOption from '@config/interface/IErdiaDocumentOption';

import { Argv } from 'yargs';

export default function documentOptionBuilder(args: Argv<IErdiaDocumentOption>) {
  // option
  args
    .option('components', {
      alias: 't',
      describe: 'output components of result type',
      choices: ['table', 'er'],
      type: 'string',
      default: ['table', 'er'],
    })
    .option('table-columns', {
      describe: 'output column',
      choices: ['attribute-key', 'entity-name', 'comment'],
      default: ['attribute-key', 'entity-name', 'comment'],
      type: 'array',
    });

  return args;
}
