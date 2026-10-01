import type { Column, Table } from "drizzle-orm";

export interface IDrizzleForeignKey {
  reference: () => {
    columns: Column[];
    foreignColumns: Column[];
    foreignTable: Table;
  };
}
export interface IDrizzleIndex {
  readonly name: string;
  readonly columns: Pick<Column, "name">[];
  readonly isUnique: boolean;
}
export interface IDrizzlePrimaryKey {
  readonly columns: Column[];
}
export interface IDrizzleTableConfig {
  readonly name: string;
  readonly columns: Column[];
  readonly foreignKeys: IDrizzleForeignKey[];
  readonly indexes: IDrizzleIndex[];
  readonly primaryKeys: IDrizzlePrimaryKey[];
}
