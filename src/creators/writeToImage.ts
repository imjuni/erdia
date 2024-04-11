/* eslint-disable no-param-reassign, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any */
import type { IBuildCommandOption } from '#/configs/interfaces/IBuildCommandOption';
import type { getRenderData } from '#/creators/getRenderData';
import type { IErdiaDocument } from '#/creators/interfaces/IErdiaDocument';
import { betterMkdir } from '#/modules/files/betterMkdir';
import { getPuppeteerConfig } from '#/modules/getPuppeteerConfig';
import consola from 'consola';
import del from 'del';
import { isError } from 'my-easy-fp';
import fs from 'node:fs';
import pathe from 'pathe';
import * as puppeteer from 'puppeteer';
import type { AsyncReturnType } from 'type-fest';

export async function writeToImage(
  document: IErdiaDocument,
  option: Pick<
    IBuildCommandOption,
    'output' | 'components' | 'prettierConfig' | 'viewportWidth' | 'viewportHeight' | 'backgroundColor' | 'imageFormat'
  >,
  renderData: AsyncReturnType<typeof getRenderData>,
) {
  let localBrowser: puppeteer.Browser | undefined;
  let localPage: puppeteer.Page | undefined;

  try {
    const puppeteerConfig = await getPuppeteerConfig(option.prettierConfig);
    const browser = await puppeteer.launch({ ...puppeteerConfig, headless: true });
    const page = await browser.newPage();
    const puppeteerGotoOption: Parameters<typeof page.goto>[1] = {
      waitUntil: 'domcontentloaded',
      timeout: 60_000,
    };

    localBrowser = browser;
    localPage = page;

    await betterMkdir(document.filename);
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

      await fs.promises.writeFile(pathe.join(document.dirname, `${renderData.metadata.name}.svg`), svg);
      consola.debug('file write end');

      await del(document.filename);
      consola.info(`Component ER diagram successfully write on ${renderData.metadata.name}.svg`);

      return [pathe.join(document.dirname, `${renderData.metadata.name}.svg`)];
    }

    // this source code from [mermaid-cli](https://github.com/mermaidjs/mermaid.cli/blob/46185413d75384cd7bceed802d187db6852f5190/index.js#L113-L117)
    const clip = await page.$eval('svg', (htmlSvgElement: any) => {
      const react = htmlSvgElement.getBoundingClientRect();
      return { x: react.left, y: react.top, width: react.width, height: react.height };
    });

    await page.screenshot({
      path: pathe.join(document.dirname, `${renderData.metadata.name}.png`),
      clip,
      omitBackground: false,
    });

    consola.debug('file write end');

    await del(document.filename);
    consola.info(`Component ER diagram successfully write on ${renderData.metadata.name}.png`);

    return [pathe.join(document.dirname, `${renderData.metadata.name}.png`)];
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
