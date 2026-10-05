import type { Column } from "drizzle-orm";

export const getDrizzleColumnType = (
  column: Pick<Column, "getSQLType" | "notNull" | "primary">,
): { columnType: string; columnTypeWithLength: string } => {
  const sqlType = column.getSQLType();
  const prefix = column.notNull || column.primary ? "*" : "";
  return {
    columnType: `${prefix}${sqlType}`,
    columnTypeWithLength: `${prefix}${sqlType}`,
  };
};
