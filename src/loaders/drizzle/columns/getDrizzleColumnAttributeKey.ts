import type { Column } from "drizzle-orm";

import { CE_COLUMN_ATTRIBUTE } from "#/configs/const-enum/CE_COLUMN_ATTRIBUTE";
import type {
  IDrizzleForeignKey,
  IDrizzleIndex,
  IDrizzlePrimaryKey,
} from "#/loaders/drizzle/interfaces/IDrizzleTableConfig";

export const getDrizzleColumnAttributeKey = (
  column: Pick<Column, "name" | "primary" | "isUnique">,
  config: {
    foreignKeys: IDrizzleForeignKey[];
    indexes: IDrizzleIndex[];
    primaryKeys: IDrizzlePrimaryKey[];
  }
) => {
  const isForeign = config.foreignKeys.some((key) =>
    key.reference().columns.some((item) => item.name === column.name)
  );
  const isPrimary =
    column.primary ||
    config.primaryKeys.some((key) =>
      key.columns.some((item) => item.name === column.name)
    );
  const isUnique =
    column.isUnique ||
    config.indexes.some(
      (index) =>
        index.isUnique &&
        index.columns.length === 1 &&
        index.columns[0]?.name === column.name
    );
  return [
    isForeign ? CE_COLUMN_ATTRIBUTE.FK : undefined,
    isPrimary ? CE_COLUMN_ATTRIBUTE.PK : undefined,
    isUnique ? CE_COLUMN_ATTRIBUTE.UK : undefined,
  ].filter(
    (attribute): attribute is CE_COLUMN_ATTRIBUTE => attribute !== undefined
  );
};
