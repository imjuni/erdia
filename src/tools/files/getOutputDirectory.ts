import fs from 'fs';
import { isFalse } from 'my-easy-fp';
import { exists, getDirname, isDirectory } from 'my-node-fp';
import path from 'path';
import type IBuildCommandOption from 'src/configs/interfaces/IBuildCommandOption';

export default async function getOutputDirectory(option: Pick<IBuildCommandOption, 'output'>, cwd: string) {
  const output = option.output ?? cwd;

  if (isFalse(await exists(output))) {
    await fs.promises.mkdir(output, { recursive: true });
    return path.resolve(output);
  }

  if (isFalse(await isDirectory(output))) {
    return path.resolve(await getDirname(output));
  }

  return path.resolve(output);
}
