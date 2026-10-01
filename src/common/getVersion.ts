import fs from "node:fs";

import dayjs from "dayjs";
import { join } from "pathe";

import { getFileVersion } from "#/common/getFileVersion";
import { CE_DEFAULT_VALUE } from "#/configs/const-enum/CE_DEFAULT_VALUE";
import type { IBuildCommandOption } from "#/configs/interfaces/IBuildCommandOption";
import { getCwd } from "#/configs/modules/getCwd";
import { getFindFile } from "#/modules/files/getFindFile";
import { getOutputDirPath } from "#/modules/files/getOutputDirPath";

const getVersionFilename = async (
  option: Pick<IBuildCommandOption, "versionFrom" | "versionPath">,
  versionFilename: string
) => {
  if (option.versionPath !== null && option.versionPath !== undefined) {
    const filename = await getFindFile(
      join(
        await getOutputDirPath(
          { output: option.versionPath },
          getCwd(process.env)
        ),
        versionFilename
      ),
      { cwd: getCwd(process.env) }
    );
    return filename;
  }
  const filename = await getFindFile(versionFilename, {
    cwd: getCwd(process.env),
  });
  return filename;
};
export const getVersion = async (
  json: Record<string, unknown>,
  option: Pick<IBuildCommandOption, "versionFrom" | "versionPath">
): Promise<{
  version: string;
}> => {
  if (option.versionFrom === "package.json") {
    const { version } = json;
    if (
      !(typeof version === "string") ||
      version === null ||
      version === undefined
    ) {
      throw new Error(`Cannot found version field in package.json`);
    }
    return { version };
  }
  if (option.versionFrom === "file") {
    const getVersionFile = async () => {
      const filename = await getVersionFilename(
        option,
        CE_DEFAULT_VALUE.VERSION_FILENAME
      );
      if (filename !== null && filename !== undefined) {
        return filename;
      }
      const fromConfig = await getVersionFilename(
        option,
        CE_DEFAULT_VALUE.CONFIG_FILE_NAME
      );
      return fromConfig;
    };
    const versionFilename = await getVersionFile();
    if (versionFilename === null || versionFilename === undefined) {
      throw new Error(
        `Cannot found version file: ${CE_DEFAULT_VALUE.VERSION_FILENAME}`
      );
    }
    const versionBuf = await fs.promises.readFile(versionFilename);
    const version = getFileVersion(versionBuf);
    return { version: version.trim() };
  }
  return { version: `${dayjs().valueOf()}` };
};
