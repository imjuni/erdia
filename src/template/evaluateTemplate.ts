import { getTemplates } from '#template/loadTemplates';
import consola from 'consola';
import { compile } from 'ejs';
import { isError } from 'my-easy-fp';

export default async function evaluateTemplate<T extends object>(name: string, data: T) {
  try {
    const templates = getTemplates();
    const template = templates[name];

    const renderer = compile(template, {
      includer: (op, _pp) => ({ template: templates[op] }),
    });

    const rendered = renderer(data);
    return rendered;
  } catch (caught) {
    const err = isError(caught, new Error('raise error from evaluateTemplate'));
    consola.error(`template: ${name}`, data);
    consola.error(err);
    throw err;
  }
}
