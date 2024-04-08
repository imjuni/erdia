import consola, { LogLevel, type InputLogObject, type LogType } from 'consola';

export class Logger {
  #enable: boolean;

  get enable() {
    return this.#enable;
  }

  set enable(value) {
    this.#enable = value;
  }

  constructor() {
    this.#enable = false;
  }

  get level() {
    return consola.level;
  }

  set level(level: LogLevel) {
    consola.level = level;
  }

  logging(level: LogType, message: InputLogObject | any, ...args: any[]) {
    if (this.#enable) {
      consola[level](message, ...args);
    }
  }

  info = this.logging.bind(this, 'info');

  warn = this.logging.bind(this, 'warn');

  silent = this.logging.bind(this, 'silent');

  error = this.logging.bind(this, 'error');

  success = this.logging.bind(this, 'success');

  fail = this.logging.bind(this, 'fail');

  fatal = this.logging.bind(this, 'fatal');

  debug = this.logging.bind(this, 'debug');

  trace = this.logging.bind(this, 'trace');

  verbose = this.logging.bind(this, 'verbose');

  ready = this.logging.bind(this, 'ready');

  box = this.logging.bind(this, 'box');

  log = this.logging.bind(this, 'log');
}
