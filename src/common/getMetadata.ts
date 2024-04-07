import { getProjectName } from '#/common/getProjectName';
import { getVersion } from '#/common/getVersion';
import type { IBuildCommandOption } from '#/configs/interfaces/IBuildCommandOption';
import type { IRecordMetadata } from '#/databases/interfaces/IRecordMetadata';
import { container } from '#/modules/containers/container';
import { SymbolDataSource } from '#/modules/containers/keys/SymbolDataSource';
import dayjs from 'dayjs';
import filenamify from 'filenamify';
import readPkg from 'read-pkg';
import type { DataSource } from 'typeorm';

export async function getMetadata(
  option: Pick<IBuildCommandOption, 'projectName' | 'versionFrom' | 'versionPath' | 'title'>,
): Promise<IRecordMetadata> {
  const dataSource = container.resolve<DataSource>(SymbolDataSource);
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
