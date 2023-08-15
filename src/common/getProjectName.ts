import getDatabaseName from '#common/getDatabaseName';
import getPackageName from '#common/getPackageName';
import type IBuildCommandOption from '#configs/interfaces/IBuildCommandOption';

export default async function getProjectName(
  dataSource: { options: { database?: string | Uint8Array | undefined } },
  json: Record<string, unknown>,
  option: Pick<IBuildCommandOption, 'projectName'>,
) {
  if (option.projectName === 'db') {
    if (dataSource.options.database != null) {
      const databaseName = getDatabaseName(dataSource.options);
      return databaseName;
    }

    const name = getPackageName(json);
    return name;
  }

  const name = getPackageName(json);
  return name;
}
