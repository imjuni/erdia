import { isFalse } from "my-easy-fp";
import { exists } from "my-node-fp";
import { resolve } from "pathe";
import { importOrRequireFile } from "typeorm/util/ImportUtils";

import { isDrizzleTable } from "#/loaders/drizzle/tables/isDrizzleTable";

export const loadDrizzleSchema = async (
  schemaPath: string
): Promise<Record<string, unknown>> => {
  const resolvedPath = resolve(schemaPath);
  if (isFalse(await exists(resolvedPath))) {
    throw new Error(`Cannot find Drizzle schema: ${resolvedPath}`);
  }

  const [schema] = await importOrRequireFile(resolvedPath);
  if (typeof schema !== "object" || schema === null) {
    throw new Error(
      `Drizzle schema must export one or more tables: ${resolvedPath}`
    );
  }

  const exports = schema as Record<string, unknown>;
  if (!Object.values(exports).some(isDrizzleTable)) {
    throw new Error(
      `Drizzle schema does not export any tables: ${resolvedPath}`
    );
  }
  return exports;
};
