import { exists } from "my-node-fp";
import { join, resolve } from "pathe";

import { CE_DEFAULT_VALUE } from "#/configs/const-enum/CE_DEFAULT_VALUE";

export const getTemplateModulePath = async (
  templatePathParam?: string
): Promise<string> => {
  // oxlint-disable-next-line unicorn/prefer-module -- The published Node 18 CommonJS build requires __dirname.
  const currentFilePath = resolve(__dirname);
  if (templatePathParam !== null && templatePathParam !== undefined) {
    const currentWithTemplatePath = resolve(
      join(currentFilePath, templatePathParam)
    );
    if (await exists(currentWithTemplatePath)) {
      return currentWithTemplatePath;
    }
  }
  const packageRootTemplatePath = resolve(
    join(currentFilePath, "..", "..", "..", CE_DEFAULT_VALUE.TEMPLATES_PATH)
  );
  if (await exists(packageRootTemplatePath)) {
    return packageRootTemplatePath;
  }
  const distTemplatePath = resolve(
    join(currentFilePath, "..", "..", CE_DEFAULT_VALUE.TEMPLATES_PATH)
  );
  if (await exists(distTemplatePath)) {
    return distTemplatePath;
  }
  throw new Error("cannot found template directory!");
};
