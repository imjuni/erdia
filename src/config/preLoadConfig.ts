import IErdiaHtmlOption from '@config/interface/IErdiaHtmlOption';
import IErdiaImageOption from '@config/interface/IErdiaImageOption';
import IErdiaMarkdownOption from '@config/interface/IErdiaMarkdownOption';
import IErdiaPDFOption from '@config/interface/IErdiaPDFOption';
import logger from '@tool/logger';
import findUp from 'find-up';
import fs from 'fs';
import { parse } from 'jsonc-parser';
import { atOrThrow, isEmpty, isError, isFalse } from 'my-easy-fp';
import { existsSync } from 'my-node-fp';
import yargs from 'yargs';
import IErdiaCommonOption from './interface/IErdiaCommonOption';

const log = logger();

export default function preLoadConfig() {
  const argv = yargs(process.argv.slice(2)).parseSync() as any;

  const configFilePath: string = argv.c ?? argv.config ?? findUp.sync('.erdiarc');
  const configObject: any = (() => {
    try {
      const obj = parse(fs.readFileSync(configFilePath).toString());
      return obj;
    } catch (catched) {
      const err = isError(catched) ?? new Error('unknown error raised from preLoadConfig');

      log.debug(err.message);
      log.debug(err.stack);

      return undefined;
    }
  })();

  if (isFalse(existsSync(configFilePath))) {
    return {};
  }

  if (isEmpty(configObject) || Object.keys(configObject).length <= 0) {
    return {};
  }

  const command = atOrThrow(argv._, 0);
  const configFileType = configObject.type;

  if (command === 'image' && configFileType === 'image') {
    log.info(`image configuration: ${configFilePath}`);

    const partialImageConfig: Partial<IErdiaImageOption> = {
      o: configObject.output,
      output: configObject.output,
      indent: configObject.indent,
      erColumns: configObject['er-columns'],
      v: configObject.verbose,
      verbose: configObject.verbose,
      d: configObject['data-source-path'],
      dataSourcePath: configObject['data-source-path'],
      width: configObject.width,
      viewportWidth: configObject['viewport-width'],
      viewportHeight: configObject['viewport-height'],
      puppeteerConfigPath: configObject['puppeteer-config-path'],
      imageFormat: configObject['image-format'],
      theme: configObject.theme,
    };

    return partialImageConfig;
  }

  if (command === 'html' && configFileType === 'html') {
    log.info(`html configuration: ${configFilePath}`);

    const partialHtmlConfig: Partial<IErdiaHtmlOption> = {
      o: configObject.output,
      output: configObject.output,
      indent: configObject.indent,
      erColumns: configObject['er-columns'],
      v: configObject.verbose,
      verbose: configObject.verbose,
      d: configObject['data-source-path'],
      dataSourcePath: configObject['data-source-path'],
      t: configObject.components,
      components: configObject.components,
      tableColumns: configObject['table-columns'],
      width: configObject.width,
      theme: configObject.theme,
    };

    return partialHtmlConfig;
  }

  if (command === 'md' && configFileType === 'md') {
    log.info(`markdown configuration: ${configFilePath}`);

    const partialMarkdownOption: Partial<IErdiaMarkdownOption> = {
      o: configObject.output,
      output: configObject.output,
      indent: configObject.indent,
      erColumns: configObject['er-columns'],
      v: configObject.verbose,
      verbose: configObject.verbose,
      d: configObject['data-source-path'],
      dataSourcePath: configObject['data-source-path'],
      t: configObject.components,
      components: configObject.components,
      tableColumns: configObject['table-columns'],
      htmlBr: configObject['html-br'],
      theme: configObject.theme,
    };

    return partialMarkdownOption;
  }

  if (command === 'pdf' && configFileType === 'pdf') {
    log.info(`pdf configuration: ${configFilePath}`);

    const partialPdfOption: Partial<IErdiaPDFOption> = {
      o: configObject.output,
      output: configObject.output,
      indent: configObject.indent,
      erColumns: configObject['er-columns'],
      v: configObject.verbose,
      verbose: configObject.verbose,
      d: configObject['data-source-path'],
      dataSourcePath: configObject['data-source-path'],
      t: configObject.components,
      components: configObject.components,
      tableColumns: configObject['table-columns'],
      width: configObject.width,
      viewportWidth: configObject['viewport-width'],
      viewportHeight: configObject['viewport-height'],
      puppeteerConfigPath: configObject['puppeteer-config-path'],
      theme: configObject.theme,
    };

    return partialPdfOption;
  }

  if (command === 'clean') {
    const partialCommonOption: Partial<IErdiaCommonOption> = {
      o: configObject.output,
      output: configObject.output,
      indent: configObject.indent,
      erColumns: configObject.erColumns,
      v: configObject.verbose,
      verbose: configObject.verbose,
      d: configObject.dataSourcePath,
      dataSourcePath: configObject.dataSourcePath,
    };

    return partialCommonOption;
  }

  return {};
}
