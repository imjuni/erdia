import { asValue } from "awilix";

import { container } from "#/modules/containers/container";
import { SymbolLogger } from "#/modules/containers/keys/SymbolLogger";
import { Logger } from "#/modules/loggers/Logger";

export function createLogger(enable?: boolean) {
  if (!container.hasRegistration(SymbolLogger)) {
    const logger = new Logger(enable ?? false);
    container.register(SymbolLogger, asValue(logger));
  }
}
