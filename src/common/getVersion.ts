import dayjs from 'dayjs';
import fs from 'fs';
import path from 'path';
import getFileVersion from 'src/common/getFileVersion';
import { CE_DEFAULT_VALUE } from 'src/configs/const-enum/CE_DEFAULT_VALUE';
import type IBuildCommandOption from 'src/configs/interfaces/IBuildCommandOption';
import getCwd from 'src/configs/modules/getCwd';
import getFindFile from 'src/tools/files/getFindFile';
import getOutputDirectory from 'src/tools/files/getOutputDirectory';

async function getVersionFilename(
  option: Pick<IBuildCommandOption, 'versionFrom' | 'versionPath'>,
  versionFilename: string,
) {
  if (option.versionPath != null) {
    const filename = await getFindFile(
      path.join(await getOutputDirectory({ output: option.versionPath }, getCwd(process.env)), versionFilename),
      { cwd: getCwd(process.env) },
    );

    return filename;
  }

  const filename = await getFindFile(versionFilename, { cwd: getCwd(process.env) });
  return filename;
}

export default async function getVersion(
  json: Record<string, unknown>,
  option: Pick<IBuildCommandOption, 'versionFrom' | 'versionPath'>,
): Promise<{ version: string }> {
  if (option.versionFrom === 'package.json') {
    const { version } = json;

    if (!(typeof version === 'string') || version == null) {
      throw new Error(`Cannot found version field in package.json`);
    }

    return { version };
  }

  if (option.versionFrom === 'file') {
    const getVersionFile = async () => {
      const filename = await getVersionFilename(option, CE_DEFAULT_VALUE.VERSION_FILENAME);

      if (filename != null) {
        return filename;
      }

      const fromConfig = await getVersionFilename(option, CE_DEFAULT_VALUE.CONFIG_FILE_NAME);
      return fromConfig;
    };

    const versionFilename = await getVersionFile();

    if (versionFilename == null) {
      throw new Error(`Cannot found version file: ${CE_DEFAULT_VALUE.VERSION_FILENAME}`);
    }

    const versionBuf = await fs.promises.readFile(versionFilename);
    const version = getFileVersion(versionBuf);
    return { version: version.trim() };
  }

  return { version: `${dayjs().valueOf()}` };
}
