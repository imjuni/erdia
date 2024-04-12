import { CE_DEFAULT_VALUE } from '#/configs/const-enum/CE_DEFAULT_VALUE';
import type { ICommonOption } from '#/configs/interfaces/ICommonOption';
import type { IDocumentOption } from '#/configs/interfaces/IDocumentOption';
import { getCwd } from '#/configs/modules/getCwd';
import { container } from '#/modules/containers/container';
import { SymbolLogger } from '#/modules/containers/keys/SymbolLogger';
import { betterMkdir } from '#/modules/files/betterMkdir';
import { getGlobFiles } from '#/modules/files/getGlobFiles';
import { getTemplateDirPath } from '#/modules/files/getTemplateDirPath';
import type { Logger } from '#/modules/loggers/Logger';
import { createLogger } from '#/modules/loggers/createLogger';
import { defaultExclude } from '#/modules/scopes/defaultExclude';
import { getTemplateModulePath } from '#/templates/modules/getTemplateModulePath';
import { Glob } from 'glob';
import { isError } from 'my-easy-fp';
import { getDirname, startSepRemove } from 'my-node-fp';
import fs from 'node:fs';
import pathe from 'pathe';

export async function ejecting(
  option: Pick<ICommonOption & IDocumentOption, 'showLogo' | 'templatePath'>,
  logging?: boolean,
) {
  createLogger(logging);
  const logger = container.resolve<Logger>(SymbolLogger);

  try {
    const templateDirPath = await getTemplateDirPath(option, getCwd(process.env));
    const originTemplateDirPath = await getTemplateModulePath(CE_DEFAULT_VALUE.TEMPLATES_PATH);
    const targetTemplateDirPath =
      option.templatePath == null ? pathe.join(templateDirPath, CE_DEFAULT_VALUE.TEMPLATES_PATH) : templateDirPath;

    logger.info('Template directory: ', targetTemplateDirPath);

    const originTemplateGlobPaths = new Glob(pathe.join(originTemplateDirPath, `**`, '*.eta'), {
      absolute: true,
      ignore: [...defaultExclude, 'config/**'],
      cwd: originTemplateDirPath,
      windowsPathsNoEscape: true,
    });
    const originTemplateFilePaths = getGlobFiles(originTemplateGlobPaths);

    await Promise.all(
      originTemplateFilePaths.map(async (originTemplateFilePath) => {
        const subDirPath = await getDirname(originTemplateFilePath);
        const subFilePath = startSepRemove(originTemplateFilePath.replace(subDirPath, ''));
        const targetTemplateSubDirPath = pathe.join(
          targetTemplateDirPath,
          startSepRemove(subDirPath.replace(originTemplateDirPath, '')),
        );

        await betterMkdir(targetTemplateSubDirPath);

        const templateFileBuf = await fs.promises.readFile(originTemplateFilePath);
        await fs.promises.writeFile(pathe.join(targetTemplateSubDirPath, subFilePath), templateFileBuf);
      }),
    );

    logger.success('eject success: ', targetTemplateDirPath);

    return targetTemplateDirPath;
  } catch (caught) {
    const err = isError(caught, new Error('unknown error raised from createHtmlDocCommand'));
    logger.error(err);

    return undefined;
  }
}
