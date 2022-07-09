import IErdiaHtmlOption from '@config/interface/IErdiaHtmlOption';
import IErdiaImageOption from '@config/interface/IErdiaImageOption';
import IErdiaMarkdownOption from '@config/interface/IErdiaMarkdownOption';
import IErdiaPDFOption from '@config/interface/IErdiaPDFOption';
import logger from '@tool/logger';
import findUp from 'find-up';
import fs from 'fs';
import { parse } from 'jsonc-parser';
import { isEmpty, isError, isFalse } from 'my-easy-fp';
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

  const command = argv._.at(0);
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
    };

    return partialHtmlConfig;
  }

  if (command === 'markdown' && configFileType === 'markdown') {
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
