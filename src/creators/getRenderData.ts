import { CE_OUTPUT_FORMAT } from '#configs/const-enum/CE_OUTPUT_FORMAT';
import type IBuildCommandOption from '#configs/interfaces/IBuildCommandOption';
import type IColumnRecord from '#databases/interfaces/IColumnRecord';
import type IEntityRecord from '#databases/interfaces/IEntityRecord';
import type IEntityWithColumnAndRelation from '#databases/interfaces/IEntityWithColumnAndRelation';
import type IRecordMetadata from '#databases/interfaces/IRecordMetadata';
import type IRelationRecord from '#databases/interfaces/IRelationRecord';
import type IRenderData from '#databases/interfaces/IRenderData';
import type TDatabaseRecord from '#databases/interfaces/TDatabaseRecord';
import getSlashEndRoutePath from '#tools/getSlashEndRoutePath';
import alasql from 'alasql';
import { compareVersions } from 'compare-versions';

export default async function getRenderData(
  records: TDatabaseRecord[],
  metadata: IRecordMetadata,
  option: IBuildCommandOption,
): Promise<IRenderData> {
  const versionRows = (await alasql.promise('SELECT DISTINCT version FROM ?', [records])) as {
    version: string;
  }[];

  const unSortedVersions = versionRows.map((version) => version.version);
  const versions =
    option.versionFrom === 'timestamp'
      ? unSortedVersions.sort((l, r) => r.localeCompare(l))
      : unSortedVersions.sort((l, r) => compareVersions(r, l));

  const renderDatas = await Promise.all(
    versions.map(async (version) => {
      const entities = (await alasql.promise(`SELECT * FROM ? WHERE [$kind] = ? AND version = ?`, [
        records,
        'entity',
        version,
      ])) as IEntityRecord[];

      const renderData: IEntityWithColumnAndRelation[] = await Promise.all(
        entities.map(async (entity) => {
          const [columns, relations] = await Promise.all([
            (await alasql.promise('SELECT * FROM ? WHERE [$kind] = ? AND entity = ? AND version = ?', [
              records,
              'column',
              entity.entity,
              version,
            ])) as IColumnRecord[],

            (await alasql.promise('SELECT * FROM ? WHERE [$kind] = ? AND entity = ? AND version = ?', [
              records,
              'relation',
              entity.entity,
              version,
            ])) as IRelationRecord[],
          ]);

          return { ...entity, columns, relations } satisfies IEntityWithColumnAndRelation;
        }),
      );

      return { version, entities: renderData, latest: version === metadata.version };
    }),
  );

  if (option.format === CE_OUTPUT_FORMAT.HTML) {
    return {
      versions: renderDatas,
      option: {
        ...option,
        routeBasePath: option.routeBasePath != null ? getSlashEndRoutePath(option.routeBasePath) : undefined,
      },
      metadata,
    };
  }

  return { versions: renderDatas, option, metadata };
}
