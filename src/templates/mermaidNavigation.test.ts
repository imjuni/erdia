import { describe, expect, it } from "vitest";

import { loadTemplates } from "#/templates/modules/loadTemplates";
import { TemplateRenderer } from "#/templates/TemplateRenderer";

const render = async (components: Array<"er" | "table">, routeBasePath?: string) => {
  const templates = await loadTemplates();
  const renderer = new TemplateRenderer(templates.template, templates.default);
  return renderer.evaluate("html-mermaid", {
    metadata: { name: "sample", version: "1.0.0" },
    option: { components, routeBasePath, skipImageInHtml: true, theme: "default" },
    versions: [{ latest: true, entities: [], version: "1.0.0" }],
  });
};

describe("Mermaid navigation", () => {
  it("links to the entity page when both HTML components are generated", async () => {
    const html = await render(["table", "er"]);
    expect(html).toMatch(/href="index\.html"[^>]*>Entity<\/a>/);
    expect(html).toMatch(/href="mermaid\.html"[^>]*>ER Diagram<\/a>/);
  });

  it("omits the entity link when only the diagram is generated", async () => {
    const html = await render(["er"]);
    expect(html).not.toMatch(/>Entity<\/a>/);
    expect(html).toMatch(/href="index\.html"[^>]*>ER Diagram<\/a>/);
  });

  it("uses a configured route prefix for navigation links", async () => {
    const html = await render(["table", "er"], "/docs/");
    expect(html).toMatch(/href="\/docs\/index\.html"[^>]*>Entity<\/a>/);
    expect(html).toMatch(/href="\/docs\/mermaid\.html"[^>]*>ER Diagram<\/a>/);
  });
});
