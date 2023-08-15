import type { Argv } from 'yargs';

export default function buildOptionBuilder<T>(args: Argv<T>) {
  // option
  args
    .option('use-pkg-ver', {
      describe: 'entity version set from package.json version field',
      type: 'boolean',
      default: false,
    })
    .option('project-name', {
      describe: 'entity version set from package.json version field',
      type: 'string',
      choices: ['database', 'application'],
      default: 'application',
    })
    .option('prettier-config', {
      describe: 'prettier configuration file path',
      type: 'string',
      default: undefined,
    })
    .option('title', {
      describe: 'title tag content that inside of html document',
      type: 'string',
      default: undefined,
    })
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
      describe: 'puppeteer viewport height',
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
    });

  return args;
}
