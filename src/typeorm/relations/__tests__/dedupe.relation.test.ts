import type IRelationRecord from '#databases/interfaces/IRelationRecord';
import dedupeManaToManyRelationRecord from '#typeorm/relations/dedupeManaToManyRelationRecord';
import fastSafeStringify from 'fast-safe-stringify';
import fs from 'fs';
import { parse } from 'jsonc-parser';
import path from 'path';
import type { DataSource } from 'typeorm';

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
  test('pass', async () => {
    const expectFileName = `expect.${expect.getState().currentTestName}`.replaceAll(' ', '-');
    const deduped = dedupeManaToManyRelationRecord(relations);

    if (share.expect) {
      fs.writeFileSync(
        path.join(__dirname, 'expects', `${expectFileName}.json`),
        fastSafeStringify(deduped, undefined, 2),
      );
    }

    const expectation = parse(
      (await fs.promises.readFile(path.join(__dirname, 'expects', `${expectFileName}.json`))).toString(),
    ) as object;

    expect(deduped).toMatchObject(expectation);
  });
});
