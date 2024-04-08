import { Logger } from '#/modules/loggers/Logger';
import { LogLevels } from 'consola';
import { describe, expect, it } from 'vitest';

describe('Logger', () => {
  it('logging message display', () => {
    const logger = new Logger();
    logger.enable = true;

    logger.info('test 01');
    logger.warn('test 02');
    logger.silent('test 03');
    logger.success('test 04');
    logger.fail('test 05');
    logger.fatal('test 06');
    logger.debug('test 07');
    logger.trace('test 08');
    logger.verbose('test 09');
    logger.ready('test 10');
    logger.box('test 11');
    logger.log('test 12');
    logger.error('test 13');
  });

  it('getter/setter', () => {
    const logger = new Logger();

    logger.enable = false;
    logger.level = LogLevels.warn;

    expect(logger.enable).toBeFalsy();
    expect(logger.level).toEqual(LogLevels.warn);
  });
});
