import IErdiaImageOption from '@config/interface/IErdiaImageOption';

import { Argv } from 'yargs';

export default function imageOptionBuilder(args: Argv<IErdiaImageOption>) {
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
    .option('image-format', {
      describe: 'puppeteer config file path',
      type: 'string',
      choices: ['svg', 'png'],
      default: 'svg',
    })
    .option('background-color', {
      describe: "Background color. Example: transparent, red, '#F0F0F0'. Optional. Default: white",
      type: 'string',
      default: 'white',
    })
    .demandOption(['data-source-path', 'output']);

  return args;
}
