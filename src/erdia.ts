import connect from '@misc/connect';
import eol from '@misc/eol';
import { IErdiaCliOptions } from '@misc/options';
import chalk from 'chalk';
import sourceMapSupport from 'source-map-support';
import yargs from 'yargs/yargs';
import erdiagram from './handler/erdiagram';
import mdtable from './handler/mdtable';

sourceMapSupport.install();

// only use builder function
const casting = <T>(args: T): any => args;

function setOptions(args: ReturnType<typeof yargs>) {
  args.option('use-ormconfig', {
    alias: 'c',
    describe: 'use ormconfig file, see https://typeorm.io/#/using-ormconfig',
    type: 'boolean',
    default: true,
  });

  args.option('database', {
    alias: 'd',
    describe: 'set database name, see https://typeorm.io/#/using-ormconfig',
    type: 'string',
  });

  args.require('database', 'must set database name for database connection');

  args.option('use-loader-path', {
    alias: 'l',
    describe:
      'use database connection script, script have default function that return typeorm Connection',
    type: 'string',
  });

  return casting(args);
}

// eslint-disable-next-line
yargs(process.argv.slice(2))
  .command<IErdiaCliOptions>({
    command: '$0',
    aliases: 'er',
    builder: setOptions,
    handler: async (argv) => {
      try {
        const conn = await connect(argv);
        const diagram = await erdiagram(conn);

        await conn.close();

        console.log(diagram);
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
  .command<IErdiaCliOptions>({
    command: 'mdtable',
    builder: setOptions,
    handler: async (argv) => {
      try {
        const conn = await connect(argv);
        const table = await mdtable(conn, 1);

        await conn.close();

        console.log(table);
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
  .command<IErdiaCliOptions>({
    command: 'mdfull',
    builder: setOptions,
    handler: async (argv) => {
      try {
        const conn = await connect(argv);
        const diagram = await erdiagram(conn);
        const table = await mdtable(conn, 2);

        const full = [
          '# Tables',
          table,
          eol(),
          '# ER diagram',
          `\`\`\`mermaid${eol()}${diagram}${eol()}\`\`\``,
        ].join(eol());

        await conn.close();

        console.log(full);
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
