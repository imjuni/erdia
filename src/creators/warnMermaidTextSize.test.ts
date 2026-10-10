import { describe, expect, it, vi } from "vitest";

import type { IRenderData } from "#/databases/interfaces/IRenderData";
import { CE_TEMPLATE_NAME } from "#/templates/cosnt-enum/CE_TEMPLATE_NAME";
import { warnMermaidTextSize } from "#/creators/warnMermaidTextSize";
import type { TemplateRenderer } from "#/templates/TemplateRenderer";

function makeRenderData(components: Array<"er" | "table">): IRenderData {
  return {
    option: { components, format: "html" },
    versions: [{ version: "1.0.0", latest: true, entities: [] }],
    metadata: { name: "sample", version: "1.0.0" },
  } as IRenderData;
}

describe("Mermaid text size warning", () => {
  it("warns only when the generated diagram exceeds Mermaid's default limit", () => {
    const warn = vi.fn();
    const evaluate = vi.fn().mockReturnValue("x".repeat(50_000));
    const renderer = { evaluate } as unknown as TemplateRenderer;

    warnMermaidTextSize(makeRenderData(["er"]), renderer, warn);
    expect(warn).not.toHaveBeenCalled();

    evaluate.mockReturnValue("x".repeat(50_001));
    warnMermaidTextSize(makeRenderData(["er"]), renderer, warn);
    expect(warn).toHaveBeenCalledOnce();
    expect(warn.mock.calls[0][0]).toContain("50001 characters");
    expect(warn.mock.calls[0][0]).toContain("maxTextSize of 50000");
  });

  it("does not render or warn for table-only output", () => {
    const warn = vi.fn();
    const evaluate = vi.fn();
    const renderer = { evaluate } as unknown as TemplateRenderer;

    warnMermaidTextSize(makeRenderData(["table"]), renderer, warn);
    expect(evaluate).not.toHaveBeenCalled();
    expect(warn).not.toHaveBeenCalled();
  });

  it("checks every version for non-HTML output", () => {
    const warn = vi.fn();
    const evaluate = vi.fn().mockReturnValue("x".repeat(50_001));
    const renderer = { evaluate } as unknown as TemplateRenderer;
    const renderData = makeRenderData(["er"]);
    renderData.option.format = "md";
    renderData.versions.push({ version: "0.9.0", latest: false, entities: [] });

    warnMermaidTextSize(renderData, renderer, warn);

    expect(evaluate).toHaveBeenCalledTimes(2);
    expect(evaluate).toHaveBeenCalledWith(
      CE_TEMPLATE_NAME.MARKDOWN_MERMAID_DIAGRAM,
      expect.any(Object),
    );
    expect(warn).toHaveBeenCalledTimes(2);
    expect(warn.mock.calls[1][0]).toContain("version 0.9.0");
  });
});
