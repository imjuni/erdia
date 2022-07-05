import getDatabaseName from '@common/getDatabaseName';
import erdiagram from '@handler/erdiagram';
import htmlErdiagram from '@handler/htmlErdiagram';
import htmlTable from '@handler/htmlTable';
import mdtable from '@handler/mdtable';
import getContent from '@handler/write';
import getConnectedDataSource from '@misc/getConnectedDataSource';
import { IErdiaCliOptions } from '@misc/options';
import { CliUx } from '@oclif/core';
import consola, { LogLevel } from 'consola';
import * as TTE from 'fp-ts/TaskEither';
import fs from 'fs';
import { isNotEmpty, TNullablePick, TResolvePromise } from 'my-easy-fp';
import prettier from 'prettier';
import sourceMapSupport from 'source-map-support';
import yargs, { ArgumentsCamelCase } from 'yargs';

sourceMapSupport.install();

export type TErdiaCliOptions = TNullablePick<IErdiaCliOptions, 'html'>;
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
    .option('dataSourcePath', {
      alias: 'd',
      describe: 'dataSource file path',
      type: 'string',
      demandOption: true,
    })
    .option('html', {
      alias: 'h',
      describe: 'use html format. For example, newline character replace <br />',
      type: 'boolean',
      default: true,
    });

  return casting(args);
}

type TGeneratorParameters = {
  conn: TResolvePromise<ReturnType<typeof getConnectedDataSource>>;
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
      const option: IErdiaCliOptions = { ...argv, html: argv.html ?? true };

      if (option.verbose) {
        consola.level = LogLevel.Verbose;
      }

      if (option.verbose || isNotEmpty(argv.output)) {
        CliUx.ux.action.start('starting a process');
      }

      const dataSource = await getConnectedDataSource(option);
      const { diagram, table } = await generator({ conn: dataSource, command });

      await dataSource.destroy();

      if (option.verbose || isNotEmpty(argv.output)) {
        CliUx.ux.action.stop('done\n');
      }

      const content = getContent({
        database: getDatabaseName(dataSource),
        type: command,
        diagram,
        table,
      });
      const prettierConfig = await prettier.resolveConfig('.');

      const formattedContent = prettier.format(content, {
        ...(prettierConfig ?? {}),
        parser: command === 'htmler' || command === 'htmlfull' || command === 'htmltable' ? 'html' : 'markdown',
      });

      if (argv.output !== undefined && argv.output !== null) {
        await fs.promises.writeFile(argv.output, formattedContent);
      } else {
        console.log(content);
      }

      return false;
    },
    (catched) => {
      const err = catched instanceof Error ? catched : new Error('unknown error raised');
      consola.error(err);
    },
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
          table: await mdtable(args.conn, { ...argv, html: argv.html ?? true }),
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
          table: await mdtable(args.conn, { ...argv, html: argv.html ?? true }, 3),
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
