import type { Column } from "drizzle-orm";

import { getColumnWeight } from "#/creators/columns/getColumnWeight";
import { CE_CHANGE_KIND } from "#/databases/const-enum/CE_CHANGE_KIND";
import type { IColumnRecord } from "#/databases/interfaces/IColumnRecord";
import type { IRecordMetadata } from "#/databases/interfaces/IRecordMetadata";
import { getDrizzleColumnAttributeKey } from "#/loaders/drizzle/columns/getDrizzleColumnAttributeKey";
import { getDrizzleColumnType } from "#/loaders/drizzle/columns/getDrizzleColumnType";
import type { IDrizzleTableConfig } from "#/loaders/drizzle/interfaces/IDrizzleTableConfig";

export const getDrizzleColumnRecord = (
  column: Column,
  table: Pick<IDrizzleTableConfig, "foreignKeys" | "indexes" | "name" | "primaryKeys">,
  metadata: IRecordMetadata,
): IColumnRecord => {
  const type = getDrizzleColumnType(column);
  const record: Omit<IColumnRecord, "weight"> = {
    $kind: "column",
    ...metadata,
    ...type,
    attributeKey: getDrizzleColumnAttributeKey(column, table),
    change: CE_CHANGE_KIND.ADD,
    charset: "",
    comment: "",
    dbName: column.name,
    entity: table.name,
    isNullable: column.notNull || column.primary ? "" : "nullable",
    name: column.name,
  };
  return { ...record, weight: getColumnWeight(record).toNumber() };
};
