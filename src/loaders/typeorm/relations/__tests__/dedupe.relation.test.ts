import fs from "node:fs";

import fastSafeStringify from "fast-safe-stringify";
import { parse } from "jsonc-parser";
import { join } from "pathe";
import { describe, expect, it } from "vitest";

import { CE_CHANGE_KIND } from "#/databases/const-enum/CE_CHANGE_KIND";
import type { IRelationRecord } from "#/databases/interfaces/IRelationRecord";
import { dedupeManyToManyRelationRecord } from "#/loaders/typeorm/relations/dedupeManyToManyRelationRecord";

const testDirectory = join(
  process.cwd(),
  "src/loaders/typeorm/relations/__tests__"
);

const share: {
  expect: boolean;
} = {
  expect: false,
};
const relations: IRelationRecord[] = [
  {
    $kind: "relation",
    change: CE_CHANGE_KIND.NONE,
    createdAt: "2023-08-12T17:10:49.390Z",
    dbName: "tbl_user",
    entity: "tbl_user",
    inverseEntityDBName: "tbl_photo",
    inverseEntityName: "Photo",
    inverseJoinColumnNullable: true,
    inverseJoinColumnOne: true,
    isDuplicate: false,
    joinColumnName: "photo_id",
    joinColumnNullable: true,
    joinColumnOne: true,
    joinPropertyName: "photo",
    name: "User",
    order: 2,
    relationHash: "dGJsX3Bob3RvOnRibF91c2VyOm9uZS10by1vbmU=",
    relationType: "one-to-one",
    updatedAt: "2023-08-12T17:10:49.390Z",
    version: "2023-08-12T17:10:49.389Z",
  },
  {
    $kind: "relation",
    change: CE_CHANGE_KIND.NONE,
    createdAt: "2023-08-12T17:10:49.390Z",
    dbName: "tbl_user",
    entity: "tbl_user",
    inverseEntityDBName: "tbl_license",
    inverseEntityName: "License",
    inverseJoinColumnNullable: true,
    inverseJoinColumnOne: false,
    isDuplicate: true,
    joinColumnName: "user_id",
    joinColumnNullable: true,
    joinColumnOne: true,
    joinPropertyName: "user",
    name: "User",
    order: 2,
    relationHash: "dGJsX2xpY2Vuc2U6dGJsX3VzZXI6b25lLXRvLW1hbnk=",
    relationType: "one-to-many",
    updatedAt: "2023-08-12T17:10:49.390Z",
    version: "2023-08-12T17:10:49.389Z",
  },
  {
    $kind: "relation",
    change: CE_CHANGE_KIND.NONE,
    createdAt: "2023-08-12T17:10:49.390Z",
    dbName: "tbl_photo",
    entity: "tbl_photo",
    inverseEntityDBName: "tbl_user",
    inverseEntityName: "User",
    inverseJoinColumnNullable: true,
    inverseJoinColumnOne: true,
    isDuplicate: true,
    joinColumnName: "photo_id",
    joinColumnNullable: true,
    joinColumnOne: true,
    joinPropertyName: "photo",
    name: "Photo",
    order: 1,
    relationHash: "dGJsX3Bob3RvOnRibF91c2VyOm9uZS10by1vbmU=",
    relationType: "one-to-one",
    updatedAt: "2023-08-12T17:10:49.390Z",
    version: "2023-08-12T17:10:49.389Z",
  },
  {
    $kind: "relation",
    change: CE_CHANGE_KIND.NONE,
    createdAt: "2023-08-12T17:10:49.390Z",
    dbName: "tbl_license",
    entity: "tbl_license",
    inverseEntityDBName: "tbl_user",
    inverseEntityName: "User",
    inverseJoinColumnNullable: true,
    inverseJoinColumnOne: true,
    isDuplicate: false,
    joinColumnName: "user_id",
    joinColumnNullable: true,
    joinColumnOne: false,
    joinPropertyName: "user",
    name: "License",
    order: 1,
    relationHash: "dGJsX2xpY2Vuc2U6dGJsX3VzZXI6b25lLXRvLW1hbnk=",
    relationType: "many-to-one",
    updatedAt: "2023-08-12T17:10:49.390Z",
    version: "2023-08-12T17:10:49.389Z",
  },
  {
    $kind: "relation",
    change: CE_CHANGE_KIND.NONE,
    createdAt: "2023-08-12T17:10:49.390Z",
    dbName: "tbl_license",
    entity: "tbl_license",
    inverseEntityDBName: "tbl_organization",
    inverseEntityName: "Organization",
    inverseJoinColumnNullable: true,
    inverseJoinColumnOne: false,
    isDuplicate: false,
    joinColumnName: "license_id",
    joinColumnNullable: true,
    joinColumnOne: false,
    joinPropertyName: "license_id",
    name: "License",
    order: 1,
    relationHash: "dGJsX2xpY2Vuc2U6dGJsX29yZ2FuaXphdGlvbjptYW55LXRvLW1hbnk=",
    relationType: "many-to-many",
    updatedAt: "2023-08-12T17:10:49.390Z",
    version: "2023-08-12T17:10:49.389Z",
  },
  {
    $kind: "relation",
    change: CE_CHANGE_KIND.NONE,
    createdAt: "2023-08-12T17:10:49.390Z",
    dbName: "tbl_mtm_license_organization",
    entity: "tbl_mtm_license_organization",
    inverseEntityDBName: "tbl_license",
    inverseEntityName: "License",
    inverseJoinColumnNullable: false,
    inverseJoinColumnOne: true,
    isDuplicate: false,
    joinColumnName: "license_id",
    joinColumnNullable: false,
    joinColumnOne: false,
    joinPropertyName: "license_id",
    name: "tbl_mtm_license_organization",
    order: 2,
    relationHash:
      "dGJsX210bV9saWNlbnNlX29yZ2FuaXphdGlvbjp0YmxfbXRtX2xpY2Vuc2Vfb3JnYW5pemF0aW9uOm9uZS10by1tYW55",
    relationType: "many-to-one",
    updatedAt: "2023-08-12T17:10:49.390Z",
    version: "2023-08-12T17:10:49.389Z",
  },
  {
    $kind: "relation",
    change: CE_CHANGE_KIND.NONE,
    createdAt: "2023-08-12T17:10:49.390Z",
    dbName: "tbl_organization",
    entity: "tbl_organization",
    inverseEntityDBName: "tbl_license",
    inverseEntityName: "License",
    inverseJoinColumnNullable: true,
    inverseJoinColumnOne: false,
    isDuplicate: false,
    joinColumnName: "organization_id",
    joinColumnNullable: true,
    joinColumnOne: false,
    joinPropertyName: "organization_id",
    name: "Organization",
    order: 2,
    relationHash: "dGJsX2xpY2Vuc2U6dGJsX29yZ2FuaXphdGlvbjptYW55LXRvLW1hbnk=",
    relationType: "many-to-many",
    updatedAt: "2023-08-12T17:10:49.390Z",
    version: "2023-08-12T17:10:49.389Z",
  },
  {
    $kind: "relation",
    change: CE_CHANGE_KIND.NONE,
    createdAt: "2023-08-12T17:10:49.390Z",
    dbName: "tbl_mtm_license_organization",
    entity: "tbl_mtm_license_organization",
    inverseEntityDBName: "tbl_organization",
    inverseEntityName: "Organization",
    inverseJoinColumnNullable: false,
    inverseJoinColumnOne: true,
    isDuplicate: false,
    joinColumnName: "organization_id",
    joinColumnNullable: false,
    joinColumnOne: false,
    joinPropertyName: "organization_id",
    name: "tbl_mtm_license_organization",
    order: 1,
    relationHash:
      "dGJsX210bV9saWNlbnNlX29yZ2FuaXphdGlvbjp0YmxfbXRtX2xpY2Vuc2Vfb3JnYW5pemF0aW9uOm9uZS10by1tYW55",
    relationType: "many-to-one",
    updatedAt: "2023-08-12T17:10:49.390Z",
    version: "2023-08-12T17:10:49.389Z",
  },
];
describe("dedupeManaToManyRelationRecord", () => {
  it("dedupe relations", async () => {
    const expectFileName = "expect-07.json";
    const deduped = dedupeManyToManyRelationRecord(relations);
    if (share.expect) {
      fs.writeFileSync(
        join(testDirectory, "expects", `${expectFileName}`),
        fastSafeStringify(deduped, undefined, 2)
      );
    }
    const expectationContent = await fs.promises.readFile(
      join(testDirectory, "expects", `${expectFileName}`)
    );
    const expectation = parse(expectationContent.toString()) as object;
    expect(deduped).toMatchObject(expectation);
  });
});
