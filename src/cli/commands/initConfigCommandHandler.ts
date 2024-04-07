import { CE_DEFAULT_VALUE } from '#/configs/const-enum/CE_DEFAULT_VALUE';
import { getConfigContent } from '#/configs/modules/getConfigContent';
import { applyPrettier } from '#/creators/applyPretter';
import { container } from '#/modules/containers/container';
import { SymbolTemplateRenderer } from '#/modules/containers/keys/SymbolTemplateRenderer';
import { TemplateRenderer } from '#/templates/TemplateRenderer';
import { loadTemplates } from '#/templates/modules/loadTemplates';
import { asValue } from 'awilix';
import consola from 'consola';
import fs from 'fs';

export async function initConfigCommandHandler() {
  const templates = await loadTemplates();
  const renderer = new TemplateRenderer(templates.template, templates.default);

  container.register(SymbolTemplateRenderer, asValue(renderer));

  const rawConfig = await getConfigContent();
  const prettiered = await applyPrettier(rawConfig, 'json');

  await fs.promises.writeFile(CE_DEFAULT_VALUE.CONFIG_FILE_NAME, prettiered);
  consola.info(`${CE_DEFAULT_VALUE.CONFIG_FILE_NAME} file created`);

  return rawConfig;
}
