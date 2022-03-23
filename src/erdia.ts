import erdiagram from '@handler/erdiagram';
import mdtable from '@handler/mdtable';
import write from '@handler/write';
import connect from '@misc/connect';
import eol from '@misc/eol';
import { IErdiaCliOptions } from '@misc/options';
import chalk from 'chalk';
import sourceMapSupport from 'source-map-support';
import yargs from 'yargs/yargs';

sourceMapSupport.install();

type TErdiaCliOptions = Omit<IErdiaCliOptions, 'html'> & { html?: boolean };

// only use builder function
const casting = <T>(args: T): any => args;

function setOptions(args: ReturnType<typeof yargs>) {
  // option
  args.option('output', {
    alias: 'o',
    describe: 'output file name',
    type: 'string',
  });

  args.option('ormconfigPath', {
    alias: 'p',
    describe: 'ormconfig file path',
    type: 'string',
  });

  args.option('html', {
    alias: 'h',
    describe: 'use html format. For example, newline character replace <br />',
    type: 'boolean',
    default: true,
  });

  // require option
  args.option('name', {
    alias: 'n',
    describe: 'configuration name, see https://typeorm.io/#/using-ormconfig',
    type: 'string',
  });

  args.require('name', 'Please pass configuration name for database connection');

  return casting(args);
}

// eslint-disable-next-line
yargs(process.argv.slice(2))
  .command<TErdiaCliOptions>({
    command: '$0',
    aliases: 'er',
    builder: setOptions,
    handler: async (argv) => {
      try {
        const option = { ...argv, html: argv.html ?? true };
        const conn = await connect(option);
        const diagram = await erdiagram(conn);

        await conn.close();

        if (argv.output !== undefined && argv.output !== null) {
          await write({
            database: argv.name,
            filename: argv.output,
            type: 'er',
            content: diagram,
          });
        } else {
          console.log(diagram);
        }
      } catch (catched) {
        const err =
          catched instanceof Error
            ? catched
            : new Error('unknown error raised from ER diagram creation');

        console.log(chalk.redBright('error occured, '));
        console.log(err.message);
      }
    },
  })
  .command<TErdiaCliOptions>({
    command: 'mdtable',
    builder: setOptions,
    handler: async (argv) => {
      try {
        const option = { ...argv, html: argv.html ?? true };
        const conn = await connect(option);
        const table = await mdtable(conn, option, 1);

        await conn.close();

        if (argv.output !== undefined && argv.output !== null) {
          await write({
            database: argv.name,
            filename: argv.output,
            type: 'er',
            content: table,
          });
        } else {
          console.log(table);
        }
      } catch (catched) {
        const err =
          catched instanceof Error
            ? catched
            : new Error('unknown error raised from ER diagram creation');

        console.log(chalk.redBright('error occured, '));
        console.log(err.message);
      }
    },
  })
  .command<TErdiaCliOptions>({
    command: 'mdfull',
    builder: setOptions,
    handler: async (argv) => {
      try {
        const option = { ...argv, html: argv.html ?? true };
        const conn = await connect(option);
        const diagram = await erdiagram(conn);
        const table = await mdtable(conn, option, 2);

        const full = [
          '# Tables',
          table,
          eol(),
          '# ER diagram',
          `\`\`\`mermaid${eol()}${diagram}${eol()}\`\`\``,
        ].join(eol());

        await conn.close();

        if (argv.output !== undefined && argv.output !== null) {
          await write({
            database: argv.name,
            filename: argv.output,
            type: 'er',
            content: full,
          });
        } else {
          console.log(full);
        }
      } catch (catched) {
        const err =
          catched instanceof Error
            ? catched
            : new Error('unknown error raised from ER diagram creation');

        console.log(chalk.redBright('error occured, '));
        console.log(err.message);
      }
    },
  })
  .help().argv;
