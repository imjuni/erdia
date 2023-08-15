import type { Argv } from 'yargs';

export default function outputOptionBuilder<T>(args: Argv<T>) {
  // option
  args.option('output', {
    alias: 'o',
    describe: 'output file name',
    type: 'string',
  });

  return args;
}
