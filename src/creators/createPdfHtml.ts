import { randomUUID } from "node:crypto";

import { getDirname } from "my-node-fp";
import pathe from "pathe";
import type { AsyncReturnType } from "type-fest";

import type { IBuildCommandOption } from "#/configs/interfaces/IBuildCommandOption";
import { applyPrettier } from "#/creators/applyPretter";
import type { getRenderData } from "#/creators/getRenderData";
import type { IErdiaDocument } from "#/creators/interfaces/IErdiaDocument";
import { container } from "#/modules/containers/container";
import { SymbolTemplateRenderer } from "#/modules/containers/keys/SymbolTemplateRenderer";
import { betterMkdir } from "#/modules/files/betterMkdir";
import { CE_TEMPLATE_NAME } from "#/templates/cosnt-enum/CE_TEMPLATE_NAME";
import type { TemplateRenderer } from "#/templates/TemplateRenderer";

export async function createPdfHtml(
  option: Pick<IBuildCommandOption, "output" | "components" | "prettierConfig">,
  renderData: AsyncReturnType<typeof getRenderData>,
) {
  const renderer = container.resolve<TemplateRenderer>(SymbolTemplateRenderer);
  const rawHtml = await renderer.evaluate(CE_TEMPLATE_NAME.PDF_DOCUMENT, renderData);
  const prettiedHtml = await applyPrettier(rawHtml, "html", option.prettierConfig);
  const outputDirPath = option.output == null ? process.cwd() : pathe.resolve(option.output);
  await betterMkdir(outputDirPath);

  const tempFileName = pathe.join(outputDirPath, `${randomUUID()}.html`);

  return {
    dirname: await getDirname(outputDirPath),
    content: Buffer.from(prettiedHtml, "utf-8"),
    filename: pathe.resolve(tempFileName),
  } satisfies IErdiaDocument;
}
