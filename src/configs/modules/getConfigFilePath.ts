import { CE_DEFAULT_VALUE } from '#configs/const-enum/CE_DEFAULT_VALUE';
import getCwd from '#configs/modules/getCwd';
import * as findUp from 'find-up';
import { getDirnameSync } from 'my-node-fp';

export default function getConfigFilePath(argv: Record<string, unknown>, projectPath?: string) {
  const argvConfigFilePath = (argv.c ?? argv.config) as string | undefined;
  const projectDirPath = projectPath != null ? getDirnameSync(projectPath) : undefined;

  const configFilePathSearchResultOnCwd = findUp.sync(CE_DEFAULT_VALUE.CONFIG_FILE_NAME, { cwd: getCwd(process.env) });
  const configFilePathSearchProjectDirPath =
    projectDirPath != null ? findUp.sync(CE_DEFAULT_VALUE.CONFIG_FILE_NAME, { cwd: projectDirPath }) : undefined;

  return argvConfigFilePath ?? configFilePathSearchResultOnCwd ?? configFilePathSearchProjectDirPath;
}
