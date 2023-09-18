import { getTemplates } from '#/template/loadTemplates';
import consola from 'consola';
import { Eta } from 'eta';
import { isError } from 'my-easy-fp';

const eta = new Eta({ views: 'erdia' });
eta.resolvePath = (templatePath: string) => templatePath;
eta.readFile = (templatePath: string) => getTemplates()[templatePath];

export default async function evaluateTemplate<T extends object>(name: string, data: T) {
  try {
    const rendered = eta.render(name, data);
    return rendered;
  } catch (caught) {
    const err = isError(caught, new Error('raise error from evaluateTemplate'));
    consola.error(`template: ${name}`, data);
    consola.error(err);
    throw err;
  }
}
