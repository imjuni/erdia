import type { IRenderData } from "#/databases/interfaces/IRenderData";
import { CE_OUTPUT_FORMAT } from "#/configs/const-enum/CE_OUTPUT_FORMAT";
import { CE_OUTPUT_COMPONENT } from "#/configs/const-enum/CE_OUTPUT_COMPONENT";
import { CE_TEMPLATE_NAME } from "#/templates/cosnt-enum/CE_TEMPLATE_NAME";
import type { TemplateRenderer } from "#/templates/TemplateRenderer";

const DEFAULT_MERMAID_MAX_TEXT_SIZE = 50_000;

const diagramTemplates = {
  [CE_OUTPUT_FORMAT.HTML]: CE_TEMPLATE_NAME.HTML_MERMAID_DIAGRAM,
  [CE_OUTPUT_FORMAT.IMAGE]: CE_TEMPLATE_NAME.IMAGE_MERMAID_DIAGRAM,
  [CE_OUTPUT_FORMAT.MARKDOWN]: CE_TEMPLATE_NAME.MARKDOWN_MERMAID_DIAGRAM,
  [CE_OUTPUT_FORMAT.PDF]: CE_TEMPLATE_NAME.PDF_MERMAID_DIAGRAM,
} as const;

export function warnMermaidTextSize(
  renderData: IRenderData,
  renderer: TemplateRenderer,
  warn: (message: string) => void,
): void {
  if (!renderData.option.components.includes(CE_OUTPUT_COMPONENT.ER)) {
    return;
  }

  const template = diagramTemplates[renderData.option.format];
  const versions =
    renderData.option.format === CE_OUTPUT_FORMAT.HTML
      ? renderData.versions.filter((version) => version.latest)
      : renderData.versions;

  for (const version of versions) {
    const source = renderer.evaluate(template, {
      entities: version.entities,
      option: renderData.option,
      metadata: renderData.metadata,
    });

    if (source.length > DEFAULT_MERMAID_MAX_TEXT_SIZE) {
      warn(
        `Mermaid diagram for version ${version.version} is ${source.length} characters, exceeding Mermaid's default maxTextSize of ${DEFAULT_MERMAID_MAX_TEXT_SIZE}. The renderer may show "Maximum text size in diagram exceeded". Reduce the diagram or increase maxTextSize in the Mermaid renderer.`,
      );
    }
  }
}
