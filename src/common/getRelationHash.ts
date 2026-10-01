import { getPlainRelationType } from "#/common/getPlainRelationType";
import { toSorted } from "#/common/toSorted";
import type { IRelationRecord } from "#/databases/interfaces/IRelationRecord";

export const getRelationHash = (
  relation: Pick<
    IRelationRecord,
    "entity" | "inverseEntityName" | "relationType"
  >
): string => {
  const entities = toSorted(
    [relation.entity, relation.inverseEntityName],
    (left, right) => left.localeCompare(right)
  );
  const plainRelationType = getPlainRelationType(relation.relationType);
  const baseHash = [...entities, plainRelationType].join(":");
  const base64 = Buffer.from(baseHash).toString("base64");
  return base64;
};
