import fs from 'fs';
import { parse } from 'jsonc-parser';
import { exists } from 'my-node-fp';
import type puppeteer from 'puppeteer';

export async function getPuppeteerConfig(confgFilePath?: string): Promise<Parameters<typeof puppeteer.launch>[0]> {
  try {
    if (confgFilePath == null) {
      return {};
    }

    if (await exists(confgFilePath)) {
      const buf = await fs.promises.readFile(confgFilePath);
      const option = parse(buf.toString()) as Parameters<typeof puppeteer.launch>[0];
      return option;
    }

    return {};
  } catch {
    return {};
  }
}
