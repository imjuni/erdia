import { describe, expect, test } from "vitest";

import type { IBuildCommandOption } from "#/configs/interfaces/IBuildCommandOption";
import { getRenderData } from "#/creators/getRenderData";
import type { IEntityRecord } from "#/databases/interfaces/IEntityRecord";
import type { IIndexRecord } from "#/databases/interfaces/IIndexRecord";
import type { IRelationRecord } from "#/databases/interfaces/IRelationRecord";
import type { IColumnRecord } from "#/databases/interfaces/IColumnRecord";

const metadata = { name: "test", version: "1.10.0", createdAt: "", updatedAt: "" };
const option: Omit<IBuildCommandOption, "config"> = {
  format: "html",
  versionFrom: "package.json",
  routeBasePath: "/erd",
  components: ["er", "table"],
  theme: "default",
  projectName: "app",
  dataSourcePath: "",
};
const entity = (version: string, name: string): IEntityRecord => ({
  $kind: "entity",
  version,
  entity: name,
  name,
  dbName: name,
  createdAt: "",
  updatedAt: "",
  change: "none",
  hasRelation: false,
});
const column = (version: string, name: string): IColumnRecord => ({
  ...entity(version, name),
  $kind: "column",
  attributeKey: [],
  columnType: "int",
  isNullable: "",
  charset: "",
  columnTypeWithLength: "int",
  weight: 0,
  comment: "",
});

describe("getRenderData", () => {
  test("groups children by both version and entity regardless of input order", async () => {
    const old = entity("1.2.0", "users");
    const current = entity("1.10.0", "users");
    const other = entity("1.10.0", "posts");
    const oldColumn = column(old.version, old.entity);
    const currentColumn = column(current.version, current.entity);
    const result = await getRenderData(
      [currentColumn, other, oldColumn, old, current],
      metadata,
      option,
    );
    expect(result.versions).toEqual([
      {
        version: current.version,
        latest: true,
        entities: [
          { ...other, columns: [], relations: [], indices: [] },
          { ...current, columns: [currentColumn], relations: [], indices: [] },
        ],
      },
      {
        version: old.version,
        latest: false,
        entities: [{ ...old, columns: [oldColumn], relations: [], indices: [] }],
      },
    ]);
    expect(result.option.routeBasePath).toBe("/erd/");
  });

  test("handles empty input", async () => {
    expect((await getRenderData([], metadata, option)).versions).toEqual([]);
  });
  test("groups relations and indices without leaking across tables or versions", async () => {
    const current = entity("1.10.0", "users");
    const relation: IRelationRecord = {
      ...current,
      $kind: "relation",
      inverseEntityName: "posts",
      inverseEntityDBName: "posts",
      joinPropertyName: "id",
      joinColumnName: "id",
      joinColumnOne: true,
      joinColumnNullable: false,
      inverseJoinColumnOne: false,
      inverseJoinColumnNullable: false,
      relationType: "one-to-many",
      relationHash: "users-posts",
      order: 0,
      isDuplicate: false,
    };
    const index: IIndexRecord = {
      ...current,
      $kind: "index",
      tableName: "users",
      tableDBName: "users",
      isUnique: true,
      isFulltext: false,
      isSpatial: false,
      columnNames: ["id"],
    };
    const secondIndex = { ...index, name: "second" };
    const result = await getRenderData(
      [
        relation,
        index,
        secondIndex,
        { ...relation, entity: "posts" },
        { ...index, version: "1.2.0" },
        current,
      ],
      metadata,
      option,
    );
    expect(result.versions).toEqual([
      {
        version: current.version,
        latest: true,
        entities: [
          { ...current, columns: [], relations: [relation], indices: [index, secondIndex] },
        ],
      },
      { version: "1.2.0", latest: false, entities: [] },
    ]);
  });

  test("sorts timestamps and preserves non-HTML options", async () => {
    const older = entity("2025-01-01", "users");
    const newer = entity("2026-01-01", "users");
    const markdownOption = { ...option, format: "markdown", versionFrom: "timestamp" } as const;
    const result = await getRenderData(
      [older, newer],
      { ...metadata, version: newer.version },
      markdownOption,
    );
    expect(result.versions.map(({ version, latest }) => ({ version, latest }))).toEqual([
      { version: newer.version, latest: true },
      { version: older.version, latest: false },
    ]);
    expect(result.option).toBe(markdownOption);
  });

  test("supports HTML without a route base path", async () => {
    const result = await getRenderData([], metadata, { ...option, routeBasePath: undefined });
    expect(result.option.routeBasePath).toBeUndefined();
  });
});
