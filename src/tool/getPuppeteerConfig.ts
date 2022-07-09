import fs from 'fs';
import { parse } from 'jsonc-parser';
import { isEmpty } from 'my-easy-fp';
import { exists } from 'my-node-fp';
import puppeteer from 'puppeteer';

export default async function getPuppeteerConfig(
  confgFilePath?: string,
): Promise<Parameters<typeof puppeteer.launch>[0]> {
  try {
    if (isEmpty(confgFilePath)) {
      return {};
    }

    if (await exists(confgFilePath)) {
      const option = parse((await fs.promises.readFile(confgFilePath)).toString());
      return option;
    }

    return {};
  } catch (catched) {
    return {};
  }
}
