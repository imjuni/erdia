import type { IBuildCommandOption } from '#/configs/interfaces/IBuildCommandOption';
import { betterMkdir } from '#/modules/files/betterMkdir';
import { isFalse } from 'my-easy-fp';
import { exists, getDirname, isDirectory } from 'my-node-fp';
import pathe from 'pathe';

export async function getOutputDirPath(option: Pick<IBuildCommandOption, 'output'>, cwd: string) {
  const outputDirPath = option.output ?? cwd;
  const resolvedOutputDirPath = pathe.resolve(outputDirPath);

  if (isFalse(await exists(resolvedOutputDirPath))) {
    await betterMkdir(pathe.join(resolvedOutputDirPath));
    return resolvedOutputDirPath;
  }

  if (isFalse(await isDirectory(outputDirPath))) {
    return pathe.resolve(await getDirname(outputDirPath));
  }

  return pathe.resolve(outputDirPath);
}
