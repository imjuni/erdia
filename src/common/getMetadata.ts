import dayjs from 'dayjs';
import readPkg from 'read-pkg';
import getProjectName from 'src/common/getProjectName';
import getVersion from 'src/common/getVersion';
import type IBuildCommandOption from 'src/configs/interfaces/IBuildCommandOption';
import type IRecordMetadata from 'src/databases/interfaces/IRecordMetadata';

export default async function getMetadata(
  dataSource: { options: { database?: string | Uint8Array | undefined } },
  option: Pick<IBuildCommandOption, 'projectName' | 'versionFrom' | 'versionPath' | 'title'>,
): Promise<IRecordMetadata> {
  const json = await readPkg({ normalize: false });
  const name = await getProjectName(dataSource, json, option);
  const { version } = await getVersion(json, option);

  return {
    name,
    title: option.title,
    version,
    createdAt: dayjs().format(),
    updatedAt: dayjs().format(),
  };
}
