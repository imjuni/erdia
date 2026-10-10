import { is } from "drizzle-orm";
import { createTableRelationsHelpers, One, Relations } from "drizzle-orm/relations";

import type { IDrizzleForeignKey } from "#/loaders/drizzle/interfaces/IDrizzleTableConfig";

export const getDrizzleRelationForeignKeys = (
  schema: Record<string, unknown>,
  table: Relations["table"],
): IDrizzleForeignKey[] =>
  Object.values(schema)
    .filter((value): value is Relations => is(value, Relations) && value.table === table)
    .flatMap((relations) => Object.values(relations.config(createTableRelationsHelpers(table))))
    .filter((relation): relation is One => is(relation, One) && relation.config !== undefined)
    .map((relation) => ({
      reference: () => ({
        columns: relation.config!.fields,
        foreignColumns: relation.config!.references,
        foreignTable: relation.referencedTable,
      }),
    }));
