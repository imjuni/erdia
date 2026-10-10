import { isTrue } from "my-easy-fp";
import type { ColumnMetadata } from "typeorm/metadata/ColumnMetadata";

export const getColumnType = (
  columnMetadata: Pick<ColumnMetadata, "type" | "length" | "isNullable" | "isPrimary">,
  includeLength?: boolean,
) => {
  if (typeof columnMetadata.type === "function") {
    if (isTrue(includeLength ?? false) && columnMetadata.length !== "") {
      const name = columnMetadata.type.name.toString().toLowerCase().replaceAll(/\s/gu, "-");
      return `${name}(${columnMetadata.length})`;
    }
    const name = columnMetadata.type.name.toString().toLowerCase().replaceAll(/\s/gu, "-");
    return name;
  }
  if (isTrue(includeLength ?? false) && columnMetadata.length !== "") {
    const name = columnMetadata.type
      .toString()
      .replace(/\s+unsigned\b/gi, "")
      .trim()
      .replaceAll(/\s/gu, "-");
    return `${name}(${columnMetadata.length})`;
  }
  const name = columnMetadata.type
    .toString()
    .replace(/\s+unsigned\b/gi, "")
    .trim()
    .replaceAll(/\s/gu, "-");
  return name;
};
