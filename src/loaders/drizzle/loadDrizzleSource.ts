/* oxlint-disable unicorn/no-await-expression-member, no-return-wrap */
import { importOrRequireFile } from "typeorm/util/ImportUtils";

import type { IDrizzleSource } from "#/loaders/interfaces/IDrizzleSource";

const isSource = (value: unknown): value is IDrizzleSource =>
  typeof value === "object" &&
  value !== null &&
  "db" in value &&
  (value as { db?: unknown }).db !== null &&
  (value as { db?: unknown }).db !== undefined;

export const loadDrizzleSource = async (
  path: string
): Promise<IDrizzleSource> => {
  const [exports] = await importOrRequireFile(path);
  const candidates = Object.values(exports as Record<string, unknown>);
  if (isSource(exports)) {
    return exports;
  }
  const values = await Promise.all(candidates);
  const resolved = values.filter(isSource);
  if (resolved.length !== 1) {
    throw new Error(
      `Drizzle source must export exactly one defineDrizzleSource({ db, schema }) value`
    );
  }
  return resolved[0];
};
/* oxlint-disable unicorn/no-await-expression-member, promise/no-return-wrap */
