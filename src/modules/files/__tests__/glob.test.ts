import { Glob } from "glob";
import { join } from "pathe";
import { describe, expect, it } from "vitest";

import { getGlobFiles } from "#/modules/files/getGlobFiles";
import { defaultExclude } from "#/modules/scopes/defaultExclude";

describe("getGlobFiles", () => {
  it("string type search result", () => {
    const resolvedTemplatePath = join(process.cwd(), "templates", "html");
    const globs = new Glob(join(resolvedTemplatePath, `**`, "*.eta"), {
      absolute: true,
      ignore: defaultExclude,
      cwd: resolvedTemplatePath,
      windowsPathsNoEscape: true,
    });

    const files = getGlobFiles(globs);

    expect(files).toEqual([
      join(process.cwd(), "templates/html/table.eta"),
      join(process.cwd(), "templates/html/style.eta"),
      join(process.cwd(), "templates/html/mermaid.eta"),
      join(process.cwd(), "templates/html/mermaid-toc.eta"),
      join(process.cwd(), "templates/html/mermaid-diagram.eta"),
      join(process.cwd(), "templates/html/document.eta"),
      join(process.cwd(), "templates/html/document-toc.eta"),
    ]);
  });

  it("stat type search result", () => {
    const resolvedTemplatePath = join(process.cwd(), "templates", "html");
    const globs = new Glob(join(resolvedTemplatePath, `**`, "*.eta"), {
      ignore: defaultExclude,
      cwd: resolvedTemplatePath,
      windowsPathsNoEscape: true,
      // stat, withFileTypes option both set `true`, node-glob return Path object
      stat: true,
      withFileTypes: true,
    });

    const files = getGlobFiles(globs);

    expect(files).toEqual([
      join(process.cwd(), "templates/html/table.eta"),
      join(process.cwd(), "templates/html/style.eta"),
      join(process.cwd(), "templates/html/mermaid.eta"),
      join(process.cwd(), "templates/html/mermaid-toc.eta"),
      join(process.cwd(), "templates/html/mermaid-diagram.eta"),
      join(process.cwd(), "templates/html/document.eta"),
      join(process.cwd(), "templates/html/document-toc.eta"),
    ]);
  });
});
