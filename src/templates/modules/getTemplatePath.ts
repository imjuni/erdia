import { exists } from "my-node-fp";
import { resolve } from "pathe";

import { getTemplateModulePath } from "#/templates/modules/getTemplateModulePath";

export const getTemplatePath = async (templatePathParam?: string): Promise<string> => {
  if (
    templatePathParam !== null &&
    templatePathParam !== undefined &&
    (await exists(resolve(templatePathParam)))
  ) {
    return resolve(templatePathParam);
  }
  return getTemplateModulePath(templatePathParam);
};
