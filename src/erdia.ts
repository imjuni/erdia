import onHandleInitErdia from '@cli/initErdia';
import IErdiaCommonOption from '@config/interface/IErdiaCommonOption';
import IErdiaHtmlOption from '@config/interface/IErdiaHtmlOption';
import IErdiaImageOption from '@config/interface/IErdiaImageOption';
import IErdiaMarkdownOption from '@config/interface/IErdiaMarkdownOption';
import IErdiaPDFOption from '@config/interface/IErdiaPDFOption';
import applyPrettier from '@creator/applyPretter';
import getERdiagram from '@creator/getERdiagram';
import getHtmlTable from '@creator/getHtmlTable';
import getMarkdownTable from '@creator/getMarkdownTable';
import writeToHtml from '@creator/writeToHtml';
import writeToImage from '@creator/writeToImage';
import writeToMarkdown from '@creator/writeToMarkdown';
import writeToPdf from '@creator/writeToPdf';
import htmlMermaidTemplate from '@template/htmlMermaidTemplate';
import htmlTemplate from '@template/htmlTemplate';
import markdownTemplate from '@template/markdownTemplate';
import logger from '@tool/logger';
import getDataSource from '@typeorm/getDataSource';
import chalk from 'chalk';
import del from 'del';
import fastSafeStringify from 'fast-safe-stringify';
import { isFalse } from 'my-easy-fp';
import { exists } from 'my-node-fp';

const log = logger();

export async function createHtmlDoc(option: IErdiaHtmlOption) {
  const dataSource = await getDataSource(option);
  await dataSource.initialize();

  if (isFalse(dataSource.isInitialized)) {
    throw new Error(`Cannot initialize in ${fastSafeStringify(dataSource.options, undefined, 2)}`);
  }

  log.info(`connection initialize: "${chalk.yellowBright(`${option.dataSourcePath}`)}"`);

  const { components } = option;
  const diagram = components.includes('er') ? getERdiagram(dataSource, option) : '';
  const table = components.includes('table') ? getHtmlTable(dataSource, option) : '';

  log.verbose(`target component: ${components.join(', ')}`);

  const { output } = option;
  if (output !== undefined && output !== null && output.length > 0) {
    await writeToHtml({ ...option, output }, diagram, table);
  } else {
    const document = await applyPrettier(htmlTemplate(table, htmlMermaidTemplate(diagram, true, option)), 'html');
    console.log(document);
  }
}

export async function createMarkdownDoc(option: IErdiaMarkdownOption) {
  const dataSource = await getDataSource(option);
  await dataSource.initialize();

  if (isFalse(dataSource.isInitialized)) {
    throw new Error(`Cannot initialize in ${fastSafeStringify(dataSource.options, undefined, 2)}`);
  }

  log.info(`connection initialize: "${chalk.yellowBright(`${option.dataSourcePath}`)}"`);
  log.verbose(`html-br option: ${option.htmlBr}`);

  const { components } = option;
  const diagram = components.includes('er') ? getERdiagram(dataSource, option) : '';
  const table = components.includes('table') ? getMarkdownTable(dataSource, option) : '';

  log.verbose(`target component: ${components.join(', ')}`);

  const { output } = option;
  if (output !== undefined && output !== null && output.length > 0) {
    await writeToMarkdown({ ...option, output }, diagram, table);
  } else {
    const document = await applyPrettier(markdownTemplate(table, true, diagram), 'md');
    console.log(document);
  }
}

export async function createPdfDoc(option: IErdiaPDFOption) {
  const dataSource = await getDataSource(option);
  await dataSource.initialize();

  if (isFalse(dataSource.isInitialized)) {
    throw new Error(`Cannot initialize in ${fastSafeStringify(dataSource.options, undefined, 2)}`);
  }

  log.info(`connection initialize: "${chalk.yellowBright(`${option.dataSourcePath}`)}"`);

  const { components } = option;
  const diagram = components.includes('er') ? getERdiagram(dataSource, option) : '';
  const table = components.includes('table') ? getHtmlTable(dataSource, option) : '';

  log.verbose(`target component: ${components.join(', ')}`);

  const { output } = option;
  if (output !== undefined && output !== null && output.length > 0) {
    await writeToPdf({ ...option, output }, diagram, table);
  } else {
    log.error('pdf command must set output');
  }
}

export async function createImageDoc(option: IErdiaImageOption) {
  const dataSource = await getDataSource(option);
  await dataSource.initialize();

  if (isFalse(dataSource.isInitialized)) {
    throw new Error(`Cannot initialize in ${fastSafeStringify(dataSource.options, undefined, 2)}`);
  }

  log.info(`connection initialize: "${chalk.yellowBright(`${option.dataSourcePath}`)}"`);

  const diagram = getERdiagram(dataSource, option);

  const { output } = option;
  if (output !== undefined && output !== null && output.length > 0) {
    await writeToImage({ ...option, output }, diagram);
  } else {
    log.error(`pdf command must set output`);
  }
}

export async function cleanDoc(option: IErdiaCommonOption) {
  const files = [
    'erdiagram.md',
    'table.md',
    'erdiagram.html',
    'table.html',
    'erdiagram.pdf',
    'table.pdf',
    'erdiagram.svg',
    'erdiagram.png',
  ].concat(option.output ?? []);

  const existFiles = await Promise.all(files.map(async (filename) => ({ filename, exists: await exists(filename) })));
  const existFilenames = existFiles.filter((existFile) => existFile.exists).map((existFile) => existFile.filename);

  log.info(`clean: ${existFilenames.join(', ')}`);

  await del(existFilenames);
}

export const initErdia = onHandleInitErdia;
