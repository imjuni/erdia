import { CE_DEFAULT_VALUE } from '#/configs/const-enum/CE_DEFAULT_VALUE';
import getCwd from '#/configs/modules/getCwd';
import * as findUp from 'find-up';

export default function getConfigFilePath(argv: Record<string, unknown>) {
  const configFilePathSearchResultOnCwd = findUp.sync(CE_DEFAULT_VALUE.CONFIG_FILE_NAME, { cwd: getCwd(process.env) });

  const getConfigValue = () => {
    if (typeof argv.c === 'string' && argv.c !== '') {
      return argv.c;
    }

    if (typeof argv.config === 'string' && argv.config !== '') {
      return argv.config;
    }

    return undefined;
  };

  return getConfigValue() ?? configFilePathSearchResultOnCwd;
}
