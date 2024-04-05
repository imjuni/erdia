import { getInverseRelationMetadata } from '#/typeorm/relations/getInverseRelationMetadata';
import { getJoinColumn } from '#/typeorm/relations/getJoinColumn';
import { getManyToManyEntityMetadata } from '#/typeorm/relations/getManyToManyEntityMetadata';
import { getManyToManyJoinColumn } from '#/typeorm/relations/getManyToManyJoinColumn';
import { getManyToOneJoinColumn } from '#/typeorm/relations/getManyToOneJoinColumn';
import fastSafeStringify from 'fast-safe-stringify';
import fs from 'fs';
import { parse } from 'jsonc-parser';
import { findOrThrow } from 'my-easy-fp';
import path from 'path';
import type { DataSource } from 'typeorm';
import { beforeAll, describe, expect, test } from 'vitest';

const share: { dataSource: DataSource; expect: boolean } = { expect: false } as any;

beforeAll(async () => {
  share.dataSource = (await import('../../../../examples/schema-type/dataSourceConfig')).default;
  await share.dataSource.initialize();
});

describe('getManyToOneJoinColumn', () => {
  test('pass', async () => {
    const relationMetadata = findOrThrow(
      findOrThrow(share.dataSource.entityMetadatas, (entity) => {
        return entity.name === 'License';
      }).relations,
      (relation) => {
        return relation.propertyName === 'user';
      },
    );

    const relations = getManyToOneJoinColumn(relationMetadata);

    expect(relations).toMatchObject({
      inverseJoinColumnNullable: true,
      joinPropertyName: 'user',
      joinColumnName: 'user_id',
    });
  });

  test('exception', async () => {
    const relationMetadata = findOrThrow(
      findOrThrow(share.dataSource.entityMetadatas, (entity) => {
        return entity.name === 'License';
      }).relations,
      (relation) => {
        return relation.propertyName === 'user';
      },
    );

    const joinColumnsBackup = relationMetadata.joinColumns;
    relationMetadata.joinColumns = [];

    expect(() => {
      try {
        getManyToOneJoinColumn(relationMetadata);
      } finally {
        relationMetadata.joinColumns = joinColumnsBackup;
      }
    }).toThrowError();
  });
});

describe('getInverseRelationMetadata', () => {
  test('pass + inverseEntityMetadata', () => {
    const relationMetadata = findOrThrow(
      findOrThrow(share.dataSource.entityMetadatas, (entity) => {
        return entity.name === 'License';
      }).relations,
      (relation) => {
        return relation.propertyName === 'organizations';
      },
    );

    const relations = getInverseRelationMetadata(relationMetadata);

    expect(relations.joinTableName).toEqual('tbl_mtm_license_organization');
    expect(relations.propertyName).toEqual('licenses');
  });

  test('pass + inverseEntityMetadata', () => {
    const relationMetadata = findOrThrow(
      findOrThrow(share.dataSource.entityMetadatas, (entity) => {
        return entity.name === 'License';
      }).relations,
      (relation) => {
        return relation.propertyName === 'organizations';
      },
    );

    const relationsBackup = relationMetadata.inverseEntityMetadata.relations;
    relationMetadata.inverseEntityMetadata.relations = [];
    const relations = getInverseRelationMetadata(relationMetadata);

    expect(relations.joinTableName).toEqual('tbl_mtm_license_organization');
    expect(relations.propertyName).toEqual('organizations');

    relationMetadata.inverseEntityMetadata.relations = relationsBackup;
  });

  test('exception', () => {
    const relationMetadata = findOrThrow(
      findOrThrow(share.dataSource.entityMetadatas, (entity) => {
        return entity.name === 'License';
      }).relations,
      (relation) => {
        return relation.propertyName === 'organizations';
      },
    );

    const inverseEntityMetadataRelationsBackup = relationMetadata.inverseEntityMetadata.relations;
    const inverseJoinColumnsBackup = relationMetadata.inverseJoinColumns;

    relationMetadata.inverseEntityMetadata.relations = [];
    relationMetadata.inverseJoinColumns = [];

    expect(() => {
      getInverseRelationMetadata(relationMetadata);
    }).toThrowError();

    relationMetadata.inverseEntityMetadata.relations = inverseEntityMetadataRelationsBackup;
    relationMetadata.inverseJoinColumns = inverseJoinColumnsBackup;
  });
});

