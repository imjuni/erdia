import type { Glob, GlobOptions } from "glob";
import { join } from "pathe";

export const getGlobFiles = <T extends GlobOptions>(
  glob: Glob<T>
): string[] => {
  const filePathSet = new Set<string>();
  for (const filePath of glob) {
    filePathSet.add(
      typeof filePath === "string"
        ? filePath
        : join(filePath.path, filePath.name)
    );
  }
  return [...filePathSet];
};
