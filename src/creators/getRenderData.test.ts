import { describe, expect, test } from "vitest";

import type { IBuildCommandOption } from "#/configs/interfaces/IBuildCommandOption";
import { getRenderData } from "#/creators/getRenderData";
import type { IEntityRecord } from "#/databases/interfaces/IEntityRecord";
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
});
