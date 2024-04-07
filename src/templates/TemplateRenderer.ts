import consola from 'consola';
import { Eta } from 'eta';
import { isError, orThrow } from 'my-easy-fp';

export class TemplateRenderer {
  #eta: Eta;

  #templates: Map<string, string>;

  #defaultTemplates: Map<string, string>;

  constructor(templates: Map<string, string>, defaultTemplates: Map<string, string>) {
    this.#templates = templates;
    this.#defaultTemplates = defaultTemplates;

    this.#eta = new Eta({ views: 'erdia', autoEscape: false });
    this.#eta.resolvePath = (templatePath: string) => templatePath;
    this.#eta.readFile = (templatePath: string) => {
      const template = this.#templates.get(templatePath) ?? this.#defaultTemplates.get(templatePath);
      return orThrow(template, new Error(`cannot found template: ${templatePath}`));
    };
  }

  async evaluate<T extends object>(name: string, data: T) {
    try {
      const rendered = this.#eta.render(name, data);
      return rendered;
    } catch (caught) {
      const err = isError(caught, new Error(`raise error from evaluateTemplate: ${name}`));
      consola.error(`template: ${name}`, data);
      consola.error(err);
      throw err;
    }
  }
}
