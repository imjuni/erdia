import { consola } from "consola";
import type { DataSource } from "typeorm";
import { beforeAll, expect, test } from "vitest";

import { getColumnWeight } from "#/creators/columns/getColumnWeight";
import { CE_CHANGE_KIND } from "#/databases/const-enum/CE_CHANGE_KIND";

const share: {
  dataSource: DataSource;
} = { dataSource: undefined as unknown as DataSource };
beforeAll(async () => {
  const dataSourceModule =
    await import("../../examples/typeorm/schema-type/dataSourceConfig");
  share.dataSource = dataSourceModule.default;
  await share.dataSource.initialize();
});
test("get.column.weight", () => {
  // const expectFileName = `expect.${expect.getState().currentTestName}`;
  const weight001 = getColumnWeight({
    $kind: "column",
    attributeKey: ["PK"],
    change: CE_CHANGE_KIND.NONE,
    charset: "",
    columnType: "number",
    columnTypeWithLength: "number",
    comment: "i am comment",
    createdAt: "2023-01-01T11:22:33.000+09:00",
    dbName: "hello",
    entity: "testEntity",
    isNullable: "nullable",
    name: "hello",
    updatedAt: "2023-01-02T11:22:33.000+09:00",
    version: "1.0.0",
  });
  const weight002 = getColumnWeight({
    $kind: "column",
    attributeKey: ["FK"],
    change: CE_CHANGE_KIND.NONE,
    charset: "",
    columnType: "varchar",
    columnTypeWithLength: "varchar(10)",
    comment: "i am comment",
    createdAt: "2023-01-01T11:22:33.000+09:00",
    dbName: "hello",
    entity: "testEntity",
    isNullable: "nullable",
    name: "hello",
    updatedAt: "2023-01-02T11:22:33.000+09:00",
    version: "1.0.0",
  });
  const weight003 = getColumnWeight({
    $kind: "column",
    attributeKey: [],
    change: CE_CHANGE_KIND.NONE,
    charset: "",
    columnType: "char",
    columnTypeWithLength: "char(10)",
    comment: "i am comment",
    createdAt: "2023-01-01T11:22:33.000+09:00",
    dbName: "hello",
    entity: "testEntity",
    isNullable: "nullable",
    name: "hello",
    updatedAt: "2023-01-02T11:22:33.000+09:00",
    version: "1.0.0",
  });
  consola.log(weight001.toString(), weight002.toString(), weight003.toString());
  expect(weight001.toString()).toBe("20649018.21");
  expect(weight002.toString()).toBe("10743018.21");
  expect(weight003.toString()).toBe("414018.21");
});
