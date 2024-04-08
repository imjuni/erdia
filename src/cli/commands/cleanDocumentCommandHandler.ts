import type { ICommonOption } from '#/configs/interfaces/ICommonOption';
import { cleaning } from '#/modules/commands/cleaning';
import { container } from '#/modules/containers/container';
import { SymbolLogger } from '#/modules/containers/keys/SymbolLogger';
import type { Logger } from '#/modules/loggers/Logger';
import { showLogo } from '@maeum/cli-logo';
import consola, { LogLevels } from 'consola';

export async function cleanDocumentCommandHandler(option: ICommonOption) {
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
    consola.info('erdia build start');
  }

  await cleaning(option);
}
