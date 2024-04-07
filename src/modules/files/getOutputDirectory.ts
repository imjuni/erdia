import type { IBuildCommandOption } from '#/configs/interfaces/IBuildCommandOption';
import { betterMkdir } from '#/modules/files/betterMkdir';
import { isFalse } from 'my-easy-fp';
import { exists, getDirname, isDirectory } from 'my-node-fp';
import pathe from 'pathe';

export async function getOutputDirectory(option: Pick<IBuildCommandOption, 'output'>, cwd: string) {
  const output = option.output ?? cwd;

  if (isFalse(await exists(output))) {
    await betterMkdir(output);
    return pathe.resolve(output);
  }

  if (isFalse(await isDirectory(output))) {
    return pathe.resolve(await getDirname(output));
  }

  return pathe.resolve(output);
}
