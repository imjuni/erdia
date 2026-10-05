import { CE_CHANGE_KIND } from "#/databases/const-enum/CE_CHANGE_KIND";
import type { IEntityRecord } from "#/databases/interfaces/IEntityRecord";
import type { IRecordMetadata } from "#/databases/interfaces/IRecordMetadata";
import type { IDrizzleTableConfig } from "#/loaders/drizzle/interfaces/IDrizzleTableConfig";

export const getDrizzleEntityRecord = (
  table: Pick<IDrizzleTableConfig, "foreignKeys" | "name">,
  metadata: IRecordMetadata,
): IEntityRecord => ({
  $kind: "entity",
  ...metadata,
  change: CE_CHANGE_KIND.ADD,
  dbName: table.name,
  entity: table.name,
  hasRelation: table.foreignKeys.length > 0,
  name: table.name,
});
