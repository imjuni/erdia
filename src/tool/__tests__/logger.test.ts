import logger from '@tool/logger';
import 'jest';

test('logger', () => {
  try {
    const log = logger();
    log.level = 'debug';

    log.trace('trace');
    log.info('info');
    log.verbose('verbose');
    log.warn('warn');
    log.debug('debug');
    log.error('error');
  } catch (err) {
    expect(err).toBeFalsy();
  }
});
