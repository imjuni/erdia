import fs from "node:fs";

import fastSafeStringify from "fast-safe-stringify";
import { parse } from "jsonc-parser";
import { join } from "pathe";
import type { DataSource } from "typeorm";
import { beforeAll, describe, expect, it } from "vitest";

import { toSorted } from "#/common/toSorted";
import { CE_CHANGE_KIND } from "#/databases/const-enum/CE_CHANGE_KIND";
import type { IEntityRecord } from "#/databases/interfaces/IEntityRecord";
import type { IRecordMetadata } from "#/databases/interfaces/IRecordMetadata";
import { getEntityName } from "#/loaders/typeorm/entities/getEntityName";
import { getEntityPropertyName } from "#/loaders/typeorm/entities/getEntityPropertyName";
import { getEntityRecord } from "#/loaders/typeorm/entities/getEntityRecord";
import { getEntityRecords } from "#/loaders/typeorm/entities/getEntityRecords";

const testDirectory = join(
  process.cwd(),
  "src/loaders/typeorm/entities/__tests__"
);

const share: {
  dataSource: DataSource;
  expect: boolean;
} = {
  dataSource: undefined as unknown as DataSource,
  expect: false,
};
beforeAll(async () => {
  const dataSourceModule =
    await import("../../../../../examples/typeorm/async-schema-type/dataSourceConfig");
  share.dataSource = await dataSourceModule.default;
  await share.dataSource.initialize();
});
describe(getEntityName, () => {
  it("record > db-name", () => {
    const name = getEntityName({
      $kind: "entity",
      change: CE_CHANGE_KIND.NONE,
      createdAt: "2023-01-01T11:22:33.000+09:00",
      dbName: "i-am-db-name",
      entity: "i-am-table-name",
      hasRelation: false,
      name: "i-am-property-name",
      updatedAt: "2023-01-02T11:22:33.000+09:00",
      version: "i-am-entity-version",
    } satisfies IEntityRecord);
    expect(name).toBe("i-am-db-name");
  });
  it("record > property-name", () => {
    const name = getEntityName({
      $kind: "entity",
      change: CE_CHANGE_KIND.NONE,
      createdAt: "2023-01-01T11:22:33.000+09:00",
      dbName: "",
      entity: "i-am-table-name",
      hasRelation: false,
      name: "i-am-property-name",
      updatedAt: "2023-01-02T11:22:33.000+09:00",
      version: "i-am-entity-version",
    } satisfies IEntityRecord);
    expect(name).toBe("i-am-property-name");
  });
  it("entity > table-name", () => {
    const name = getEntityName({
      name: "i-am-property-name",
      tableName: "i-am-table-name",
    });
    expect(name).toBe("i-am-table-name");
  });
  it("table > property-name", () => {
    const name = getEntityName({
      name: "i-am-property-name",
      tableName: "",
    });
    expect(name).toBe("i-am-property-name");
  });
});
describe(getEntityPropertyName, () => {
  it("record > property-name", () => {
    const name = getEntityPropertyName({
      $kind: "entity",
      change: CE_CHANGE_KIND.NONE,
      createdAt: "2023-01-01T11:22:33.000+09:00",
      dbName: "i-am-table-name",
      entity: "i-am-table-name",
      hasRelation: false,
      name: "i-am-property-name",
      updatedAt: "2023-01-02T11:22:33.000+09:00",
      version: "i-am-entity-version",
    } satisfies IEntityRecord);
    expect(name).toBe("i-am-property-name");
  });
  it("record > table-name", () => {
    const name = getEntityPropertyName({
      $kind: "entity",
      change: CE_CHANGE_KIND.NONE,
      createdAt: "2023-01-01T11:22:33.000+09:00",
      dbName: "i-am-table-name",
      entity: "i-am-table-name",
      hasRelation: false,
      name: "",
      updatedAt: "2023-01-02T11:22:33.000+09:00",
      version: "i-am-entity-version",
    } satisfies IEntityRecord);
    expect(name).toBe("i-am-table-name");
  });
  it("entity > table-name", () => {
    const name = getEntityPropertyName({
      name: "i-am-property-name",
      tableName: "i-am-table-name",
    });
    expect(name).toBe("i-am-property-name");
  });
  it("table > property-name", () => {
    const name = getEntityPropertyName({
      name: "",
      tableName: "i-am-property-name",
    });
    expect(name).toBe("i-am-property-name");
  });
});
describe(getEntityRecord, () => {
  it("pass", async () => {
    const expectFileName = "expect-01.json";
    const metadata: IRecordMetadata = {
      createdAt: "2023-01-01T11:22:33.000+09:00",
      name: "i-am-application-name",
      updatedAt: "2023-01-02T11:22:33.000+09:00",
      version: "1.0.0",
    };
    const entities = share.dataSource.entityMetadatas;
    if (entities.length <= 0) {
      throw new Error("Cannot found User, Photo entity");
    }
    const tableDatas = toSorted(
      entities.map((entity) => getEntityRecord(entity, metadata)),
      (left, right) => left.name.localeCompare(right.name)
    );
    if (share.expect) {
      fs.writeFileSync(
        join(testDirectory, "expects", `${expectFileName}`),
        fastSafeStringify(tableDatas, undefined, 2)
      );
    }
    const expectationContent = await fs.promises.readFile(
      join(testDirectory, "expects", `${expectFileName}`)
    );
    const expectation = parse(expectationContent.toString()) as object;
    expect(tableDatas).toMatchObject(expectation);
  });
});
describe(getEntityRecords, () => {
  it("pass", async () => {
    const expectFileName = "expect-02.json";
    const metadata: IRecordMetadata = {
      createdAt: "2023-01-01T11:22:33.000+09:00",
      name: "i-am-application-name",
      updatedAt: "2023-01-02T11:22:33.000+09:00",
      version: "1.0.0",
    };
    const records = getEntityRecords(share.dataSource, metadata);
    if (share.expect) {
      fs.writeFileSync(
        join(testDirectory, "expects", `${expectFileName}`),
        fastSafeStringify(records, undefined, 2)
      );
    }
    const expectationContent = await fs.promises.readFile(
      join(testDirectory, "expects", `${expectFileName}`)
    );
    const expectation = parse(expectationContent.toString()) as object;
    expect(records).toMatchObject(expectation);
  });
});
