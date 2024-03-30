import { CE_COLUMN_ATTRIBUTE } from '#/configs/const-enum/CE_COLUMN_ATTRIBUTE';
import { CE_OUTPUT_FORMAT } from '#/configs/const-enum/CE_OUTPUT_FORMAT';
import { getColumnAttributeKey } from '#/typeorm/columns/getColumnAttributeKey';
import { getColumnType } from '#/typeorm/columns/getColumnType';
import { getComment } from '#/typeorm/columns/getComment';
import { getIsNullable } from '#/typeorm/columns/getIsNullable';
import { describe, expect, test } from 'vitest';

describe('getIsNullable', () => {
  test('primary', () => {
    const nullable = getIsNullable({ isNullable: true, isPrimary: true });
    expect(nullable).toEqual('');
  });

  test('non-nullable', () => {
    const nullable = getIsNullable({ isNullable: false, isPrimary: false });
    expect(nullable).toEqual('');
  });

  test('nullable', () => {
    const nullable = getIsNullable({ isNullable: true, isPrimary: false });
    expect(nullable).toEqual('nullable');
  });
});

describe('getComment', () => {
  test('undefined comment', () => {
    const comment = getComment({ format: CE_OUTPUT_FORMAT.HTML }, undefined);
    expect(comment).toEqual('');
  });

  test('markdown comment', () => {
    const comment = getComment({ format: CE_OUTPUT_FORMAT.MARKDOWN }, 'i-am-comment');
    expect(comment).toEqual('i-am-comment');
  });

  test('html comment', () => {
    const comment = getComment({ format: CE_OUTPUT_FORMAT.HTML }, 'i-am-comment\ni-am-comment');
    expect(comment).toEqual('i-am-comment<br />i-am-comment');
  });

  test('pdf comment', () => {
    const comment = getComment({ format: CE_OUTPUT_FORMAT.PDF }, 'i-am-comment\ni-am-comment');
    expect(comment).toEqual('i-am-comment<br />i-am-comment');
  });
});

describe('getColumnAttributeKey', () => {
  test('foreign-key', () => {
    const key = getColumnAttributeKey({ relationMetadata: {} as any, isPrimary: false }, '', '', []);
    expect(key).toEqual([CE_COLUMN_ATTRIBUTE.FK]);
  });

  test('primary-key', () => {
    const key = getColumnAttributeKey({ relationMetadata: undefined, isPrimary: true }, '', '', []);
    expect(key).toEqual([CE_COLUMN_ATTRIBUTE.PK]);
  });

  test('unique-key', () => {
    const key = getColumnAttributeKey({ relationMetadata: undefined, isPrimary: false }, 'code', 'tbl_license', [
      {
        $kind: 'index',
        name: 'uk_license_code',
        title: undefined,
        version: '3.2.0',
        createdAt: '2023-09-19T22:36:39+09:00',
        updatedAt: '2023-09-19T22:36:39+09:00',
        change: 'add',
        entity: 'tbl_license',
        dbName: 'uk_license_code',
        tableName: 'License',
        tableDBName: 'tbl_license',
        isUnique: true,
        isFulltext: false,
        isSpatial: false,
        columnNames: ['code', 'title'],
      },
    ]);
    expect(key).toEqual([CE_COLUMN_ATTRIBUTE.UK]);
  });

  test('normal-column', () => {
    const key = getColumnAttributeKey({ relationMetadata: undefined, isPrimary: false }, '', '', []);
    expect(key).toEqual([]);
  });
});

describe('getColumnType', () => {
  test('numeric-type', () => {
    const columnType = getColumnType({ type: 'bigint', length: '0', isPrimary: false, isNullable: true });
    expect(columnType).toEqual('bigint');
  });

  test('function-type without length + undefined', () => {
    const columnType = getColumnType({ type: Boolean, length: '200', isPrimary: false, isNullable: true });
    expect(columnType).toEqual('boolean');
  });

  test('function-type with length', () => {
    const columnType = getColumnType({ type: Boolean, length: '200', isPrimary: false, isNullable: true }, true);
    expect(columnType).toEqual('boolean(200)');
  });

  test('function-type without length', () => {
    const columnType = getColumnType({ type: Boolean, length: '200', isPrimary: false, isNullable: true }, false);
    expect(columnType).toEqual('boolean');
  });

  test('string-type with length', () => {
    const columnType = getColumnType({ type: 'varchar', length: '200', isPrimary: false, isNullable: true }, true);
    expect(columnType).toEqual('varchar(200)');
  });

  test('string-type without length', () => {
    const columnType = getColumnType({ type: 'varchar', length: '200', isPrimary: false, isNullable: true }, false);
    expect(columnType).toEqual('varchar');
  });
});
