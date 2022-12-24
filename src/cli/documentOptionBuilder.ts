import orderedComponents from '@common/orderedComponents';
import IErdiaDocumentOption from '@config/interface/IErdiaDocumentOption';
import { Argv } from 'yargs';

export default function documentOptionBuilder(args: Argv<IErdiaDocumentOption>) {
  // option
  args
    .option('components', {
      alias: 't',
      describe: 'output components of result type',
      choices: orderedComponents,
      type: 'string',
      default: orderedComponents,
    })
    .option('table-columns', {
      describe: 'output column',
      choices: ['attribute-key', 'entity-name', 'charset', 'comment'],
      default: ['attribute-key', 'entity-name', 'charset', 'comment'],
      type: 'array',
    });

  return args;
}
