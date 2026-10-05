import { isFalse } from "my-easy-fp";
import { exists, getDirname, isDirectory } from "my-node-fp";
import { join, resolve } from "pathe";

import type { IBuildCommandOption } from "#/configs/interfaces/IBuildCommandOption";
import { betterMkdir } from "#/modules/files/betterMkdir";

export const getOutputDirPath = async (
  option: Pick<IBuildCommandOption, "output">,
  cwd: string,
) => {
  const outputDirPath = option.output ?? cwd;
  const resolvedOutputDirPath = resolve(outputDirPath);
  if (isFalse(await exists(resolvedOutputDirPath))) {
    await betterMkdir(join(resolvedOutputDirPath));
    return resolvedOutputDirPath;
  }
  if (isFalse(await isDirectory(outputDirPath))) {
    return resolve(await getDirname(outputDirPath));
  }
  return resolve(outputDirPath);
};
