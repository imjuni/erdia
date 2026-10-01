import fs from "node:fs";

import fastSafeStringify from "fast-safe-stringify";
import { parse } from "jsonc-parser";
import { findOrThrow } from "my-easy-fp";
import { join } from "pathe";
import type { DataSource } from "typeorm";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

import * as relationHash from "#/common/getRelationHash";
import { toSorted } from "#/common/toSorted";
import type { IRecordMetadata } from "#/databases/interfaces/IRecordMetadata";
import { getRelationRecord } from "#/loaders/typeorm/relations/getRelationRecord";
import { getRelationRecords } from "#/loaders/typeorm/relations/getRelationRecords";

const testDirectory = join(process.cwd(), "src/loaders/typeorm/relations");

type TRelationResult = ReturnType<typeof getRelationRecords>[number];

const relationKey = (entry: TRelationResult) =>
  entry.type === "pass"
    ? (entry.pass.at(0)?.relationHash ?? "")
    : entry.fail.message;

const compareRelations = (left: TRelationResult, right: TRelationResult) =>
  relationKey(left).localeCompare(relationKey(right));

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
afterAll(async () => {
  await share.dataSource.destroy();
});
describe(getRelationRecord, () => {
  it("pass", async () => {
    const expectFileName = "expect-03.json";
    const metadata: IRecordMetadata = {
      createdAt: "2023-01-01T11:22:33.000+09:00",
      name: "i-am-application-name",
      updatedAt: "2023-01-02T11:22:33.000+09:00",
      version: "1.0.0",
    };
    const relationMetadata = findOrThrow(
      findOrThrow(
        share.dataSource.entityMetadatas,
        (entity) => entity.name === "License"
      ).relations,
      (relation) => relation.propertyName === "user"
    );
    const relation = getRelationRecord(
      share.dataSource.entityMetadatas,
      relationMetadata,
      metadata
    );
    if (share.expect) {
      fs.writeFileSync(
        join(testDirectory, "expects", `${expectFileName}`),
        fastSafeStringify(relation, undefined, 2)
      );
    }
    const expectationContent = await fs.promises.readFile(
      join(testDirectory, "expects", `${expectFileName}`)
    );
    const expectation = parse(expectationContent.toString()) as object;
    expect(relation).toMatchObject(expectation);
  });
  it("pass - many-to-many", async () => {
    const expectFileName = "expect-04.json";
    const metadata: IRecordMetadata = {
      createdAt: "2023-01-01T11:22:33.000+09:00",
      name: "i-am-application-name",
      updatedAt: "2023-01-02T11:22:33.000+09:00",
      version: "1.0.0",
    };
    const relationMetadata = findOrThrow(
      findOrThrow(
        share.dataSource.entityMetadatas,
        (entity) => entity.name === "License"
      ).relations,
      (relation) => relation.propertyName === "organizations"
    );
    const relation = getRelationRecord(
      share.dataSource.entityMetadatas,
      relationMetadata,
      metadata
    );
    if (share.expect) {
      fs.writeFileSync(
        join(testDirectory, "expects", `${expectFileName}`),
        fastSafeStringify(relation, undefined, 2)
      );
    }
    const expectationContent = await fs.promises.readFile(
      join(testDirectory, "expects", `${expectFileName}`)
    );
    const expectation = parse(expectationContent.toString()) as object;
    expect(relation).toMatchObject(expectation);
  });
  it("exception - many-to-many", async () => {
    const expectFileName = "expect-05.json";
    const metadata: IRecordMetadata = {
      createdAt: "2023-01-01T11:22:33.000+09:00",
      name: "i-am-application-name",
      updatedAt: "2023-01-02T11:22:33.000+09:00",
      version: "1.0.0",
    };
    const relationMetadata = findOrThrow(
      findOrThrow(
        share.dataSource.entityMetadatas,
        (entity) => entity.name === "License"
      ).relations,
      (relation) => relation.propertyName === "organizations"
    );
    const spyOnHandle = vi
      .spyOn(relationHash, "getRelationHash")
      .mockImplementation(() => {
        throw new Error("raise error for test");
      });
    const relation = getRelationRecord(
      share.dataSource.entityMetadatas,
      relationMetadata,
      metadata
    );
    spyOnHandle.mockRestore();
    if (share.expect) {
      fs.writeFileSync(
        join(testDirectory, "expects", `${expectFileName}`),
        fastSafeStringify(relation, undefined, 2)
      );
    }
    const expectationContent = await fs.promises.readFile(
      join(testDirectory, "expects", `${expectFileName}`)
    );
    const expectation = parse(expectationContent.toString()) as object;
    expect(relation).toMatchObject(expectation);
  });
});
describe(getRelationRecords, () => {
  it("pass", async () => {
    const expectFileName = "expect-06.json";
    const metadata: IRecordMetadata = {
      createdAt: "2023-01-01T11:22:33.000+09:00",
      name: "i-am-application-name",
      updatedAt: "2023-01-02T11:22:33.000+09:00",
      version: "1.0.0",
    };
    const relation = getRelationRecords(share.dataSource, metadata);
    if (share.expect) {
      fs.writeFileSync(
        join(testDirectory, "expects", `${expectFileName}`),
        fastSafeStringify(relation, undefined, 2)
      );
    }
    const expectationContent = await fs.promises.readFile(
      join(testDirectory, "expects", `${expectFileName}`)
    );
    const expectation = parse(expectationContent.toString()) as ReturnType<
      typeof getRelationRecords
    >;
    expect(toSorted(relation, compareRelations)).toMatchObject(
      toSorted(expectation, compareRelations)
    );
  });
});
