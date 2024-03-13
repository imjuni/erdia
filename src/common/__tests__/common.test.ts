import { getDatabaseName } from '#/common/getDatabaseName';
import { getPlainRelationType } from '#/common/getPlainRelationType';
import { getRelationHash } from '#/common/getRelationHash';
import 'jest';

describe('getDatabaseName', () => {
  test('getDatabaseName - string', () => {
    const name = getDatabaseName({ database: 'maeum-string' });
    expect(name).toEqual('maeum-string');
  });

  test('getDatabaseName - uint8array', () => {
    const name = getDatabaseName({ database: Buffer.from('maeum-uint8array') });
    expect(name).toEqual('maeum-uint8array');
  });

  test('getDatabaseName - undefined', () => {
    const name = getDatabaseName({ database: undefined });
    expect(name).toEqual('default');
  });
});

describe('getPlainRelationType', () => {
  test('getPlainRelationType - many-to-many', async () => {
    const relation = getPlainRelationType('many-to-many');
    expect(relation).toEqual('many-to-many');
  });

  test('getPlainRelationType - one-to-one', async () => {
    const relation = getPlainRelationType('one-to-one');
    expect(relation).toEqual('one-to-one');
  });

  test('getPlainRelationType - one-to-many', async () => {
    const relation = getPlainRelationType('one-to-many');
    expect(relation).toEqual('one-to-many');
  });

  test('getPlainRelationType - many-to-one', async () => {
    const relation = getPlainRelationType('many-to-one');
    expect(relation).toEqual('one-to-many');
  });
});

describe('getRelationHash', () => {
  test('getRelationHash - one-to-one', () => {
    const hash = getRelationHash({ entity: 'a', inverseEntityName: 'b', relationType: 'one-to-one' });
    expect('YTpiOm9uZS10by1vbmU=').toEqual(hash);
  });

  test('getRelationHash - one-to-many', () => {
    const hash = getRelationHash({
      entity: 'a',
      inverseEntityName: 'b',
      relationType: 'one-to-many',
    });
    expect('YTpiOm9uZS10by1tYW55').toEqual(hash);
  });

  test('getRelationHash - many-to-one', () => {
    const hash = getRelationHash({
      entity: 'a',
      inverseEntityName: 'b',
      relationType: 'many-to-one',
    });
    expect('YTpiOm9uZS10by1tYW55').toEqual(hash);
  });

  test('getRelationHash - many-to-many', () => {
    const hash = getRelationHash({
      entity: 'a',
      inverseEntityName: 'b',
      relationType: 'many-to-many',
    });
    expect('YTpiOm1hbnktdG8tbWFueQ==').toEqual(hash);
  });
});
