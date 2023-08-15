import templates from '#template/defaultTemplates';
import consola from 'consola';
import { compile } from 'ejs';
import { isError } from 'my-easy-fp';

function getTemplate(name: string): string {
  const template = templates[name];

  if (template == null) {
    return '';
  }

  return template;
}

export default async function evaluateTemplate<T extends object>(name: string, data: T) {
  try {
    const template = getTemplate(name);
    const renderer = compile(template, {
      includer: (op, _pp) => ({ template: getTemplate(op) }),
    });

    const rendered = renderer(data);
    return rendered;
  } catch (caught) {
    const err = isError(caught, new Error('raise error from evaluateTemplate'));
    consola.error(`template: ${name}`, data);
    consola.error(err.message);
    consola.error(err.stack);
    return '';
  }
}
