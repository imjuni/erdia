import { isTrue } from "my-easy-fp";
import type { ColumnMetadata } from "typeorm/metadata/ColumnMetadata";

import { getIsNullable } from "#/loaders/typeorm/columns/getIsNullable";

export const getColumnType = (
  columnMetadata: Pick<
    ColumnMetadata,
    "type" | "length" | "isNullable" | "isPrimary"
  >,
  includeLength?: boolean
) => {
  const nullable = getIsNullable(columnMetadata);
  if (typeof columnMetadata.type === "function") {
    if (isTrue(includeLength ?? false) && columnMetadata.length !== "") {
      const name = columnMetadata.type.name
        .toString()
        .toLowerCase()
        .replaceAll(/\s/gu, "-");
      const withNullable = nullable === "nullable" ? name : `*${name}`;
      return `${withNullable}(${columnMetadata.length})`;
    }
    const name = columnMetadata.type.name
      .toString()
      .toLowerCase()
      .replaceAll(/\s/gu, "-");
    const withNullable = nullable === "nullable" ? name : `*${name}`;
    return withNullable;
  }
  if (isTrue(includeLength ?? false) && columnMetadata.length !== "") {
    const name = columnMetadata.type.toString().replaceAll(/\s/gu, "-");
    const withNullable = nullable === "nullable" ? name : `*${name}`;
    return `${withNullable}(${columnMetadata.length})`;
  }
  const name = columnMetadata.type.toString().replaceAll(/\s/gu, "-");
  const withNullable = nullable === "nullable" ? name : `*${name}`;
  return withNullable;
};
