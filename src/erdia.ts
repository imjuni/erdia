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
import IReason from '@creator/interface/IReason';
import writeToHtml from '@creator/writeToHtml';
import writeToImage from '@creator/writeToImage';
import writeToMarkdown from '@creator/writeToMarkdown';
import writeToPdf from '@creator/writeToPdf';
import htmlMermaidTemplate from '@template/htmlMermaidTemplate';
import htmlTemplate from '@template/htmlTemplate';
import markdownTemplate from '@template/markdownTemplate';
import logger from '@tool/logger';
import getDataSource from '@typeorm/getDataSource';
import getEntityDatas from '@typeorm/getEntityDatas';
import getRelationDatas from '@typeorm/getRelationDatas';
import chalk from 'chalk';
import del from 'del';
import fastSafeStringify from 'fast-safe-stringify';
import { isError, isFalse, isNotEmpty } from 'my-easy-fp';
import { exists } from 'my-node-fp';
import { IFail, isFail } from 'my-only-either';
import { DataSource } from 'typeorm';

const log = logger();

export async function createHtmlDoc(option: IErdiaHtmlOption) {
  let localDataSource: DataSource | undefined;

  try {
    const dataSource = await getDataSource(option);
    await dataSource.initialize();

    if (isFalse(dataSource.isInitialized)) {
      throw new Error(`Cannot initialize in ${fastSafeStringify(dataSource.options, undefined, 2)}`);
    }

    localDataSource = dataSource;

    log.info(`connection initialize: "${chalk.yellowBright(`${option.dataSourcePath}`)}"`);

    const entityDatas = getEntityDatas(dataSource, option);
    const relationDatas = getRelationDatas(dataSource);

    const failRelations = relationDatas
      .filter((relationData): relationData is IFail<IReason> => isFail(relationData))
      .map((relationData) => relationData.fail)
      .flat();

    failRelations.forEach((relation) => log.warn(relation.message));

    const { components } = option;
    const diagram = components.includes('er') ? getERdiagram(entityDatas, relationDatas, option) : '';
    const table = components.includes('table') ? getHtmlTable(entityDatas, option) : '';

    log.verbose(`target component: ${components.join(', ')}`);

    const { output } = option;
    if (output !== undefined && output !== null && output.length > 0) {
      await writeToHtml({ ...option, output }, diagram, table);
    } else {
      const document = await applyPrettier(htmlTemplate(table, htmlMermaidTemplate(diagram, true, option)), 'html');
      console.log(document);
    }
  } catch (catched) {
    const err = isError(catched) ?? new Error(`unknown error raised from ${createHtmlDoc}`);

    log.error(err.message);
    log.error(err.stack);
  } finally {
    if (isNotEmpty(localDataSource)) {
      localDataSource.destroy();
    }
  }
}

export async function createMarkdownDoc(option: IErdiaMarkdownOption) {
  let localDataSource: DataSource | undefined;

  try {
    const dataSource = await getDataSource(option);
    await dataSource.initialize();

    if (isFalse(dataSource.isInitialized)) {
      throw new Error(`Cannot initialize in ${fastSafeStringify(dataSource.options, undefined, 2)}`);
    }

    localDataSource = dataSource;

    log.info(`connection initialize: "${chalk.yellowBright(`${option.dataSourcePath}`)}"`);
    log.verbose(`html-br option: ${option.htmlBr}`);

    const entityDatas = getEntityDatas(dataSource, option);
    const relationDatas = getRelationDatas(dataSource);

    const failRelations = relationDatas
      .filter((relationData): relationData is IFail<IReason> => isFail(relationData))
      .map((relationData) => relationData.fail)
      .flat();

    failRelations.forEach((relation) => log.warn(relation.message));

    const { components } = option;
    const diagram = components.includes('er') ? getERdiagram(entityDatas, relationDatas, option) : '';
    const table = components.includes('table') ? getMarkdownTable(entityDatas, option) : '';

    log.verbose(`target component: ${components.join(', ')}`);

    const { output } = option;
    if (output !== undefined && output !== null && output.length > 0) {
      await writeToMarkdown({ ...option, output }, diagram, table);
    } else {
      const document = await applyPrettier(markdownTemplate(table, true, diagram), 'md');
      console.log(document);
    }
  } catch (catched) {
    const err = isError(catched) ?? new Error(`unknown error raised from ${createHtmlDoc}`);

    log.error(err.message);
    log.error(err.stack);
  } finally {
    if (isNotEmpty(localDataSource)) {
      localDataSource.destroy();
    }
  }
}

export async function createPdfDoc(option: IErdiaPDFOption) {
  let localDataSource: DataSource | undefined;

  try {
    const dataSource = await getDataSource(option);
    await dataSource.initialize();

    if (isFalse(dataSource.isInitialized)) {
      throw new Error(`Cannot initialize in ${fastSafeStringify(dataSource.options, undefined, 2)}`);
    }

    localDataSource = dataSource;

    log.info(`connection initialize: "${chalk.yellowBright(`${option.dataSourcePath}`)}"`);

    const entityDatas = getEntityDatas(dataSource, option);
    const relationDatas = getRelationDatas(dataSource);

    const failRelations = relationDatas
      .filter((relationData): relationData is IFail<IReason> => isFail(relationData))
      .map((relationData) => relationData.fail)
      .flat();

    failRelations.forEach((relation) => log.warn(relation.message));

    const { components } = option;
    const diagram = components.includes('er') ? getERdiagram(entityDatas, relationDatas, option) : '';
    const table = components.includes('table') ? getHtmlTable(entityDatas, option) : '';

    log.verbose(`target component: ${components.join(', ')}`);

    const { output } = option;
    if (output !== undefined && output !== null && output.length > 0) {
      await writeToPdf({ ...option, output }, diagram, table);
    } else {
      log.error('pdf command must set output');
    }
  } catch (catched) {
    const err = isError(catched) ?? new Error(`unknown error raised from ${createHtmlDoc}`);

    log.error(err.message);
    log.error(err.stack);
  } finally {
    if (isNotEmpty(localDataSource)) {
      localDataSource.destroy();
    }
  }
}

export async function createImageDoc(option: IErdiaImageOption) {
  let localDataSource: DataSource | undefined;

  try {
    const dataSource = await getDataSource(option);
    await dataSource.initialize();

    if (isFalse(dataSource.isInitialized)) {
      throw new Error(`Cannot initialize in ${fastSafeStringify(dataSource.options, undefined, 2)}`);
    }

    localDataSource = dataSource;

    log.info(`connection initialize: "${chalk.yellowBright(`${option.dataSourcePath}`)}"`);

    const entityDatas = getEntityDatas(dataSource, option);
    const relationDatas = getRelationDatas(dataSource);

    const failRelations = relationDatas
      .filter((relationData): relationData is IFail<IReason> => isFail(relationData))
      .map((relationData) => relationData.fail)
      .flat();

    failRelations.forEach((relation) => log.warn(relation.message));

    const diagram = getERdiagram(entityDatas, relationDatas, option);

    const { output } = option;
    if (output !== undefined && output !== null && output.length > 0) {
      await writeToImage({ ...option, output }, diagram);
    } else {
      log.error(`pdf command must set output`);
    }
  } catch (catched) {
    const err = isError(catched) ?? new Error(`unknown error raised from ${createHtmlDoc}`);

    log.error(err.message);
    log.error(err.stack);
  } finally {
    if (isNotEmpty(localDataSource)) {
      localDataSource.destroy();
    }
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
