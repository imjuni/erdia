import { CE_DEFAULT_VALUE } from '#/configs/const-enum/CE_DEFAULT_VALUE';
import type { IDocumentOption } from '#/configs/interfaces/IDocumentOption';
import { betterMkdir } from '#/modules/files/betterMkdir';
import { isFalse } from 'my-easy-fp';
import { exists, getDirname, isDirectory } from 'my-node-fp';
import pathe from 'pathe';

export async function getTemplateDirPath(option: Pick<IDocumentOption, 'templatePath'>, cwd: string) {
  const templateDirPath = pathe.join(option.templatePath ?? pathe.join(cwd, CE_DEFAULT_VALUE.TEMPLATES_PATH));
  const resolvedTemplateDirPath = pathe.resolve(templateDirPath);

  if (isFalse(await exists(resolvedTemplateDirPath))) {
    await betterMkdir(pathe.join(resolvedTemplateDirPath));
    return resolvedTemplateDirPath;
  }

  if (isFalse(await isDirectory(templateDirPath))) {
    return pathe.resolve(await getDirname(templateDirPath));
  }

  return pathe.resolve(templateDirPath);
}
