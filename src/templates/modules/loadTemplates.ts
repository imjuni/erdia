import { CE_DEFAULT_VALUE } from '#/configs/const-enum/CE_DEFAULT_VALUE';
import type { IDocumentOption } from '#/configs/interfaces/IDocumentOption';
import { configTemplate } from '#/templates/modules/configTemplate';
import { getTemplatePath } from '#/templates/modules/getTemplatePath';
import { getTemplates } from '#/templates/modules/getTemplates';
import pathe from 'pathe';

export async function loadTemplates(option?: Pick<IDocumentOption, 'templatePath'>) {
  const defaultTemplatePath = await getTemplatePath(CE_DEFAULT_VALUE.TEMPLATES_PATH);
  const [defaultHtml, defaultMarkdown, defaultImage, defaultPdf] = await Promise.all([
    getTemplates(pathe.join(defaultTemplatePath, 'html'), {}),
    getTemplates(pathe.join(defaultTemplatePath, 'markdown'), {}),
    getTemplates(pathe.join(defaultTemplatePath, 'image'), {}),
    getTemplates(pathe.join(defaultTemplatePath, 'pdf'), {}),
  ]);

  const defaultTemplateMap = new Map<string, string>([
    ['config-json', configTemplate.trim()],
    ...defaultHtml.map((template): [string, string] => [`html-${template.key}`, template.content]),
    ...defaultMarkdown.map((template): [string, string] => [`markdown-${template.key}`, template.content]),
    ...defaultImage.map((template): [string, string] => [`image-${template.key}`, template.content]),
    ...defaultPdf.map((template): [string, string] => [`pdf-${template.key}`, template.content]),
  ]);

  if (option?.templatePath == null) {
    return {
      default: defaultTemplateMap,
      template: defaultTemplateMap,
    };
  }

  const templatePath = await getTemplatePath(option.templatePath);
  const [templateHtml, templateMarkdown, templateImage, templatePdf] = await Promise.all([
    getTemplates(pathe.join(templatePath, 'html'), {}),
    getTemplates(pathe.join(templatePath, 'markdown'), {}),
    getTemplates(pathe.join(templatePath, 'image'), {}),
    getTemplates(pathe.join(templatePath, 'pdf'), {}),
  ]);

  const templateMap = new Map<string, string>([
    ['config-json', configTemplate.trim()],
    ...templateHtml.map((template): [string, string] => [`html-${template.key}`, template.content]),
    ...templateMarkdown.map((template): [string, string] => [`markdown-${template.key}`, template.content]),
    ...templateImage.map((template): [string, string] => [`image-${template.key}`, template.content]),
    ...templatePdf.map((template): [string, string] => [`pdf-${template.key}`, template.content]),
  ]);

  return {
    default: defaultTemplateMap,
    template: templateMap,
  };
}
