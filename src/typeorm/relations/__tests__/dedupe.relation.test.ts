import { CE_CHANGE_KIND } from '#/databases/const-enum/CE_CHANGE_KIND';
import type { IRelationRecord } from '#/databases/interfaces/IRelationRecord';
import { dedupeManaToManyRelationRecord } from '#/typeorm/relations/dedupeManaToManyRelationRecord';
import fastSafeStringify from 'fast-safe-stringify';
import { parse } from 'jsonc-parser';
import fs from 'node:fs';
import pathe from 'pathe';
import type { DataSource } from 'typeorm';
import { describe, expect, test } from 'vitest';

const share: { dataSource: DataSource; expect: boolean } = { expect: false } as any;

const relations: IRelationRecord[] = [
  {
    version: '2023-08-12T17:10:49.389Z',
    createdAt: '2023-08-12T17:10:49.390Z',
    updatedAt: '2023-08-12T17:10:49.390Z',
    $kind: 'relation',
    entity: 'tbl_user',
    name: 'User',
    dbName: 'tbl_user',
    change: CE_CHANGE_KIND.NONE,
    inverseEntityName: 'Photo',
    inverseEntityDBName: 'tbl_photo',
    joinColumnName: 'photo_id',
    joinPropertyName: 'photo',
    relationHash: 'dGJsX3Bob3RvOnRibF91c2VyOm9uZS10by1vbmU=',
    joinColumnOne: true,
    joinColumnNullable: true,
    inverseJoinColumnNullable: true,
    inverseJoinColumnOne: true,
    relationType: 'one-to-one',
    isDuplicate: false,
    order: 2,
  },
  {
    version: '2023-08-12T17:10:49.389Z',
    createdAt: '2023-08-12T17:10:49.390Z',
    updatedAt: '2023-08-12T17:10:49.390Z',
    $kind: 'relation',
    entity: 'tbl_user',
    name: 'User',
    dbName: 'tbl_user',
    change: CE_CHANGE_KIND.NONE,
    inverseEntityName: 'License',
    inverseEntityDBName: 'tbl_license',
    joinColumnName: 'user_id',
    joinPropertyName: 'user',
    relationHash: 'dGJsX2xpY2Vuc2U6dGJsX3VzZXI6b25lLXRvLW1hbnk=',
    joinColumnOne: true,
    joinColumnNullable: true,
    inverseJoinColumnNullable: true,
    inverseJoinColumnOne: false,
    relationType: 'one-to-many',
    isDuplicate: true,
    order: 2,
  },
  {
    version: '2023-08-12T17:10:49.389Z',
    createdAt: '2023-08-12T17:10:49.390Z',
    updatedAt: '2023-08-12T17:10:49.390Z',
    $kind: 'relation',
    entity: 'tbl_photo',
    name: 'Photo',
    dbName: 'tbl_photo',
    change: CE_CHANGE_KIND.NONE,
    inverseEntityName: 'User',
    inverseEntityDBName: 'tbl_user',
    joinColumnName: 'photo_id',
    joinPropertyName: 'photo',
    relationHash: 'dGJsX3Bob3RvOnRibF91c2VyOm9uZS10by1vbmU=',
    joinColumnOne: true,
    joinColumnNullable: true,
    inverseJoinColumnNullable: true,
    inverseJoinColumnOne: true,
    relationType: 'one-to-one',
    isDuplicate: true,
    order: 1,
  },
  {
    version: '2023-08-12T17:10:49.389Z',
    createdAt: '2023-08-12T17:10:49.390Z',
    updatedAt: '2023-08-12T17:10:49.390Z',
    $kind: 'relation',
    entity: 'tbl_license',
    name: 'License',
    dbName: 'tbl_license',
    change: CE_CHANGE_KIND.NONE,
    inverseEntityName: 'User',
    inverseEntityDBName: 'tbl_user',
    joinColumnName: 'user_id',
    joinPropertyName: 'user',
    relationHash: 'dGJsX2xpY2Vuc2U6dGJsX3VzZXI6b25lLXRvLW1hbnk=',
    joinColumnOne: false,
    joinColumnNullable: true,
    inverseJoinColumnNullable: true,
    inverseJoinColumnOne: true,
    relationType: 'many-to-one',
    isDuplicate: false,
    order: 1,
  },
  {
    version: '2023-08-12T17:10:49.389Z',
    createdAt: '2023-08-12T17:10:49.390Z',
    updatedAt: '2023-08-12T17:10:49.390Z',
    $kind: 'relation',
    entity: 'tbl_license',
    name: 'License',
    dbName: 'tbl_license',
    change: CE_CHANGE_KIND.NONE,
    inverseEntityName: 'Organization',
    inverseEntityDBName: 'tbl_organization',
    joinColumnName: 'license_id',
    joinPropertyName: 'license_id',
    relationHash: 'dGJsX2xpY2Vuc2U6dGJsX29yZ2FuaXphdGlvbjptYW55LXRvLW1hbnk=',
    joinColumnOne: false,
    joinColumnNullable: true,
    inverseJoinColumnNullable: true,
    inverseJoinColumnOne: false,
    relationType: 'many-to-many',
    order: 1,
    isDuplicate: false,
  },
  {
    version: '2023-08-12T17:10:49.389Z',
    createdAt: '2023-08-12T17:10:49.390Z',
    updatedAt: '2023-08-12T17:10:49.390Z',
    $kind: 'relation',
    entity: 'tbl_mtm_license_organization',
    name: 'tbl_mtm_license_organization',
    dbName: 'tbl_mtm_license_organization',
    change: CE_CHANGE_KIND.NONE,
    inverseEntityName: 'License',
    inverseEntityDBName: 'tbl_license',
    joinPropertyName: 'license_id',
    joinColumnName: 'license_id',
    joinColumnOne: false,
    joinColumnNullable: false,
    inverseJoinColumnOne: true,
    inverseJoinColumnNullable: false,
    relationType: 'many-to-one',
    relationHash: 'dGJsX210bV9saWNlbnNlX29yZ2FuaXphdGlvbjp0YmxfbXRtX2xpY2Vuc2Vfb3JnYW5pemF0aW9uOm9uZS10by1tYW55',
    isDuplicate: false,
    order: 2,
  },
  {
    version: '2023-08-12T17:10:49.389Z',
    createdAt: '2023-08-12T17:10:49.390Z',
    updatedAt: '2023-08-12T17:10:49.390Z',
    $kind: 'relation',
    entity: 'tbl_organization',
    name: 'Organization',
    dbName: 'tbl_organization',
    change: CE_CHANGE_KIND.NONE,
    inverseEntityName: 'License',
    inverseEntityDBName: 'tbl_license',
    joinColumnName: 'organization_id',
    joinPropertyName: 'organization_id',
    relationHash: 'dGJsX2xpY2Vuc2U6dGJsX29yZ2FuaXphdGlvbjptYW55LXRvLW1hbnk=',
    joinColumnOne: false,
    joinColumnNullable: true,
    inverseJoinColumnNullable: true,
    inverseJoinColumnOne: false,
    relationType: 'many-to-many',
    order: 2,
    isDuplicate: false,
  },
  {
    version: '2023-08-12T17:10:49.389Z',
    createdAt: '2023-08-12T17:10:49.390Z',
    updatedAt: '2023-08-12T17:10:49.390Z',
    $kind: 'relation',
    entity: 'tbl_mtm_license_organization',
    name: 'tbl_mtm_license_organization',
    dbName: 'tbl_mtm_license_organization',
    change: CE_CHANGE_KIND.NONE,
    inverseEntityName: 'Organization',
    inverseEntityDBName: 'tbl_organization',
    joinPropertyName: 'organization_id',
    joinColumnName: 'organization_id',
    joinColumnOne: false,
    joinColumnNullable: false,
    inverseJoinColumnOne: true,
    inverseJoinColumnNullable: false,
    relationType: 'many-to-one',
    relationHash: 'dGJsX210bV9saWNlbnNlX29yZ2FuaXphdGlvbjp0YmxfbXRtX2xpY2Vuc2Vfb3JnYW5pemF0aW9uOm9uZS10by1tYW55',
    isDuplicate: false,
    order: 1,
  },
];

describe('dedupeManaToManyRelationRecord', () => {
  test('dedupe relations', async () => {
    const expectFileName = 'expect-07.json';
    const deduped = dedupeManaToManyRelationRecord(relations);

    if (share.expect) {
      fs.writeFileSync(pathe.join(__dirname, 'expects', `${expectFileName}`), fastSafeStringify(deduped, undefined, 2));
    }

    const expectation = parse(
      (await fs.promises.readFile(pathe.join(__dirname, 'expects', `${expectFileName}`))).toString(),
    ) as object;

    expect(deduped).toMatchObject(expectation);
  });
});
