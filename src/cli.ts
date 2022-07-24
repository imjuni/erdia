import commonOptionBuilder from '@cli/commonOptionBuilder';
import documentOptionBuilder from '@cli/documentOptionBuilder';
import htmlOptionBuilder from '@cli/htmlOptionBuilder';
import imageOptionBuilder from '@cli/imageOptionBuilder';
import markdownOptionBuilder from '@cli/markdownOptionBuilder';
import pdfOptionBuilder from '@cli/pdfOptionBuilder';
import IErdiaCommonOption from '@config/interface/IErdiaCommonOption';
import IErdiaHtmlOption from '@config/interface/IErdiaHtmlOption';
import IErdiaImageOption from '@config/interface/IErdiaImageOption';
import IErdiaMarkdownOption from '@config/interface/IErdiaMarkdownOption';
import IErdiaPDFOption from '@config/interface/IErdiaPDFOption';
import preLoadConfig from '@config/preLoadConfig';
import logger from '@tool/logger';
import sourceMapSupport from 'source-map-support';
import yargsAnyType, { Argv } from 'yargs';
import { cleanDoc, createHtmlDoc, createImageDoc, createMarkdownDoc, createPdfDoc, initErdia } from './erdia';

const log = logger();

sourceMapSupport.install();

// Yargs default type using object type(= {}). But object type cause error that
// fast-maker cli option interface type. So we make concrete type yargs instance
// make using by any type.
const yargs: Argv<IErdiaMarkdownOption | IErdiaHtmlOption | IErdiaPDFOption | IErdiaImageOption> = yargsAnyType as any;

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
yargs(process.argv.slice(2))
  .command<IErdiaMarkdownOption>({
    command: 'md',
    builder: (args) => {
      return [commonOptionBuilder, documentOptionBuilder, markdownOptionBuilder].reduce(
        (arg, builder) => builder(arg),
        args as any,
      );
    },
    handler: async (argv) => {
      log.level = argv.verbose ? 'verbose' : 'info';
      await createMarkdownDoc({ ...argv, type: 'markdown' });
    },
  })
  .command<IErdiaHtmlOption>({
    command: 'html',
    builder: (args) => {
      return [commonOptionBuilder, documentOptionBuilder, htmlOptionBuilder].reduce(
        (arg, builder) => builder(arg),
        args as any,
      );
    },
    handler: async (argv) => {
      log.level = argv.verbose ? 'verbose' : 'info';
      await createHtmlDoc({ ...argv, type: 'html' });
    },
  })
  .command<IErdiaPDFOption>({
    command: 'pdf',
    builder: (args) => {
      return [commonOptionBuilder, documentOptionBuilder, pdfOptionBuilder].reduce(
        (arg, builder) => builder(arg),
        args as any,
      );
    },
    handler: async (argv) => {
      log.level = argv.verbose ? 'verbose' : 'info';
      await createPdfDoc({ ...argv, type: 'pdf' });
    },
  })

  .command<IErdiaImageOption>({
    command: 'image',
    builder: (args) => {
      return [commonOptionBuilder, imageOptionBuilder].reduce((arg, builder) => builder(arg), args as any);
    },
    handler: async (argv) => {
      log.level = argv.verbose ? 'verbose' : 'info';
      await createImageDoc({ ...argv, type: 'image' });
    },
  })
  .command<IErdiaCommonOption>({
    command: 'clean',
    builder: (args) => {
      return commonOptionBuilder(args) as any;
    },
    handler: async (argv) => {
      log.level = argv.verbose ? 'verbose' : 'info';
      await cleanDoc(argv);
    },
  })
  .command({
    command: 'init',
    handler: async (argv) => {
      log.level = argv.verbose ? 'verbose' : 'info';
      await initErdia();
    },
  })
  .demandCommand()
  .recommendCommands()
  .config(preLoadConfig())
  .help().argv;
