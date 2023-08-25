import type { Argv } from 'yargs';

export default function buildOptionBuilder<T>(args: Argv<T>) {
  // option
  args
    .option('prettier-config', {
      describe: 'define the path to the prettier configuration file',
      type: 'string',
      default: undefined,
    })
    .option('title', {
      describe: 'define what will be written in the HTML document title tag',
      type: 'string',
      default: undefined,
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
    .option('puppeteer-config-path', {
      describe: 'define the path to puppeteer config file',
      type: 'string',
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
