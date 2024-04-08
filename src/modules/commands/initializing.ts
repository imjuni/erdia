import { CE_DEFAULT_VALUE } from '#/configs/const-enum/CE_DEFAULT_VALUE';
import { getConfigContent } from '#/configs/modules/getConfigContent';
import { applyPrettier } from '#/creators/applyPretter';
import { container } from '#/modules/containers/container';
import { SymbolLogger } from '#/modules/containers/keys/SymbolLogger';
import { SymbolTemplateRenderer } from '#/modules/containers/keys/SymbolTemplateRenderer';
import type { Logger } from '#/modules/loggers/Logger';
import { createLogger } from '#/modules/loggers/createLogger';
import { TemplateRenderer } from '#/templates/TemplateRenderer';
import { loadTemplates } from '#/templates/modules/loadTemplates';
import { asValue } from 'awilix';
import fs from 'fs';
import { isError } from 'my-easy-fp';

export async function initializing() {
  createLogger();
  const logger = container.resolve<Logger>(SymbolLogger);

  try {
    const templates = await loadTemplates();
    const renderer = new TemplateRenderer(templates.template, templates.default);

    container.register(SymbolTemplateRenderer, asValue(renderer));

    const rawConfig = await getConfigContent();
    const prettiered = await applyPrettier(rawConfig, 'json');

    await fs.promises.writeFile(CE_DEFAULT_VALUE.CONFIG_FILE_NAME, prettiered);
    logger.info(`${CE_DEFAULT_VALUE.CONFIG_FILE_NAME} file created`);

    return rawConfig;
  } catch (caught) {
    const err = isError(caught, new Error('unknown error raised from createHtmlDocCommand'));
    logger.error(err);

    return undefined;
  }
}
