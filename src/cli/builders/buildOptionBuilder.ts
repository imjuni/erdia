import type { Argv } from 'yargs';

export function buildOptionBuilder<T>(args: Argv<T>) {
  // option
  args

    .option('route-base-path', {
      describe:
        'define the route base path. The route base path is used as the base path for navbar anchor when generating HTML documents',
      type: 'string',
      default: undefined,
    })
    .option('title', {
      describe: 'define what will be written in the HTML document title tag',
      type: 'string',
      default: undefined,
    })
    .option('prettier-config', {
      describe: 'define the path to the prettier configuration file',
      type: 'string',
      default: undefined,
    })
    .option('puppeteer-config', {
      describe: 'define the path to the puppeteer configuration file',
      type: 'string',
    })
    .option('width', {
      describe: 'define the ER diagram width. The width is defined by the HTML document css attribute width',
      type: 'string',
      default: '100%',
    })
    .option('viewport-width', {
      describe: 'define the viewport width to puppeteer. The width is defined by the HTML document css attribute width',
      type: 'number',
      default: 1280,
    })
    .option('viewport-height', {
      describe:
        'define the viewport height to puppeteer. The width is defined by the HTML document css attribute height',
      type: 'number',
      default: 720 * 2,
    })
    .option('image-format', {
      describe: 'define the format to image file',
      type: 'string',
      choices: ['svg', 'png'],
      default: 'svg',
    })
    .option('background-color', {
      describe: "define the background color to html documents. eg. transparent, red, '#F0F0F0'",
      type: 'string',
      default: 'white',
    });

  return args;
}
