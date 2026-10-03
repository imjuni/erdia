import path from "node:path";

import { describe, expect, it } from "vitest";

import { loadDrizzleSchema } from "#/loaders/drizzle/connections/loadDrizzleSchema";

describe(loadDrizzleSchema, () => {
  it("loads tables exported by a Drizzle schema module", async () => {
    const schema = await loadDrizzleSchema(
      path.resolve("examples/drizzle/schema.ts")
    );

    expect(Object.keys(schema)).toEqual(
      expect.arrayContaining(["users", "photos", "licenses"])
    );
  });

  it("rejects a module without Drizzle tables", async () => {
    await expect(
      loadDrizzleSchema(path.resolve("examples/drizzle/drizzle.config.ts"))
    ).rejects.toThrow("does not export any tables");
  });
});
