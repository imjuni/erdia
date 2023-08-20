import { CE_COLUMN_ATTRIBUTE } from '#configs/const-enum/CE_COLUMN_ATTRIBUTE';
import getColumnAttributeKey from '#typeorm/columns/getColumnAttributeKey';
import getColumnType from '#typeorm/columns/getColumnType';
import getComment from '#typeorm/columns/getComment';
import getIsNullable from '#typeorm/columns/getIsNullable';

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
    const comment = getComment({ format: 'html' }, undefined);
    expect(comment).toEqual('');
  });

  test('markdown comment', () => {
    const comment = getComment({ format: 'markdown' }, 'i-am-comment');
    expect(comment).toEqual('i-am-comment');
  });

  test('html comment', () => {
    const comment = getComment({ format: 'html' }, 'i-am-comment\ni-am-comment');
    expect(comment).toEqual('i-am-comment<br />i-am-comment');
  });

  test('pdf comment', () => {
    const comment = getComment({ format: 'pdf' }, 'i-am-comment\ni-am-comment');
    expect(comment).toEqual('i-am-comment<br />i-am-comment');
  });
});

describe('getColumnAttributeKey', () => {
  test('foreign-key', () => {
    const key = getColumnAttributeKey({ relationMetadata: {} as any, isPrimary: false });
    expect(key).toEqual([CE_COLUMN_ATTRIBUTE.FK]);
  });

  test('primary-key', () => {
    const key = getColumnAttributeKey({ relationMetadata: undefined, isPrimary: true });
    expect(key).toEqual([CE_COLUMN_ATTRIBUTE.PK]);
  });

  test('normal-column', () => {
    const key = getColumnAttributeKey({ relationMetadata: undefined, isPrimary: false });
    expect(key).toEqual([]);
  });
});

describe('getColumnType', () => {
  test('numeric-type', () => {
    const columnType = getColumnType({ type: 'bigint', length: '0' });
    expect(columnType).toEqual('bigint');
  });

  test('function-type without length + undefined', () => {
    const columnType = getColumnType({ type: Boolean, length: '200' });
    expect(columnType).toEqual('boolean');
  });

  test('function-type with length', () => {
    const columnType = getColumnType({ type: Boolean, length: '200' }, true);
    expect(columnType).toEqual('boolean(200)');
  });

  test('function-type without length', () => {
    const columnType = getColumnType({ type: Boolean, length: '200' }, false);
    expect(columnType).toEqual('boolean');
  });

  test('string-type with length', () => {
    const columnType = getColumnType({ type: 'varchar', length: '200' }, true);
    expect(columnType).toEqual('varchar(200)');
  });

  test('string-type without length', () => {
    const columnType = getColumnType({ type: 'varchar', length: '200' }, false);
    expect(columnType).toEqual('varchar');
  });
});