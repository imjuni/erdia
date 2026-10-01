import { join } from "pathe";
import { describe, expect, it } from "vitest";

import { getTemplate } from "#/templates/modules/getTemplate";
import { getTemplates } from "#/templates/modules/getTemplates";

const templateDirPath = join(process.cwd(), "templates");

describe("getTemplate", () => {
  it("successfully template loading", async () => {
    const templateHTMLPath = join(templateDirPath, "html");
    const template = await getTemplate(
      templateHTMLPath,
      join(templateHTMLPath, "document.eta")
    );

    expect(template).toBeDefined();
    expect(template?.key).toBe("document");
  });

  it("failed template loading", async () => {
    const templateCategoryPath = join(templateDirPath, "html");
    const template = await getTemplate(
      templateCategoryPath,
      join(templateCategoryPath, "cannot-found-this-template.eta")
    );

    expect(template).toBeUndefined();
  });
});

describe("getTemplates", () => {
  it("successfully loading html templates", async () => {
    const templateHTMLPath = join(templateDirPath, "html");
    const templates = await getTemplates(templateHTMLPath);

    expect(templates.map((template) => template.key)).toEqual([
      "table",
      "style",
      "mermaid",
      "mermaid-toc",
      "mermaid-diagram",
      "document",
      "document-toc",
    ]);
  });
});
