import { readFileSync } from "node:fs";

import consola from "consola";
import { parse } from "jsonc-parser";
import minimist from "minimist";

import type { IBuildCommandOption } from "#/configs/interfaces/IBuildCommandOption";
import { getConfigFilePath } from "#/configs/modules/getConfigFilePath";

export function preLoadConfig() {
  try {
    const argv = minimist(process.argv.slice(2));
    const configFilePath = getConfigFilePath(argv);

    const readConfigFile = () => {
      if (configFilePath != null) {
        const buf = readFileSync(configFilePath);
        const parsed = parse(buf.toString()) as IBuildCommandOption;
        return parsed;
      }

      return { "data-source-path": undefined };
    };

    const config = readConfigFile();

    return {
      ...config,
      c: configFilePath,
      config: configFilePath,
    };
  } catch (error) {
    const err = error instanceof Error ? error : new Error("unknown error raised");

    consola.error(err);
    consola.error(err.stack);

    return {};
  }
}
