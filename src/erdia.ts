import connect from '@misc/connect';
import eol from '@misc/eol';
import { IErdiaCliOptions } from '@misc/options';
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
      const conn = await connect(argv);
      const diagram = await erdiagram(conn);

      console.log(diagram);
    },
  })
  .command<IErdiaCliOptions>({
    command: 'mdtable',
    builder: setOptions,
    handler: async (argv) => {
      const conn = await connect(argv);
      const table = await mdtable(conn, 1);

      console.log(table);
    },
  })
  .command<IErdiaCliOptions>({
    command: 'mdfull',
    builder: setOptions,
    handler: async (argv) => {
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

      console.log(full);
    },
  })
  .help().argv;
