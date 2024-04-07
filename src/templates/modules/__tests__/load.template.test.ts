import { loadTemplates } from '#/templates/modules/loadTemplates';
import pathe from 'pathe';
import { describe, expect, it } from 'vitest';

const templateDirPath = pathe.join(process.cwd(), 'templates');

describe('loadTemplates', () => {
  it('successfully template files loading', async () => {
    const template = await loadTemplates({ templatePath: templateDirPath });
    expect(template.default.size).toEqual(template.template.size);
  });

  it('not set template files directory', async () => {
    const template = await loadTemplates({ templatePath: undefined });
    expect(template.default.size).toEqual(template.template.size);
  });
});
