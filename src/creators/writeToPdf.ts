import type { IBuildCommandOption } from '#/configs/interfaces/IBuildCommandOption';
import type { getRenderData } from '#/creators/getRenderData';
import type { IErdiaDocument } from '#/creators/interfaces/IErdiaDocument';
import { getPuppeteerConfig } from '#/tools/getPuppeteerConfig';
import consola from 'consola';
import del from 'del';
import fs from 'fs';
import { isError } from 'my-easy-fp';
import path from 'path';
import * as puppeteer from 'puppeteer';
import type { AsyncReturnType } from 'type-fest';

export async function writeToPdf(
  document: IErdiaDocument,
  option: IBuildCommandOption,
  renderData: AsyncReturnType<typeof getRenderData>,
): Promise<string[]> {
  let localBrowser: puppeteer.Browser | undefined;
  let localPage: puppeteer.Page | undefined;

  try {
    const puppeteerConfig = await getPuppeteerConfig(option.puppeteerConfig);
    const browser = await puppeteer.launch({ ...puppeteerConfig, headless: true });
    const page = await browser.newPage();
    const puppeteerGotoOption: Parameters<typeof page.goto>[1] = {
      waitUntil: 'domcontentloaded',
      timeout: 60_000,
    };

    localBrowser = browser;
    localPage = page;

    consola.info('filename: ', document.filename);

    await page.setViewport({ width: option.viewportWidth ?? 1280, height: option.viewportHeight ?? 720 * 2 });
    await fs.promises.writeFile(document.filename, document.content);
    await page.goto(`file://${document.filename}`, puppeteerGotoOption);
    await page.pdf({
      path: path.join(document.dirname, `${renderData.metadata.name}.pdf`),
      printBackground: option.backgroundColor !== 'transparent',
    });

    await del(document.filename);

    return [path.join(document.dirname, `${renderData.metadata.name}.pdf`)];
  } catch (caught) {
    const err = isError(caught, new Error('unknown error raised from writeToPdf'));

    consola.error(err.message);
    consola.error(err.stack);

    return [];
  } finally {
    if (localPage !== undefined && localPage !== null) {
      consola.debug('Session Closed');
      await localPage.close();
    }

    if (localBrowser !== undefined && localBrowser !== null) {
      await localBrowser.close();
    }
  }
}
