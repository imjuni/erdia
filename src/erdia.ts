import erdiagram from '@handler/erdiagram';
import htmlErdiagram from '@handler/htmlErdiagram';
import htmlTable from '@handler/htmlTable';
import mdtable from '@handler/mdtable';
import getContent from '@handler/write';
import connect from '@misc/connect';
import { IErdiaCliOptions } from '@misc/options';
import { CliUx } from '@oclif/core';
import consola, { LogLevel } from 'consola';
import * as TTE from 'fp-ts/TaskEither';
import fs from 'fs';
import { isNotEmpty, TNullablePick, TResolvePromise } from 'my-easy-fp';
import sourceMapSupport from 'source-map-support';
import yargs, { ArgumentsCamelCase } from 'yargs';
import prettier from 'prettier';

sourceMapSupport.install();

export type TErdiaCliOptions = TNullablePick<IErdiaCliOptions, 'html' | 'name'>;
export type TCommand = 'mdtable' | 'er' | 'mdfull' | 'htmler' | 'htmltable' | 'htmlfull';

// only use builder function
const casting = <T>(args: T): any => args;

consola.level = LogLevel.Error;

function setOptions(args: ReturnType<typeof yargs>) {
  // option
  args
    .option('output', {
      alias: 'o',
      describe: 'output file name',
      type: 'string',
    })
    .option('ormconfigPath', {
      alias: 'p',
      describe: 'ormconfig file path',
      type: 'string',
    })
    .option('html', {
      alias: 'h',
      describe: 'use html format. For example, newline character replace <br />',
      type: 'boolean',
      default: true,
    })
    .option('name', {
      alias: 'n',
      describe: 'configuration name, see https://typeorm.io/#/using-ormconfig',
      type: 'string',
    });

  return casting(args);
}

type TGeneratorParameters = {
  conn: TResolvePromise<ReturnType<typeof connect>>;
  command: TCommand;
};

export const handler = ({
  argv,
  command,
  generator,
}: {
  argv: ArgumentsCamelCase<TErdiaCliOptions>;
  command: TCommand;
  generator: (args: TGeneratorParameters) => Promise<{ diagram: string; table: string }>;
}) =>
  TTE.tryCatch(
    async (): Promise<boolean> => {
      const option: IErdiaCliOptions = { ...argv, html: argv.html ?? true, name: 'default' };

      option.verbose ? (consola.level = LogLevel.Verbose) : undefined;
      option.verbose || isNotEmpty(argv.output)
        ? CliUx.ux.action.start('starting a process')
        : undefined;

      const conn = await connect(option);
      const { diagram, table } = await generator({ conn, command });

      await conn.close();

      option.verbose || isNotEmpty(argv.output) ? CliUx.ux.action.stop('done\n') : undefined;

      const content = getContent({ database: option.name, type: command, diagram, table });
      const prettierConfig = await prettier.resolveConfig('.');

      const formattedContent = prettier.format(content, {
        ...(prettierConfig ?? {}),
        parser:
          command === 'htmler' || command === 'htmlfull' || command === 'htmltable'
            ? 'html'
            : 'markdown',
      });

      if (argv.output !== undefined && argv.output !== null) {
        await fs.promises.writeFile(argv.output, formattedContent);
      } else {
        console.log(content);
      }

      return false;
    },
    (catched) => (catched instanceof Error ? catched : new Error('unknown error raised')),
  );

// eslint-disable-next-line
yargs(process.argv.slice(2))
  .command<TErdiaCliOptions>({
    command: '$0',
    aliases: 'er',
    builder: setOptions,
    handler: async (argv) => {
      await handler({
        argv,
        command: 'er',
        generator: async (args: TGeneratorParameters) => ({
          diagram: await erdiagram(args.conn),
          table: '',
        }),
      })();
    },
  })
  .command<TErdiaCliOptions>({
    command: 'htmler',
    builder: setOptions,
    handler: async (argv) => {
      await handler({
        argv,
        command: 'htmler',
        generator: async (args: TGeneratorParameters) => ({
          diagram: await htmlErdiagram(args.conn),
          table: '',
        }),
      })();
    },
  })
  .command<TErdiaCliOptions>({
    command: 'mdtable',
    builder: setOptions,
    handler: async (argv) => {
      await handler({
        argv,
        command: 'mdtable',
        generator: async (args: TGeneratorParameters) => ({
          diagram: '',
          table: await mdtable(args.conn, { ...argv, html: argv.html ?? true, name: 'default' }),
        }),
      })();
    },
  })
  .command<TErdiaCliOptions>({
    command: 'htmltable',
    builder: setOptions,
    handler: async (argv) => {
      await handler({
        argv,
        command: 'mdtable',
        generator: async (args: TGeneratorParameters) => ({
          diagram: '',
          table: await htmlTable(args.conn),
        }),
      })();
    },
  })
  .command<TErdiaCliOptions>({
    command: 'mdfull',
    builder: setOptions,
    handler: async (argv) => {
      await handler({
        argv,
        command: 'mdfull',
        generator: async (args: TGeneratorParameters) => ({
          diagram: await erdiagram(args.conn),
          table: await mdtable(args.conn, { ...argv, html: argv.html ?? true, name: 'default' }, 3),
        }),
      })();
    },
  })
  .command<TErdiaCliOptions>({
    command: 'htmlfull',
    builder: setOptions,
    handler: async (argv) => {
      await handler({
        argv,
        command: 'htmlfull',
        generator: async (args: TGeneratorParameters) => ({
          diagram: await htmlErdiagram(args.conn),
          table: await htmlTable(args.conn, 3),
        }),
      })();
    },
  })
  .option('verbose', {
    alias: 'v',
    describe: 'will print more logging message',
    type: 'boolean',
    default: false,
  })
  .help().argv;
