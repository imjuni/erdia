import logger from '@tool/logger';
import { isError } from 'my-easy-fp';
import prettier from 'prettier';

const log = logger();

export default async function applyPrettier(document: string, format: 'html' | 'md'): Promise<string> {
  try {
    const prettierConfig = await prettier.resolveConfig('.');

    const formatted = prettier.format(document, {
      ...(prettierConfig ?? {}),
      parser: format === 'md' ? 'markdown' : 'html',
    });

    return formatted;
  } catch (catched) {
    const err = isError(catched) ?? new Error('unknown error raised from applyPrettier function');

    log.error(err.message);
    log.error(err.stack);

    return document;
  }
}
