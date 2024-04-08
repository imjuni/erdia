import type { IBuildCommandOption } from '#/configs/interfaces/IBuildCommandOption';
import { building } from '#/modules/commands/building';
import { container } from '#/modules/containers/container';
import { SymbolLogger } from '#/modules/containers/keys/SymbolLogger';
import type { Logger } from '#/modules/loggers/Logger';
import { showLogo } from '@maeum/cli-logo';
import { LogLevels } from 'consola';

export async function buildDocumentCommandHandler(option: IBuildCommandOption) {
  const logger = container.resolve<Logger>(SymbolLogger);

  logger.level = LogLevels.info;
  logger.enable = true;

  if (option.showLogo != null) {
    await showLogo({
      message: 'erdia',
      figlet: { font: 'ANSI Shadow', width: 80 },
      color: 'cyan',
    });
  } else {
    logger.info('erdia build start');
  }

  await building(option);
}
