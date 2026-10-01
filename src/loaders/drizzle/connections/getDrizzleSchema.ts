import type { IDrizzleSource } from "#/loaders/drizzle/interfaces/IDrizzleSource";

interface IDrizzleDatabaseWithSchema {
  readonly _: { readonly fullSchema?: Record<string, unknown> };
}
const hasSchema = (db: unknown): db is IDrizzleDatabaseWithSchema =>
  typeof db === "object" && db !== null && "_" in db;

export const getDrizzleSchema = (
  source: Pick<IDrizzleSource, "db" | "schema">
): Record<string, unknown> => {
  if (source.schema !== undefined) {
    return source.schema;
  }
  return hasSchema(source.db) ? (source.db._.fullSchema ?? {}) : {};
};
