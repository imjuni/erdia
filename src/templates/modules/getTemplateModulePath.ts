import { CE_DEFAULT_VALUE } from '#/configs/const-enum/CE_DEFAULT_VALUE';
import { exists } from 'my-node-fp';
import pathe from 'pathe';

export async function getTemplateModulePath(templatePathParam?: string): Promise<string> {
  const currentFilePath = pathe.resolve(__dirname);

  if (templatePathParam != null) {
    const currentWithTemplatePath = pathe.resolve(pathe.join(currentFilePath, templatePathParam));
    if (await exists(currentWithTemplatePath)) {
      return currentWithTemplatePath;
    }
  }

  const packageRootTemplatePath = pathe.resolve(
    pathe.join(currentFilePath, '..', '..', '..', CE_DEFAULT_VALUE.TEMPLATES_PATH),
  );

  if (await exists(packageRootTemplatePath)) {
    return packageRootTemplatePath;
  }

  const distTemplatePath = pathe.resolve(pathe.join(currentFilePath, '..', '..', CE_DEFAULT_VALUE.TEMPLATES_PATH));
  if (await exists(distTemplatePath)) {
    return distTemplatePath;
  }

  throw new Error('cannot found template directory!');
}
