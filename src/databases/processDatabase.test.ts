import { describe, expect, test } from "vitest";

import type { IEntityRecord } from "#/databases/interfaces/IEntityRecord";
import type { IRecordMetadata } from "#/databases/interfaces/IRecordMetadata";
import { processDatabase } from "#/databases/processDatabase";

const metadata: IRecordMetadata = { name: "test", version: "1.10.0", createdAt: "", updatedAt: "" };
const record = (version: string, entity = "users"): IEntityRecord => ({
  $kind: "entity",
  version,
  entity,
  name: entity,
  dbName: entity,
  createdAt: "",
  updatedAt: "",
  change: "none",
  hasRelation: false,
});

describe("processDatabase", () => {
  test("handles empty and single current version databases", async () => {
    const empty = { next: [], deleted: [], prev: [] };
    expect(await processDatabase(metadata, [], { versionFrom: "package.json" })).toEqual(empty);
    expect(
      await processDatabase(metadata, [record(metadata.version)], { versionFrom: "package.json" }),
    ).toEqual(empty);
  });

  test("replaces the current version and selects the previous semantic version", async () => {
    const older = record("1.2.0");
    const current = record("1.10.0");
    const another = record("1.10.0", "posts");
    expect(
      await processDatabase(metadata, [older, current, another], { versionFrom: "package.json" }),
    ).toEqual({
      next: [older],
      deleted: [current, another],
      prev: [older],
    });
  });

  test("retains history when adding a new version", async () => {
    const db = [record("1.2.0"), record("1.9.0")];
    expect(await processDatabase(metadata, db, { versionFrom: "package.json" })).toEqual({
      next: db,
      deleted: [],
      prev: [db[1]],
    });
  });

  test("sorts timestamp versions and preserves record order", async () => {
    const old = record("2025-01-01");
    const current = record("2026-01-01");
    expect(
      await processDatabase({ ...metadata, version: current.version }, [current, old], {
        versionFrom: "timestamp",
      }),
    ).toEqual({
      next: [old],
      deleted: [current],
      prev: [old],
    });
  });
});
