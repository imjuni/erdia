import * as mnf from "my-node-fp";
import { join } from "pathe";
import { describe, expect, it, vitest } from "vitest";

import { getTemplatePath } from "#/templates/modules/getTemplatePath";

vitest.mock("my-node-fp", async (importOriginal) => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  const mod = await importOriginal<typeof import("my-node-fp")>();
  return {
    ...mod,
  };
});

describe(getTemplatePath, () => {
  it("cannot template path", async () => {
    const handle = vitest
      .spyOn(mnf, "exists")
      .mockImplementationOnce(() => Promise.resolve(false))
      .mockImplementationOnce(() => Promise.resolve(false));

    await expect(getTemplatePath()).rejects.toThrowError();

    handle.mockRestore();
  });

  it("template path based on cwd", async () => {
    const cwdTemplatePath = join(process.cwd(), "templates");
    const templatePath = await getTemplatePath(cwdTemplatePath);
    expect(templatePath).toEqual(cwdTemplatePath);
  });

  it("template path based on the module directory", async () => {
    const dirnameTemplatePath = join(
      process.cwd(),
      "src",
      "templates",
      "modules",
      "getTemplatePath.ts"
    );
    const templatePath = await getTemplatePath("getTemplatePath.ts");
    expect(templatePath).toEqual(dirnameTemplatePath);
  });

  it("template path based on 3 step parent directory", async () => {
    const dirnameTemplatePath = join(process.cwd(), "templates");
    const templatePath = await getTemplatePath(
      "1110a038cb804e8fac8161070a601f66"
    );
    expect(templatePath).toEqual(dirnameTemplatePath);
  });

  it("template path based on 1 step parent directory, in distribution directory", async () => {
    vitest
      .spyOn(mnf, "exists")
      .mockImplementationOnce(() => Promise.resolve(false))
      .mockImplementationOnce(() => Promise.resolve(false))
      .mockImplementationOnce(() => Promise.resolve(false))
      .mockImplementationOnce(() => Promise.resolve(true));

    const dirnameTemplatePath = join(process.cwd(), "src", "templates");
    const templatePath = await getTemplatePath(
      "1110a038cb804e8fac8161070a601f66"
    );
    expect(templatePath).toEqual(dirnameTemplatePath);
  });
});
