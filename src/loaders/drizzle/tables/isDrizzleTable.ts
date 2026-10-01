import { is, Table } from "drizzle-orm";

export const isDrizzleTable = (value: unknown): value is Table =>
  is(value, Table);
