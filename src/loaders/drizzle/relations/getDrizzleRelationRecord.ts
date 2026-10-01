import { getTableName } from "drizzle-orm";

import { getRelationHash } from "#/common/getRelationHash";
import { CE_CHANGE_KIND } from "#/databases/const-enum/CE_CHANGE_KIND";
import type { IRecordMetadata } from "#/databases/interfaces/IRecordMetadata";
import type { IRelationRecord } from "#/databases/interfaces/IRelationRecord";
import type { IDrizzleForeignKey } from "#/loaders/drizzle/interfaces/IDrizzleTableConfig";

export const getDrizzleRelationRecord = (
  foreignKey: IDrizzleForeignKey,
  tableName: string,
  metadata: IRecordMetadata
): IRelationRecord => {
  const reference = foreignKey.reference();
  const [column] = reference.columns;
  const [inverseColumn] = reference.foreignColumns;
  const inverseTableName = getTableName(reference.foreignTable);
  const relation = {
    entity: tableName,
    inverseEntityName: inverseTableName,
    relationType: "many-to-one" as const,
  };
  return {
    $kind: "relation",
    ...metadata,
    ...relation,
    change: CE_CHANGE_KIND.ADD,
    dbName: tableName,
    inverseEntityDBName: inverseTableName,
    inverseJoinColumnName: inverseColumn?.name,
    inverseJoinColumnNullable: false,
    inverseJoinColumnOne: true,
    isDuplicate: false,
    joinColumnName: column?.name ?? "",
    joinColumnNullable: !(column?.notNull ?? false),
    joinColumnOne: false,
    joinPropertyName: column?.name ?? "",
    name: column?.name ?? "",
    order: 1,
    relationHash: getRelationHash(relation),
  };
};
