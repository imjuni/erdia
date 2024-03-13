import consola from 'consola';
import { isError } from 'my-easy-fp';

export async function applyPrettier(
  document: string,
  format: 'html' | 'md' | 'json',
  configPath?: string,
): Promise<string> {
  try {
    const prettier = (await import('prettier')).default;
    const prettierConfig = await prettier.resolveConfig(configPath ?? '.');

    const formatted = await prettier.format(document, {
      ...(prettierConfig ?? {}),
      parser: format === 'md' ? 'markdown' : format,
    });

    return formatted;
  } catch (caught) {
    const err = isError(caught, new Error('unknown error raised from prettier appling function'));

    consola.error(err.message);
    consola.error(err.stack);

    return document;
  }
}
