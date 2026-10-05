import { CE_CHANGE_KIND } from "#/databases/const-enum/CE_CHANGE_KIND";
import type { IIndexRecord } from "#/databases/interfaces/IIndexRecord";
import type { IRecordMetadata } from "#/databases/interfaces/IRecordMetadata";
import type { IDrizzleIndex } from "#/loaders/drizzle/interfaces/IDrizzleTableConfig";

export const getDrizzleIndexRecord = (
  index: IDrizzleIndex,
  tableName: string,
  metadata: IRecordMetadata,
): IIndexRecord => ({
  $kind: "index",
  ...metadata,
  change: CE_CHANGE_KIND.ADD,
  columnNames: index.columns.map((column) => column.name),
  dbName: index.name,
  entity: tableName,
  isFulltext: false,
  isSpatial: false,
  isUnique: index.isUnique,
  name: index.name,
  tableDBName: tableName,
  tableName,
});
