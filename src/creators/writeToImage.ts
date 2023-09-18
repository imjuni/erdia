import consola from 'consola';
import del from 'del';
import fs from 'fs';
import { isError } from 'my-easy-fp';
import path from 'path';
import * as puppeteer from 'puppeteer';
import type IBuildCommandOption from 'src/configs/interfaces/IBuildCommandOption';
import type getRenderData from 'src/creators/getRenderData';
import type IErdiaDocument from 'src/creators/interfaces/IErdiaDocument';
import getPuppeteerConfig from 'src/tools/getPuppeteerConfig';
import type { AsyncReturnType } from 'type-fest';

export default async function writeToImage(
  document: IErdiaDocument,
  option: IBuildCommandOption,
  renderData: AsyncReturnType<typeof getRenderData>,
) {
  let localBrowser: puppeteer.Browser | undefined;
  let localPage: puppeteer.Page | undefined;

  try {
    const puppeteerConfig = await getPuppeteerConfig(option.puppeteerConfig);
    const browser = await puppeteer.launch({ ...puppeteerConfig, headless: 'new' });
    const page = await browser.newPage();
    const puppeteerGotoOption: Parameters<typeof page.goto>[1] = {
      waitUntil: 'domcontentloaded',
      timeout: 60_000,
    };

    localBrowser = browser;
    localPage = page;

    await fs.promises.writeFile(document.filename, document.content);
    await page.setViewport({ width: option.viewportWidth ?? 1280, height: option.viewportHeight ?? 720 * 2 });
    await page.goto(`file://${document.filename}`, puppeteerGotoOption);

    consola.debug(`file write start: ${document.filename}`);

    await page.$eval(
      'body',
      (body, backgroundColor) => {
        body.style.background = backgroundColor;
      },
      option.backgroundColor ?? 'white',
    );

    if (option.imageFormat === 'svg') {
      // this source code from [mermaid-cli](https://github.com/mermaidjs/mermaid.cli/blob/46185413d75384cd7bceed802d187db6852f5190/index.js#L110)
      const svg = await page.$eval('#mermaid-diagram-container', (container) => container.innerHTML);

      if (svg == null) {
        await del(document.filename);
        throw new Error('invalid image html document template');
      }

      await fs.promises.writeFile(path.join(document.dirname, `${renderData.metadata.name}.svg`), svg);
      consola.debug('file write end');

      await del(document.filename);
      consola.info(`Component ER diagram successfully write on ${renderData.metadata.name}.svg`);

      return [path.join(document.dirname, `${renderData.metadata.name}.svg`)];
    }

    // this source code from [mermaid-cli](https://github.com/mermaidjs/mermaid.cli/blob/46185413d75384cd7bceed802d187db6852f5190/index.js#L113-L117)
    const clip = await page.$eval('svg', (htmlSvgElement: any) => {
      const react = htmlSvgElement.getBoundingClientRect();
      return { x: react.left, y: react.top, width: react.width, height: react.height };
    });

    await page.screenshot({
      path: path.join(document.dirname, `${renderData.metadata.name}.png`),
      clip,
      omitBackground: false,
    });

    consola.debug('file write end');

    await del(document.filename);
    consola.info(`Component ER diagram successfully write on ${renderData.metadata.name}.png`);

    return [path.join(document.dirname, `${renderData.metadata.name}.png`)];
  } catch (caught) {
    const err = isError(caught, new Error('unknown error raised from writeToImage'));

    consola.error(err.message);
    consola.error(err.stack);

    return false;
  } finally {
    consola.debug('Start page, brower close');

    if (localPage !== undefined && localPage !== null) {
      await localPage.close();
    }

    if (localBrowser !== undefined && localBrowser !== null) {
      await localBrowser.close();
    }
  }
}
