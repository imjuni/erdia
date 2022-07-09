import IErdiaPDFOption from '@config/interface/IErdiaPDFOption';

import { Argv } from 'yargs';

export default function pdfOptionBuilder(args: Argv<IErdiaPDFOption>) {
  // option
  args
    .option('width', {
      describe: 'ER diagram width, it will be set width css attribute',
      type: 'string',
      default: '100%',
    })
    .option('viewport-width', {
      describe: 'puppeteer viewport width',
      type: 'number',
      default: 1280,
    })
    .option('viewport-height', {
      describe: 'puppeteer viewport width',
      type: 'number',
      default: 720 * 2,
    })
    .option('puppeteer-config-path', {
      describe: 'puppeteer config file path',
      type: 'string',
    })
    .option('background-color', {
      describe: "Background color. Example: transparent, red, '#F0F0F0'. Optional. Default: white",
      type: 'string',
      default: 'white',
    })
    .demandOption(['data-source-path', 'output']);

  return args;
}
