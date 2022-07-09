import IErdiaPDFOption from '@config/interface/IErdiaPDFOption';
import TOutputComponent from '@config/interface/TOutputComponent';
import htmlMermaidTemplate from '@template/htmlMermaidTemplate';
import htmlTemplate from '@template/htmlTemplate';
import getFilename from '@tool/getFilename';
import getPuppeteerConfig from '@tool/getPuppeteerConfig';
import logger from '@tool/logger';
import del from 'del';
import fs from 'fs';
import { isEmpty, isError, isNotEmpty } from 'my-easy-fp';
import path from 'path';
import puppeteer from 'puppeteer';
import applyPrettier from './applyPretter';

const log = logger();

export default async function writeToPdf(
  option: Omit<IErdiaPDFOption, 'output'> & { output: Required<IErdiaPDFOption>['output'] },
  diagram: string,
  table: string,
) {
  let localBrowser: puppeteer.Browser | undefined;
  let localPage: puppeteer.Page | undefined;

  try {
    const puppeteerConfig = await getPuppeteerConfig(option.puppeteerConfigPath);
    const browser = await puppeteer.launch(puppeteerConfig);
    const page = await browser.newPage();
    const puppeteerGotoOption: Parameters<typeof page.goto>[1] = {
      waitUntil: 'domcontentloaded',
      timeout: 60_000,
    };

    localBrowser = browser;
    localPage = page;

    page.setViewport({ width: option.viewportWidth ?? 1280, height: option.viewportHeight ?? 720 * 2 });

    // export every component to single file
    if (option.output.length === 1 && option.components.includes('er') && option.components.includes('table')) {
      const baseFilename = option.output.at(0);
      const document = await applyPrettier(htmlTemplate(table, htmlMermaidTemplate(diagram, false, option)));

      if (isEmpty(baseFilename)) {
        throw new Error(`invalid output filename: ${baseFilename}`);
      }

      const htmlFilename = getFilename(baseFilename, undefined, 'html');
      const pdfFileName = getFilename(baseFilename, undefined, 'pdf');

      await fs.promises.writeFile(htmlFilename, document);
      await page.goto(`file://${path.join(process.cwd(), htmlFilename)}`, puppeteerGotoOption);
      await page.pdf({ path: pdfFileName, printBackground: option.backgroundColor !== 'transparent' });

      log.info(`Component ${option.components.join(', ')} will be write on ${pdfFileName}`);

      return true;
    }

    // export every component to each file
    const [diagramDocument, tableDocument] = await Promise.all([
      applyPrettier(htmlTemplate('', htmlMermaidTemplate(diagram, false, option))),
      applyPrettier(htmlTemplate(table, '')),
    ]);

    const nullableFileInfos = option.components.map((component, index) => ({
      component,
      filename: option.output.at(index),
    }));

    // need overwrtie check
    const fileInfos = nullableFileInfos.filter(
      (filename): filename is { component: TOutputComponent; filename: string } => isNotEmpty(filename.filename),
    );

    await fileInfos.reduce(async (promise: Promise<boolean>, fileInfo) => {
      await promise;

      log.info(`Component ${fileInfo.component} will be write on ${fileInfo.filename}`);

      const htmlFilename = getFilename(fileInfo.filename, `__${fileInfo.component}`, 'html');
      const pdfFilename = getFilename(fileInfo.filename, undefined, 'pdf');

      await fs.promises.writeFile(htmlFilename, fileInfo.component === 'er' ? diagramDocument : tableDocument);
      await page.goto(`file://${path.join(process.cwd(), htmlFilename)}`, puppeteerGotoOption);
      await page.pdf({ path: pdfFilename, printBackground: option.backgroundColor !== 'transparent' });

      return true;
    }, Promise.resolve(true));

    await fileInfos.reduce(async (promise: Promise<void>, fileInfo) => {
      await promise;

      const htmlFilename = getFilename(fileInfo.filename, `__${fileInfo.component}`, 'html');
      del(htmlFilename);
    }, Promise.resolve());

    return true;
  } catch (catched) {
    const err = isError(catched) ?? new Error('unknown error raised from writeToPdf');

    log.error(err.message);
    log.error(err.stack);

    return false;
  } finally {
    if (localPage !== undefined && localPage !== null) {
      log.debug('Session Closed');
      await localPage.close();
    }

    if (localBrowser !== undefined && localBrowser !== null) {
      await localBrowser.close();
    }
  }
}