describe('getManyToManyJoinColumn', () => {
  test('pass-joinColumns', async () => {
    const expectFileName = 'expect-01.json';
    const relationMetadata = findOrThrow(
      findOrThrow(share.dataSource.entityMetadatas, (entity) => {
        return entity.name === 'License';
      }).relations,
      (relation) => {
        return relation.propertyName === 'organizations';
      },
    );

    const relations = getManyToManyJoinColumn(relationMetadata);

    if (share.expect) {
      fs.writeFileSync(
        path.join(__dirname, 'expects', `${expectFileName}`),
        fastSafeStringify(relations, undefined, 2),
      );
    }

    const expectation = parse(
      (await fs.promises.readFile(path.join(__dirname, 'expects', `${expectFileName}`))).toString(),
    ) as object;

    expect(relations).toMatchObject(expectation);
  });

  test('pass-relationMetadata', async () => {
    const expectFileName = 'expect-02.json';
    const relationMetadata = findOrThrow(
      findOrThrow(share.dataSource.entityMetadatas, (entity) => {
        return entity.name === 'License';
      }).relations,
      (relation) => {
        return relation.propertyName === 'organizations';
      },
    );

    const joinColumnsBackup = relationMetadata.joinColumns;
    relationMetadata.joinColumns = [];

    const relations = getManyToManyJoinColumn(relationMetadata);

    if (share.expect) {
      fs.writeFileSync(
        path.join(__dirname, 'expects', `${expectFileName}`),
        fastSafeStringify(relations, undefined, 2),
      );
    }

    relationMetadata.joinColumns = joinColumnsBackup;

    const expectation = parse(
      (await fs.promises.readFile(path.join(__dirname, 'expects', `${expectFileName}`))).toString(),
    ) as object;

    expect(relations).toMatchObject(expectation);
  });

  test('exception-manyToManyRelations not found', async () => {
    const relationMetadata = findOrThrow(
      findOrThrow(share.dataSource.entityMetadatas, (entity) => {
        return entity.name === 'License';
      }).relations,
      (relation) => {
        return relation.propertyName === 'organizations';
      },
    );

    const joinColumnsBackup = relationMetadata.joinColumns;
    relationMetadata.joinColumns = [];
    const manyToManyRelationsBackup = relationMetadata.inverseEntityMetadata.manyToManyRelations;
    relationMetadata.inverseEntityMetadata.manyToManyRelations = [];

    expect(() => {
      try {
        getManyToManyJoinColumn(relationMetadata);
      } finally {
        relationMetadata.joinColumns = joinColumnsBackup;
        relationMetadata.inverseEntityMetadata.manyToManyRelations = manyToManyRelationsBackup;
      }
    }).toThrowError();
  });

  test('exception-manyToManyRelations not found', async () => {
    const relationMetadata = findOrThrow(
      findOrThrow(share.dataSource.entityMetadatas, (entity) => {
        return entity.name === 'License';
      }).relations,
      (relation) => {
        return relation.propertyName === 'organizations';
      },
    );

    const joinColumnsBackup = relationMetadata.joinColumns;
    relationMetadata.joinColumns = [];
    const joinTableNameBackup = relationMetadata.inverseEntityMetadata.manyToManyRelations[0].joinTableName;
    relationMetadata.inverseEntityMetadata.manyToManyRelations[0].joinTableName = 'n/a';

    expect(() => {
      try {
        getManyToManyJoinColumn(relationMetadata);
      } finally {
        relationMetadata.joinColumns = joinColumnsBackup;
        relationMetadata.inverseEntityMetadata.manyToManyRelations[0].joinTableName = joinTableNameBackup;
      }
    }).toThrowError();
  });
});

