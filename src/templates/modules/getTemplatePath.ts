import { getTemplateModulePath } from '#/templates/modules/getTemplateModulePath';
import { exists } from 'my-node-fp';
import pathe from 'pathe';

export async function getTemplatePath(templatePathParam?: string): Promise<string> {
  if (templatePathParam != null && (await exists(pathe.resolve(templatePathParam)))) {
    return pathe.resolve(templatePathParam);
  }

  return getTemplateModulePath(templatePathParam);
}
