import consola from 'consola';
import { parse } from 'jsonc-parser';
import minimist from 'minimist';
import * as fs from 'node:fs';
import type IBuildCommandOption from 'src/configs/interfaces/IBuildCommandOption';
import getConfigFilePath from 'src/configs/modules/getConfigFilePath';

export default function preLoadConfig() {
  try {
    const argv = minimist(process.argv.slice(2));
    const configFilePath = getConfigFilePath(argv);

    const readConfigFile = () => {
      if (configFilePath != null) {
        const buf = fs.readFileSync(configFilePath);
        const parsed = parse(buf.toString()) as IBuildCommandOption;
        return parsed;
      }

      return { 'data-source-path': undefined };
    };

    const config = readConfigFile();

    return {
      ...config,
      c: configFilePath,
      config: configFilePath,
    };
  } catch (caught) {
    const err = caught instanceof Error ? caught : new Error('unknown error raised');

    consola.error(err);
    consola.error(err.stack);

    return {};
  }
}
