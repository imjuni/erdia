import type { Column } from "drizzle-orm";

export const getDrizzleColumnType = (
  column: Pick<Column, "getSQLType">,
): { columnType: string; columnTypeWithLength: string } => {
  const sqlType = column
    .getSQLType()
    .replace(/\s+unsigned\b/gi, "")
    .trim();
  return {
    columnType: sqlType,
    columnTypeWithLength: sqlType,
  };
};
