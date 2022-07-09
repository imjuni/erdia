import IErdiaMarkdownOption from '@config/interface/IErdiaMarkdownOption';

import { Argv } from 'yargs';

export default function markdownOptionBuilder(args: Argv<IErdiaMarkdownOption>) {
  // option
  args
    .option('html-br', {
      describe: 'replace newline character "\n" to <br /> tag',
      type: 'string',
    })
    .demandOption(['data-source-path']);

  return args;
}
