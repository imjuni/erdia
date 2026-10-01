import fs from "node:fs";

import { existsSync } from "my-node-fp";
import { join } from "pathe";
import { sync as rimrafSync } from "rimraf";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { betterMkdir } from "#/modules/files/betterMkdir";

const testDirPath = join(process.cwd(), "test-dir");

beforeAll(async () => {
  await fs.promises.mkdir(testDirPath, { recursive: true });
});

afterAll(() => {
  console.log(">>", testDirPath);
  rimrafSync(testDirPath);
});

describe("betterMkdir", () => {
  it("non exists directory mkdir", async () => {
    await betterMkdir(join(testDirPath, "11"));
    expect(existsSync(join(testDirPath, "11"))).toBeTruthy();
  });

  it("already exists directory mkdir", async () => {
    await betterMkdir(join(testDirPath));
    expect(existsSync(join(testDirPath))).toBeTruthy();
  });

  it("non exists directory mkdir using filename", async () => {
    await betterMkdir(join(testDirPath, "33", "test.txt"));
    expect(existsSync(join(testDirPath, "33"))).toBeTruthy();
  });
});
