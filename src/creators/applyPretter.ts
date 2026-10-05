import { consola } from "consola";
import { isError } from "my-easy-fp";

export const applyPrettier = async (
  document: string,
  format: "html" | "md" | "json",
  configPath?: string,
): Promise<string> => {
  try {
    const prettierModule = await import("prettier");
    const prettier = prettierModule.default;
    const prettierConfig = await prettier.resolveConfig(configPath ?? ".");
    const formatted = await prettier.format(document, {
      ...prettierConfig,
      parser: format === "md" ? "markdown" : format,
    });
    return formatted;
  } catch (error) {
    const err = isError(error, new Error("unknown error raised from prettier appling function"));
    consola.error(err.message);
    consola.error(err.stack);
    return document;
  }
};
