import { CE_DEFAULT_VALUE } from '#/configs/const-enum/CE_DEFAULT_VALUE';
import type { ICommonOption } from '#/configs/interfaces/ICommonOption';
import { getCwd } from '#/configs/modules/getCwd';
import { betterMkdir } from '#/modules/files/betterMkdir';
import { getGlobFiles } from '#/modules/files/getGlobFiles';
import { getOutputDirectory } from '#/modules/files/getOutputDirectory';
import { defaultExclude } from '#/modules/scopes/defaultExclude';
import { getTemplatePath } from '#/templates/modules/getTemplatePath';
import { showLogo } from '@maeum/cli-logo';
import consola from 'consola';
import fs from 'fs';
import { Glob } from 'glob';
import { getDirname } from 'my-node-fp';
import pathe from 'pathe';

export async function templateEjectCommandHandler(option: Pick<ICommonOption, 'output' | 'showLogo'>) {
  if (option.showLogo != null) {
    await showLogo({
      message: 'erdia',
      figlet: { font: 'ANSI Shadow', width: 80 },
      color: 'cyan',
    });
  } else {
    consola.info('erdia build start');
  }

  const outputDir = await getOutputDirectory(option, getCwd(process.env));
  const originTemplateDirPath = await getTemplatePath(CE_DEFAULT_VALUE.TEMPLATES_PATH);
  const targetTemplateDirPath = pathe.join(outputDir, '__templates');

  consola.info('Output directory: ', targetTemplateDirPath);

  const originTemplateGlobPaths = new Glob(pathe.join(originTemplateDirPath, `**`, '*.eta'), {
    absolute: true,
    ignore: defaultExclude,
    cwd: originTemplateDirPath,
    windowsPathsNoEscape: true,
  });
  const originTemplateFilePaths = getGlobFiles(originTemplateGlobPaths);

  await Promise.all(
    originTemplateFilePaths.map(async (originTemplateFilePath) => {
      const subDirPath = await getDirname(originTemplateFilePath);
      const subFilePath = originTemplateFilePath.replace(subDirPath, '');
      const targetTemplateSubDirPath = pathe.join(targetTemplateDirPath, subDirPath);

      await betterMkdir(targetTemplateSubDirPath);

      const templateFileBuf = await fs.promises.readFile(originTemplateFilePath);
      await fs.promises.writeFile(pathe.join(subFilePath, subFilePath), templateFileBuf);
    }),
  );

  consola.success('eject success: ', targetTemplateDirPath);

  return targetTemplateDirPath;
}
