import type { Argv } from 'yargs';

export default function outputOptionBuilder<T>(args: Argv<T>) {
  // option
  args.option('output', {
    alias: 'o',
    describe: 'define the directory to output file',
    type: 'string',
  });

  return args;
}
