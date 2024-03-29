import { getProjectName } from '#/common/getProjectName';
import { getVersion } from '#/common/getVersion';
import type { IBuildCommandOption } from '#/configs/interfaces/IBuildCommandOption';
import type { IRecordMetadata } from '#/databases/interfaces/IRecordMetadata';
import dayjs from 'dayjs';
import filenamify from 'filenamify';
import readPkg from 'read-pkg';

export async function getMetadata(
  dataSource: { options: { database?: string | Uint8Array | undefined } },
  option: Pick<IBuildCommandOption, 'projectName' | 'versionFrom' | 'versionPath' | 'title'>,
): Promise<IRecordMetadata> {
  const json = await readPkg({ normalize: false });
  const rawName = await getProjectName(dataSource, json, option);
  const name = filenamify(rawName, { replacement: '_' });
  const { version } = await getVersion(json, option);

  return {
    name,
    title: option.title,
    version,
    createdAt: dayjs().format(),
    updatedAt: dayjs().format(),
  };
}