describe('getManyToManyEntityMetadata', () => {
  test('pass-find-from-entities', async () => {
    const relationMetadata = findOrThrow(
      findOrThrow(share.dataSource.entityMetadatas, (entity) => {
        return entity.name === 'License';
      }).relations,
      (relation) => {
        return relation.propertyName === 'organizations';
      },
    );

    const relation = getManyToManyEntityMetadata(share.dataSource.entityMetadatas, relationMetadata);

    expect(relation.name).toEqual('tbl_mtm_license_organization');
  });

  test('exception: not found entity table in data-source', async () => {
    const relationMetadata = findOrThrow(
      findOrThrow(share.dataSource.entityMetadatas, (entity) => {
        return entity.name === 'License';
      }).relations,
      (relation) => {
        return relation.propertyName === 'organizations';
      },
    );

    expect(() => {
      getManyToManyEntityMetadata(
        [findOrThrow(share.dataSource.entityMetadatas, (entity) => entity.name === 'User')],
        relationMetadata,
      );
    }).toThrowError();
  });

  test('exception: not found inverseEntityMetadata.manyToManyRelations', async () => {
    const relationMetadata = findOrThrow(
      findOrThrow(share.dataSource.entityMetadatas, (entity) => {
        return entity.name === 'License';
      }).relations,
      (relation) => {
        return relation.propertyName === 'organizations';
      },
    );

    const joinTableNameBackup = relationMetadata.joinTableName;
    const manyToManyRelationsBackup = relationMetadata.inverseEntityMetadata.manyToManyRelations;
    relationMetadata.joinTableName = '';
    relationMetadata.inverseEntityMetadata.manyToManyRelations = [];

    expect(() => {
      try {
        getManyToManyEntityMetadata(share.dataSource.entityMetadatas, relationMetadata);
      } finally {
        relationMetadata.joinTableName = joinTableNameBackup;
        relationMetadata.inverseEntityMetadata.manyToManyRelations = manyToManyRelationsBackup;
      }
    }).toThrowError();
  });

  test('found using inverseEntityMetadata', async () => {
    const relationMetadata = findOrThrow(
      findOrThrow(share.dataSource.entityMetadatas, (entity) => entity.name === 'License').relations,
      (relation) => relation.propertyName === 'organizations',
    );

    const joinTableNameBackup = relationMetadata.joinTableName;
    relationMetadata.joinTableName = '';

    const entityMetadata = getManyToManyEntityMetadata(
      share.dataSource.entityMetadatas.filter((entity) => entity.name !== 'User'),
      relationMetadata,
    );

    relationMetadata.joinTableName = joinTableNameBackup;

    expect(entityMetadata.tableName).toEqual('tbl_mtm_license_organization');
  });
});

