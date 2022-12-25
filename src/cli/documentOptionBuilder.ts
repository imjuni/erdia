import orderedComponents from '@common/orderedComponents';
import IErdiaDocumentOption from '@config/interface/IErdiaDocumentOption';
import { TTABLE_COLUMN } from '@config/interface/TTABLE_COLUMN';
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
      choices: [
        TTABLE_COLUMN.ATTRIBUTE_KEY,
        TTABLE_COLUMN.ENTITY_NAME,
        TTABLE_COLUMN.CHARSET,
        TTABLE_COLUMN.COMMENT,
        TTABLE_COLUMN.IS_NULLABLE,
      ],
      default: [
        TTABLE_COLUMN.ATTRIBUTE_KEY,
        TTABLE_COLUMN.ENTITY_NAME,
        TTABLE_COLUMN.CHARSET,
        TTABLE_COLUMN.COMMENT,
        TTABLE_COLUMN.IS_NULLABLE,
      ],
      type: 'array',
    });

  return args;
}
