import { CE_DEFAULT_VALUE } from '#configs/const-enum/CE_DEFAULT_VALUE';
import type IBuildCommandOption from '#configs/interfaces/IBuildCommandOption';
import getConfigFilePath from '#configs/modules/getConfigFilePath';
import consola from 'consola';
import * as findUp from 'find-up';
import { parse } from 'jsonc-parser';
import minimist from 'minimist';
import * as fs from 'node:fs';

export default function preLoadConfig() {
  try {
    const argv = minimist(process.argv.slice(2));

    const tsconfigPath =
      argv.project != null || argv.p != null
        ? findUp.sync([argv.project, argv.p])
        : findUp.sync(CE_DEFAULT_VALUE.TSCONFIG_FILE_NAME);

    const configFilePath = getConfigFilePath(argv, tsconfigPath);

    const readConfigFile = () => {
      if (configFilePath != null) {
        const buf = fs.readFileSync(configFilePath);
        const parsed = parse(buf.toString()) as IBuildCommandOption;
        return parsed;
      }

      return { project: undefined };
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
