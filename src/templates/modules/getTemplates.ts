import { Glob } from "glob";
import type { GlobOptions } from "glob";
import pathe from "pathe";

import { getGlobFiles } from "#/modules/files/getGlobFiles";
import { defaultExclude } from "#/modules/scopes/defaultExclude";
import type { ITemplate } from "#/templates/interfaces/ITemplate";
import { getTemplate } from "#/templates/modules/getTemplate";

export async function getTemplates(templatePath: string, globOptions?: GlobOptions) {
  const resolvedTemplatePath = pathe.resolve(templatePath);

  const globs = new Glob(pathe.join(resolvedTemplatePath, `**`, "*.eta"), {
    ...globOptions,
    absolute: true,
    ignore: defaultExclude,
    cwd: resolvedTemplatePath,
    windowsPathsNoEscape: true,
  });

  const templateFilePaths = getGlobFiles(globs)
    .map((filePath): [string, boolean] => [filePath, true])
    .map(([filePath, _flag]) => filePath);

  const loadedTemplateFiles = (
    await Promise.all(
      templateFilePaths.map(async (templateFilePath) =>
        getTemplate(resolvedTemplatePath, templateFilePath),
      ),
    )
  ).filter((template): template is ITemplate => template != null);

  return loadedTemplateFiles;
}
