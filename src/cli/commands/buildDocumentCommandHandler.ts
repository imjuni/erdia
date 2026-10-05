import { showLogo } from "@maeum/cli-logo";
import { LogLevels } from "consola";

import type { IBuildCommandOption } from "#/configs/interfaces/IBuildCommandOption";
import { building } from "#/modules/commands/building";
import { container } from "#/modules/containers/container";
import { SymbolLogger } from "#/modules/containers/keys/SymbolLogger";
import type { Logger } from "#/modules/loggers/Logger";

export const buildDocumentCommandHandler = async (option: IBuildCommandOption) => {
  const logger = container.resolve<Logger>(SymbolLogger);
  logger.level = LogLevels.info;
  logger.enable = true;
  if (option.showLogo === null || option.showLogo === undefined) {
    logger.info("erdia build start");
  } else {
    await showLogo({
      message: "erdia",
      figlet: { font: "ANSI Shadow", width: 80 },
      color: "cyan",
    });
  }
  const filenames = await building(option);
  if (!Array.isArray(filenames) || filenames.length === 0) {
    logger.warn("No document was generated");
    return;
  }
  for (const filename of filenames) {
    logger.success(`generated: "${filename}"`);
  }
};
