import { getTemplate } from '#/templates/modules/getTemplate';
import { getTemplates } from '#/templates/modules/getTemplates';
import pathe from 'pathe';
import { describe, expect, it } from 'vitest';

const templateDirPath = pathe.join(process.cwd(), 'templates');

describe('getTemplate', () => {
  it('successfully template loading', async () => {
    const templateHTMLPath = pathe.join(templateDirPath, 'html');
    const template = await getTemplate(templateHTMLPath, pathe.join(templateHTMLPath, 'document.eta'));

    expect(template).toBeDefined();
    expect(template?.key).toBe('document');
  });

  it('failed template loading', async () => {
    const templateCategoryPath = pathe.join(templateDirPath, 'html');
    const template = await getTemplate(
      templateCategoryPath,
      pathe.join(templateCategoryPath, 'cannot-found-this-template.eta'),
    );

    expect(template).toBeUndefined();
  });
});

describe('getTemplates', () => {
  it('successfully loading html templates', async () => {
    const templateHTMLPath = pathe.join(templateDirPath, 'html');
    const templates = await getTemplates(templateHTMLPath);

    expect(templates.map((template) => template.key)).toEqual([
      'table',
      'style',
      'mermaid',
      'mermaid-toc',
      'mermaid-diagram',
      'document',
      'document-toc',
    ]);
  });
});
