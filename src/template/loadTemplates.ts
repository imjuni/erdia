import type IDocumentOption from '#/configs/interfaces/IDocumentOption';
import defaultTemplates from '#/template/defaultTemplates';
import fs from 'fs';
import globby from 'globby';
import { isTrue } from 'my-easy-fp';
import { exists } from 'my-node-fp';
import path from 'node:path';

const templates: Record<string, string> = { ...defaultTemplates };

export function getTemplate(template: string) {
  return templates[template];
}

export function getTemplates() {
  return templates;
}

export async function loadTemplates(option: Pick<IDocumentOption, 'templatePath'>) {
  const { templatePath } = option;

  if (templatePath == null) {
    return true;
  }

  const resolvedTemplateFilePath = path.resolve(templatePath);
  const [htmlTemplateFiles, markdownTemplateFiles, imageTemplateFiles, pdfTemplateFiles, mermaidTemplateFiles] =
    await Promise.all([
      globby(['**/*'], {
        cwd: path.join(resolvedTemplateFilePath, 'html'),
        onlyFiles: true,
        gitignore: true,
        dot: true,
      }),

      globby(['**/*'], {
        cwd: path.join(resolvedTemplateFilePath, 'markdown'),
        onlyFiles: true,
        gitignore: true,
        dot: true,
      }),

      globby(['**/*'], {
        cwd: path.join(resolvedTemplateFilePath, 'image'),
        onlyFiles: true,
        gitignore: true,
        dot: true,
      }),

      globby(['**/*'], {
        cwd: path.join(resolvedTemplateFilePath, 'pdf'),
        onlyFiles: true,
        gitignore: true,
        dot: true,
      }),

      globby(['**/*'], {
        cwd: path.join(resolvedTemplateFilePath, 'mermaid'),
        onlyFiles: true,
        gitignore: true,
        dot: true,
      }),
    ]);

  const templateFiles = [
    htmlTemplateFiles.map((filePath) => path.join(resolvedTemplateFilePath, 'html', filePath)),
    markdownTemplateFiles.map((filePath) => path.join(resolvedTemplateFilePath, 'markdown', filePath)),
    imageTemplateFiles.map((filePath) => path.join(resolvedTemplateFilePath, 'image', filePath)),
    pdfTemplateFiles.map((filePath) => path.join(resolvedTemplateFilePath, 'pdf', filePath)),
    mermaidTemplateFiles.map((filePath) => path.join(resolvedTemplateFilePath, 'mermaid', filePath)),
  ].flat();

  const loadedTemplateFiles = (
    await Promise.all(
      templateFiles.map(async (templateFilePath) => {
        if (isTrue(await exists(templateFilePath))) {
          const buf = await fs.promises.readFile(templateFilePath);
          const relative = path.relative(resolvedTemplateFilePath, templateFilePath).replace(`.${path.sep}`, '');
          templates[relative] = buf.toString();

          return { key: relative, content: buf.toString() };
        }

        return undefined;
      }),
    )
  ).filter((template): template is { key: string; content: string } => template != null);

  loadedTemplateFiles.forEach((templateFile) => {
    templates[templateFile.key] = templateFile.content;
  });

  return true;
}
