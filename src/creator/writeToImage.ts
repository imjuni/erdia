import IErdiaImageOption from '@config/interface/IErdiaImageOption';
import htmlMermaidTemplate from '@template/htmlMermaidTemplate';
import htmlTemplate from '@template/htmlTemplate';
import getFilename from '@tool/getFilename';
import getPuppeteerConfig from '@tool/getPuppeteerConfig';
import logger from '@tool/logger';
import del from 'del';
import fs from 'fs';
import { isEmpty, isError } from 'my-easy-fp';
import path from 'path';
import puppeteer from 'puppeteer';
import applyPrettier from './applyPretter';

const log = logger();

export default async function writeToImage(
  option: Omit<IErdiaImageOption, 'output'> & { output: Required<IErdiaImageOption>['output'] },
  diagram: string,
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

    const filename = option.output.at(0);
    page.setViewport({ width: option.viewportWidth ?? 1280, height: option.viewportHeight ?? 720 * 2 });

    if (isEmpty(filename)) {
      throw new Error(`invalid output filename: ${filename}`);
    }

    const document = await applyPrettier(htmlTemplate('', htmlMermaidTemplate(diagram, false, option)), 'html');

    const htmlFilename = getFilename(filename, undefined, 'html');
    const imageFileName = getFilename(filename, undefined, option.imageFormat);

    await fs.promises.writeFile(htmlFilename, document);
    await page.goto(`file://${path.join(process.cwd(), htmlFilename)}`, puppeteerGotoOption);

    log.debug(`file write start: ${imageFileName}`);

    if (option.imageFormat === 'svg') {
      // this source code from [mermaid-cli](https://github.com/mermaidjs/mermaid.cli/blob/46185413d75384cd7bceed802d187db6852f5190/index.js#L110)
      const svg = await page.$eval('#mermaid-box', (container) => container.innerHTML);
      await fs.promises.writeFile(imageFileName, svg);

      log.debug('file write end');
    } else {
      // this source code from [mermaid-cli](https://github.com/mermaidjs/mermaid.cli/blob/46185413d75384cd7bceed802d187db6852f5190/index.js#L113-L117)
      const clip = await page.$eval('svg', (htmlSvgElement: any) => {
        const react = htmlSvgElement.getBoundingClientRect();
        return { x: react.left, y: react.top, width: react.width, height: react.height };
      });

      await page.screenshot({ path: imageFileName, clip, omitBackground: false });

      log.debug('file write end');
    }

    await del(htmlFilename);

    log.info(`Component er will be write on ${imageFileName}`);

    return false;
  } catch (catched) {
    const err = isError(catched) ?? new Error('unknown error raised from writeToImage');

    log.error(err.message);
    log.error(err.stack);

    return false;
  } finally {
    log.debug('Start page, brower close');

    if (localPage !== undefined && localPage !== null) {
      await localPage.close();
    }

    if (localBrowser !== undefined && localBrowser !== null) {
      await localBrowser.close();
    }
  }
}
