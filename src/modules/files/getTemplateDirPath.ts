import { isFalse } from "my-easy-fp";
import { exists, getDirname, isDirectory } from "my-node-fp";
import { join, resolve } from "pathe";

import { CE_DEFAULT_VALUE } from "#/configs/const-enum/CE_DEFAULT_VALUE";
import type { IDocumentOption } from "#/configs/interfaces/IDocumentOption";
import { betterMkdir } from "#/modules/files/betterMkdir";

export const getTemplateDirPath = async (
  option: Pick<IDocumentOption, "templatePath">,
  cwd: string
) => {
  const templateDirPath = join(
    option.templatePath ?? join(cwd, CE_DEFAULT_VALUE.TEMPLATES_PATH)
  );
  const resolvedTemplateDirPath = resolve(templateDirPath);
  if (isFalse(await exists(resolvedTemplateDirPath))) {
    await betterMkdir(join(resolvedTemplateDirPath));
    return resolvedTemplateDirPath;
  }
  if (isFalse(await isDirectory(templateDirPath))) {
    return resolve(await getDirname(templateDirPath));
  }
  return resolve(templateDirPath);
};
