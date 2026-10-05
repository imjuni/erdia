import fs from "node:fs";

import fastSafeStringify from "fast-safe-stringify";
import { parse } from "jsonc-parser";
import { findOrThrow } from "my-easy-fp";
import { join } from "pathe";
import type { DataSource } from "typeorm";
import { beforeAll, describe, expect, it } from "vitest";

import { getInverseRelationMetadata } from "#/loaders/typeorm/relations/getInverseRelationMetadata";
import { getJoinColumn } from "#/loaders/typeorm/relations/getJoinColumn";
import { getManyToManyEntityMetadata } from "#/loaders/typeorm/relations/getManyToManyEntityMetadata";
import { getManyToManyJoinColumn } from "#/loaders/typeorm/relations/getManyToManyJoinColumn";
import { getManyToOneJoinColumn } from "#/loaders/typeorm/relations/getManyToOneJoinColumn";

const testDirectory = join(process.cwd(), "src/loaders/typeorm/relations");

const share: {
  dataSource: DataSource;
  expect: boolean;
} = {
  dataSource: undefined as unknown as DataSource,
  expect: false,
};
beforeAll(async () => {
  const dataSourceModule =
    await import("../../../../examples/typeorm/schema-type/dataSourceConfig");
  share.dataSource = dataSourceModule.default;
  await share.dataSource.initialize();
});
describe(getManyToOneJoinColumn, () => {
  it("pass", () => {
    const relationMetadata = findOrThrow(
      findOrThrow(share.dataSource.entityMetadatas, (entity) => entity.name === "License")
        .relations,
      (relation) => relation.propertyName === "user",
    );
    const relations = getManyToOneJoinColumn(relationMetadata);
    expect(relations).toMatchObject({
      inverseJoinColumnNullable: true,
      joinColumnName: "user_id",
      joinPropertyName: "user",
    });
  });
  it("exception", () => {
    const relationMetadata = findOrThrow(
      findOrThrow(share.dataSource.entityMetadatas, (entity) => entity.name === "License")
        .relations,
      (relation) => relation.propertyName === "user",
    );
    const joinColumnsBackup = relationMetadata.joinColumns;
    relationMetadata.joinColumns = [];
    expect(() => {
      try {
        getManyToOneJoinColumn(relationMetadata);
      } finally {
        relationMetadata.joinColumns = joinColumnsBackup;
      }
    }).toThrow();
  });
});
describe(getInverseRelationMetadata, () => {
  it("pass + inverseEntityMetadata", () => {
    const relationMetadata = findOrThrow(
      findOrThrow(share.dataSource.entityMetadatas, (entity) => entity.name === "License")
        .relations,
      (relation) => relation.propertyName === "organizations",
    );
    const relations = getInverseRelationMetadata(relationMetadata);
    expect(relations.joinTableName).toBe("tbl_mtm_license_organization");
    expect(relations.propertyName).toBe("licenses");
  });
  it("pass + inverseEntityMetadata", () => {
    const relationMetadata = findOrThrow(
      findOrThrow(share.dataSource.entityMetadatas, (entity) => entity.name === "License")
        .relations,
      (relation) => relation.propertyName === "organizations",
    );
    const relationsBackup = relationMetadata.inverseEntityMetadata.relations;
    relationMetadata.inverseEntityMetadata.relations = [];
    const relations = getInverseRelationMetadata(relationMetadata);
    expect(relations.joinTableName).toBe("tbl_mtm_license_organization");
    expect(relations.propertyName).toBe("organizations");
    relationMetadata.inverseEntityMetadata.relations = relationsBackup;
  });
  it("exception", () => {
    const relationMetadata = findOrThrow(
      findOrThrow(share.dataSource.entityMetadatas, (entity) => entity.name === "License")
        .relations,
      (relation) => relation.propertyName === "organizations",
    );
    const inverseEntityMetadataRelationsBackup = relationMetadata.inverseEntityMetadata.relations;
    const inverseJoinColumnsBackup = relationMetadata.inverseJoinColumns;
    relationMetadata.inverseEntityMetadata.relations = [];
    relationMetadata.inverseJoinColumns = [];
    expect(() => {
      getInverseRelationMetadata(relationMetadata);
    }).toThrow();
    relationMetadata.inverseEntityMetadata.relations = inverseEntityMetadataRelationsBackup;
    relationMetadata.inverseJoinColumns = inverseJoinColumnsBackup;
  });
});
describe(getManyToManyJoinColumn, () => {
  it("pass-joinColumns", async () => {
    const expectFileName = "expect-01.json";
    const relationMetadata = findOrThrow(
      findOrThrow(share.dataSource.entityMetadatas, (entity) => entity.name === "License")
        .relations,
      (relation) => relation.propertyName === "organizations",
    );
    const relations = getManyToManyJoinColumn(relationMetadata);
    if (share.expect) {
      fs.writeFileSync(
        join(testDirectory, "expects", `${expectFileName}`),
        fastSafeStringify(relations, undefined, 2),
      );
    }
    const expectationContent = await fs.promises.readFile(
      join(testDirectory, "expects", `${expectFileName}`),
    );
    const expectation = parse(expectationContent.toString()) as object;
    expect(relations).toMatchObject(expectation);
  });
  it("pass-relationMetadata", async () => {
    const expectFileName = "expect-02.json";
    const relationMetadata = findOrThrow(
      findOrThrow(share.dataSource.entityMetadatas, (entity) => entity.name === "License")
        .relations,
      (relation) => relation.propertyName === "organizations",
    );
    const joinColumnsBackup = relationMetadata.joinColumns;
    relationMetadata.joinColumns = [];
    const relations = getManyToManyJoinColumn(relationMetadata);
    if (share.expect) {
      fs.writeFileSync(
        join(testDirectory, "expects", `${expectFileName}`),
        fastSafeStringify(relations, undefined, 2),
      );
    }
    relationMetadata.joinColumns = joinColumnsBackup;
    const expectationContent = await fs.promises.readFile(
      join(testDirectory, "expects", `${expectFileName}`),
    );
    const expectation = parse(expectationContent.toString()) as object;
    expect(relations).toMatchObject(expectation);
  });
  it("exception-manyToManyRelations not found", () => {
    const relationMetadata = findOrThrow(
      findOrThrow(share.dataSource.entityMetadatas, (entity) => entity.name === "License")
        .relations,
      (relation) => relation.propertyName === "organizations",
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
    }).toThrow();
  });
  it("exception-manyToManyRelations not found", () => {
    const relationMetadata = findOrThrow(
      findOrThrow(share.dataSource.entityMetadatas, (entity) => entity.name === "License")
        .relations,
      (relation) => relation.propertyName === "organizations",
    );
    const joinColumnsBackup = relationMetadata.joinColumns;
    relationMetadata.joinColumns = [];
    const joinTableNameBackup =
      relationMetadata.inverseEntityMetadata.manyToManyRelations[0].joinTableName;
    relationMetadata.inverseEntityMetadata.manyToManyRelations[0].joinTableName = "n/a";
    expect(() => {
      try {
        getManyToManyJoinColumn(relationMetadata);
      } finally {
        relationMetadata.joinColumns = joinColumnsBackup;
        relationMetadata.inverseEntityMetadata.manyToManyRelations[0].joinTableName =
          joinTableNameBackup;
      }
    }).toThrow();
  });
});
describe(getManyToManyEntityMetadata, () => {
  it("pass-find-from-entities", () => {
    const relationMetadata = findOrThrow(
      findOrThrow(share.dataSource.entityMetadatas, (entity) => entity.name === "License")
        .relations,
      (relation) => relation.propertyName === "organizations",
    );
    const relation = getManyToManyEntityMetadata(
      share.dataSource.entityMetadatas,
      relationMetadata,
    );
    expect(relation.name).toBe("tbl_mtm_license_organization");
  });
  it("exception: not found entity table in data-source", () => {
    const relationMetadata = findOrThrow(
      findOrThrow(share.dataSource.entityMetadatas, (entity) => entity.name === "License")
        .relations,
      (relation) => relation.propertyName === "organizations",
    );
    expect(() => {
      getManyToManyEntityMetadata(
        [findOrThrow(share.dataSource.entityMetadatas, (entity) => entity.name === "User")],
        relationMetadata,
      );
    }).toThrow();
  });
  it("exception: not found inverseEntityMetadata.manyToManyRelations", () => {
    const relationMetadata = findOrThrow(
      findOrThrow(share.dataSource.entityMetadatas, (entity) => entity.name === "License")
        .relations,
      (relation) => relation.propertyName === "organizations",
    );
    const joinTableNameBackup = relationMetadata.joinTableName;
    const manyToManyRelationsBackup = relationMetadata.inverseEntityMetadata.manyToManyRelations;
    relationMetadata.joinTableName = "";
    relationMetadata.inverseEntityMetadata.manyToManyRelations = [];
    expect(() => {
      try {
        getManyToManyEntityMetadata(share.dataSource.entityMetadatas, relationMetadata);
      } finally {
        relationMetadata.joinTableName = joinTableNameBackup;
        relationMetadata.inverseEntityMetadata.manyToManyRelations = manyToManyRelationsBackup;
      }
    }).toThrow();
  });
  it("found using inverseEntityMetadata", () => {
    const relationMetadata = findOrThrow(
      findOrThrow(share.dataSource.entityMetadatas, (entity) => entity.name === "License")
        .relations,
      (relation) => relation.propertyName === "organizations",
    );
    const joinTableNameBackup = relationMetadata.joinTableName;
    relationMetadata.joinTableName = "";
    const entityMetadata = getManyToManyEntityMetadata(
      share.dataSource.entityMetadatas.filter((entity) => entity.name !== "User"),
      relationMetadata,
    );
    relationMetadata.joinTableName = joinTableNameBackup;
    expect(entityMetadata.tableName).toBe("tbl_mtm_license_organization");
  });
});
describe(getJoinColumn, () => {
  it("pass - one-to-one - find from joinColumns", () => {
    const relationMetadata = findOrThrow(
      findOrThrow(share.dataSource.entityMetadatas, (entity) => entity.name === "User").relations,
      (relation) => relation.propertyName === "photo",
    );
    const column = getJoinColumn(relationMetadata);
    expect(column).toEqual({
      inverseJoinColumnNullable: true,
      inverseJoinColumnOne: true,
      isDuplicate: false,
      joinColumnName: "photo_id",
      joinPropertyName: "photo",
    });
  });
  it("pass - one-to-one - find from inverseRelationMetadata", () => {
    const relationMetadata = findOrThrow(
      findOrThrow(share.dataSource.entityMetadatas, (entity) => entity.name === "Photo").relations,
      (relation) => relation.propertyName === "user",
    );
    const column = getJoinColumn(relationMetadata);
    expect(column).toEqual({
      inverseJoinColumnNullable: true,
      inverseJoinColumnOne: true,
      isDuplicate: true,
      joinColumnName: "photo_id",
      joinPropertyName: "photo",
    });
  });
  it("pass - one-to-many - find from inverseRelationMetadata", () => {
    const relationMetadata = findOrThrow(
      findOrThrow(share.dataSource.entityMetadatas, (entity) => entity.name === "User").relations,
      (relation) => relation.propertyName === "licenses",
    );
    const column = getJoinColumn(relationMetadata);
    expect(column).toEqual({
      inverseJoinColumnNullable: true,
      inverseJoinColumnOne: false,
      isDuplicate: true,
      joinColumnName: "user_id",
      joinPropertyName: "user",
    });
  });
  it("pass - many-to-many - find from relationMetadata", () => {
    const relationMetadata = findOrThrow(
      findOrThrow(share.dataSource.entityMetadatas, (entity) => entity.name === "License")
        .relations,
      (relation) => relation.propertyName === "organizations",
    );
    const column = getJoinColumn(relationMetadata);
    expect(column).toEqual({
      inverseJoinColumnNullable: true,
      inverseJoinColumnOne: false,
      isDuplicate: false,
      joinColumnName: "license_id",
      joinPropertyName: "license_id",
    });
  });
  it("exception - one-to-one - empty join columns", () => {
    const relationMetadata = findOrThrow(
      findOrThrow(share.dataSource.entityMetadatas, (entity) => entity.name === "User").relations,
      (relation) => relation.propertyName === "photo",
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
    }).toThrow();
  });
  it("exception - one-to-one - empty join columns in relations", () => {
    const relationMetadata = findOrThrow(
      findOrThrow(share.dataSource.entityMetadatas, (entity) => entity.name === "User").relations,
      (relation) => relation.propertyName === "photo",
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
    }).toThrow();
  });
  it("exception - one-to-one - empty join columns in relations", () => {
    const relationMetadata = findOrThrow(
      findOrThrow(share.dataSource.entityMetadatas, (entity) => entity.name === "User").relations,
      (relation) => relation.propertyName === "photo",
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
    }).toThrow();
  });
  it("exception - one-to-many - not found", () => {
    const relationMetadata = findOrThrow(
      findOrThrow(share.dataSource.entityMetadatas, (entity) => entity.name === "User").relations,
      (relation) => relation.propertyName === "licenses",
    );
    const manyToOneRelationsBackup = relationMetadata.inverseEntityMetadata.manyToOneRelations;
    relationMetadata.inverseEntityMetadata.manyToOneRelations = [];
    expect(() => {
      try {
        getJoinColumn(relationMetadata);
      } finally {
        relationMetadata.inverseEntityMetadata.manyToOneRelations = manyToOneRelationsBackup;
      }
    }).toThrow();
  });
});
