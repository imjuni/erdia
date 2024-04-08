import { initializing } from '#/modules/commands/initializing';
import { container } from '#/modules/containers/container';
import { SymbolLogger } from '#/modules/containers/keys/SymbolLogger';
import type { Logger } from '#/modules/loggers/Logger';
import { LogLevels } from 'consola';

export async function initConfigCommandHandler() {
  const logger = container.resolve<Logger>(SymbolLogger);

  logger.level = LogLevels.info;
  logger.enable = true;

  const configFilePath = await initializing();
  return configFilePath;
}
