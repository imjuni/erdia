import { getGlobFiles } from '#/modules/files/getGlobFiles';
import { defaultExclude } from '#/modules/scopes/defaultExclude';
import { Glob } from 'glob';
import pathe from 'pathe';
import { describe, expect, it } from 'vitest';

describe('getGlobFiles', () => {
  it('string type search result', () => {
    const resolvedTemplatePath = pathe.join(process.cwd(), 'templates', 'html');
    const globs = new Glob(pathe.join(resolvedTemplatePath, `**`, '*.eta'), {
      absolute: true,
      ignore: defaultExclude,
      cwd: resolvedTemplatePath,
      windowsPathsNoEscape: true,
    });

    const files = getGlobFiles(globs);

    expect(files).toEqual([
      pathe.join(process.cwd(), 'templates/html/table.eta'),
      pathe.join(process.cwd(), 'templates/html/style.eta'),
      pathe.join(process.cwd(), 'templates/html/mermaid.eta'),
      pathe.join(process.cwd(), 'templates/html/mermaid-toc.eta'),
      pathe.join(process.cwd(), 'templates/html/mermaid-diagram.eta'),
      pathe.join(process.cwd(), 'templates/html/document.eta'),
      pathe.join(process.cwd(), 'templates/html/document-toc.eta'),
    ]);
  });

  it('stat type search result', () => {
    const resolvedTemplatePath = pathe.join(process.cwd(), 'templates', 'html');
    const globs = new Glob(pathe.join(resolvedTemplatePath, `**`, '*.eta'), {
      ignore: defaultExclude,
      cwd: resolvedTemplatePath,
      windowsPathsNoEscape: true,
      // stat, withFileTypes option both set `true`, node-glob return Path object
      stat: true,
      withFileTypes: true,
    });

    const files = getGlobFiles(globs);

    expect(files).toEqual([
      pathe.join(process.cwd(), 'templates/html/table.eta'),
      pathe.join(process.cwd(), 'templates/html/style.eta'),
      pathe.join(process.cwd(), 'templates/html/mermaid.eta'),
      pathe.join(process.cwd(), 'templates/html/mermaid-toc.eta'),
      pathe.join(process.cwd(), 'templates/html/mermaid-diagram.eta'),
      pathe.join(process.cwd(), 'templates/html/document.eta'),
      pathe.join(process.cwd(), 'templates/html/document-toc.eta'),
    ]);
  });
});