describe('getJoinColumn', () => {
  test('pass - one-to-one - find from joinColumns', () => {
    const relationMetadata = findOrThrow(
      findOrThrow(share.dataSource.entityMetadatas, (entity) => entity.name === 'User').relations,
      (relation) => relation.propertyName === 'photo',
    );

    const column = getJoinColumn(relationMetadata);

    expect(column).toEqual({
      inverseJoinColumnOne: true,
      inverseJoinColumnNullable: true,
      joinPropertyName: 'photo',
      joinColumnName: 'photo_id',
      isDuplicate: false,
    });
  });

  test('pass - one-to-one - find from inverseRelationMetadata', () => {
    const relationMetadata = findOrThrow(
      findOrThrow(share.dataSource.entityMetadatas, (entity) => entity.name === 'Photo').relations,
      (relation) => relation.propertyName === 'user',
    );

    const column = getJoinColumn(relationMetadata);

    expect(column).toEqual({
      inverseJoinColumnOne: true,
      inverseJoinColumnNullable: true,
      joinPropertyName: 'photo',
      joinColumnName: 'photo_id',
      isDuplicate: true,
    });
  });

  test('pass - one-to-many - find from inverseRelationMetadata', () => {
    const relationMetadata = findOrThrow(
      findOrThrow(share.dataSource.entityMetadatas, (entity) => entity.name === 'User').relations,
      (relation) => relation.propertyName === 'licenses',
    );

    const column = getJoinColumn(relationMetadata);

    expect(column).toEqual({
      inverseJoinColumnNullable: true,
      joinPropertyName: 'user',
      joinColumnName: 'user_id',
      inverseJoinColumnOne: false,
      isDuplicate: true,
    });
  });

  test('pass - many-to-many - find from relationMetadata', () => {
    const relationMetadata = findOrThrow(
      findOrThrow(share.dataSource.entityMetadatas, (entity) => entity.name === 'License').relations,
      (relation) => relation.propertyName === 'organizations',
    );

    const column = getJoinColumn(relationMetadata);

    expect(column).toEqual({
      inverseJoinColumnOne: false,
      inverseJoinColumnNullable: true,
      joinPropertyName: 'license_id',
      isDuplicate: false,
      joinColumnName: 'license_id',
    });
  });

  test('exception - one-to-one - empty join columns', () => {
    const relationMetadata = findOrThrow(
      findOrThrow(share.dataSource.entityMetadatas, (entity) => entity.name === 'User').relations,
      (relation) => relation.propertyName === 'photo',
    );

    const joinColumnsBackup = relationMetadata.joinColumns;
    const oneToOneRelationsBackup = relationMetadata.inverseEntityMetadata.oneToOneRelations;

    relationMetadata.joinColumns = [];
    relationMetadata.inverseEntityMetadata.oneToOneRelations = [];

    expect(() => {
      try {
        getJoinColumn(relationMetadata);
      } finally {
        relationMetadata.joinColumns = joinColumnsBackup;
        relationMetadata.inverseEntityMetadata.oneToOneRelations = oneToOneRelationsBackup;
      }
    }).toThrowError();
  });

  test('exception - one-to-one - empty join columns in relations', () => {
    const relationMetadata = findOrThrow(
      findOrThrow(share.dataSource.entityMetadatas, (entity) => entity.name === 'User').relations,
      (relation) => relation.propertyName === 'photo',
    );

    const joinColumnsBackup = relationMetadata.joinColumns;
    const oneToOneRelationsBackup = relationMetadata.inverseEntityMetadata.oneToOneRelations;

    relationMetadata.joinColumns = [];
    relationMetadata.inverseEntityMetadata.oneToOneRelations[0].joinColumns = [];

    expect(() => {
      try {
        getJoinColumn(relationMetadata);
      } finally {
        relationMetadata.joinColumns = joinColumnsBackup;
        relationMetadata.inverseEntityMetadata.oneToOneRelations = oneToOneRelationsBackup;
      }
    }).toThrowError();
  });

  test('exception - one-to-one - empty join columns in relations', () => {
    const relationMetadata = findOrThrow(
      findOrThrow(share.dataSource.entityMetadatas, (entity) => entity.name === 'User').relations,
      (relation) => relation.propertyName === 'photo',
    );

    const joinColumnsBackup = relationMetadata.joinColumns;
    const oneToOneRelationsBackup = relationMetadata.inverseEntityMetadata.oneToOneRelations;

    relationMetadata.joinColumns = [];
    relationMetadata.inverseEntityMetadata.oneToOneRelations[0].joinColumns = [];

    expect(() => {
      try {
        getJoinColumn(relationMetadata);
      } finally {
        relationMetadata.joinColumns = joinColumnsBackup;
        relationMetadata.inverseEntityMetadata.oneToOneRelations = oneToOneRelationsBackup;
      }
    }).toThrowError();
  });

  test('exception - one-to-many - not found', () => {
    const relationMetadata = findOrThrow(
      findOrThrow(share.dataSource.entityMetadatas, (entity) => entity.name === 'User').relations,
      (relation) => relation.propertyName === 'licenses',
    );

    const manyToOneRelationsBackup = relationMetadata.inverseEntityMetadata.manyToOneRelations;
    relationMetadata.inverseEntityMetadata.manyToOneRelations = [];

    expect(() => {
      try {
        getJoinColumn(relationMetadata);
      } finally {
        relationMetadata.inverseEntityMetadata.manyToOneRelations = manyToOneRelationsBackup;
      }
    }).toThrowError();
  });
});
