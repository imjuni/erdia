import fs from "node:fs";

import fastSafeStringify from "fast-safe-stringify";
import { parse } from "jsonc-parser";
import { join } from "pathe";
import type { DataSource } from "typeorm";
import { beforeAll, describe, expect, it } from "vitest";

import * as env from "#/common/test-config";
import { toSorted } from "#/common/toSorted";
import type { IRecordMetadata } from "#/databases/interfaces/IRecordMetadata";
import { getColumnRecord } from "#/loaders/typeorm/columns/getColumnRecord";

const testDirectory = join(process.cwd(), "src/loaders/typeorm/columns");

const share: {
  dataSource: DataSource;
  expect: boolean;
} = {
  dataSource: undefined as unknown as DataSource,
  expect: false,
};
beforeAll(async () => {
  const dataSourceModule =
    await import("../../../../examples/typeorm/async-schema-type/dataSourceConfig");
  share.dataSource = await dataSourceModule.default;
  await share.dataSource.initialize();
});
describe(getColumnRecord, () => {
  it("column list", async () => {
    const expectFileName = "expect-01.json";
    const userEntity = share.dataSource.entityMetadatas.find(
      (entityMetadata) => entityMetadata.name === "User"
    );
    const metadata: IRecordMetadata = {
      createdAt: "2023-01-01T11:22:33.000+09:00",
      name: "i-am-application-name",
      updatedAt: "2023-01-02T11:22:33.000+09:00",
      version: "1.0.0",
    };
    if (userEntity === null || userEntity === undefined) {
      throw new Error("Cannot found user entity");
    }
    const columns = toSorted(
      userEntity.columns.map((column) =>
        getColumnRecord(column, env.buildOption, metadata, [])
      ),
      (left, right) => left.name.localeCompare(right.name)
    );
    if (share.expect) {
      fs.writeFileSync(
        expectFileName,
        fastSafeStringify(columns, undefined, 2)
      );
    }
    const expectationContent = await fs.promises.readFile(
      join(testDirectory, "expects", expectFileName)
    );
    const expectation = parse(expectationContent.toString()) as object;
    expect(columns).toMatchObject(expectation);
  });
});
