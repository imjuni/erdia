import fs from "node:fs";

import { parse } from "jsonc-parser";
import { exists } from "my-node-fp";
import type puppeteer from "puppeteer";

export const getPuppeteerConfig = async (
  confgFilePath?: string,
): Promise<Parameters<typeof puppeteer.launch>[0]> => {
  try {
    if (confgFilePath === null || confgFilePath === undefined) {
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
};
