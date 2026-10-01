import { CE_OUTPUT_FORMAT } from "#/configs/const-enum/CE_OUTPUT_FORMAT";
import type { IBuildCommandOption } from "#/configs/interfaces/IBuildCommandOption";

export const getComment = (
  option: Pick<IBuildCommandOption, "format">,
  comment: undefined | null | string
) => {
  if (comment === null || comment === undefined) {
    return "";
  }
  if (option.format === CE_OUTPUT_FORMAT.MARKDOWN) {
    return comment
      .replaceAll("\r\n", "\\\\r\\\\n")
      .replaceAll("\n\r", "\\\\n\\\\r")
      .replaceAll("\n", "\\\\n");
  }
  if (option.format === CE_OUTPUT_FORMAT.HTML) {
    return comment
      .replaceAll("\r\n", "<br />")
      .replaceAll("\n\r", "<br />")
      .replaceAll("\n", "<br />");
  }
  return comment
    .replaceAll("\r\n", "<br />")
    .replaceAll("\n\r", "<br />")
    .replaceAll("\n", "<br />");
};
