import { CE_OUTPUT_FORMAT } from '#/configs/const-enum/CE_OUTPUT_FORMAT';
import type { IBuildCommandOption } from '#/configs/interfaces/IBuildCommandOption';
import { CE_RECORD_KIND } from '#/databases/const-enum/CE_RECORD_KIND';
import type { IColumnRecord } from '#/databases/interfaces/IColumnRecord';
import type { IEntityRecord } from '#/databases/interfaces/IEntityRecord';
import type { IEntityWithColumnAndRelationAndIndex } from '#/databases/interfaces/IEntityWithColumnAndRelationAndIndex';
import type { IIndexRecord } from '#/databases/interfaces/IIndexRecord';
import type { IRecordMetadata } from '#/databases/interfaces/IRecordMetadata';
import type { IRelationRecord } from '#/databases/interfaces/IRelationRecord';
import type { IRenderData } from '#/databases/interfaces/IRenderData';
import type { TDatabaseRecord } from '#/databases/interfaces/TDatabaseRecord';
import { getSlashEndRoutePath } from '#/tools/getSlashEndRoutePath';
import alasql from 'alasql';
import { compareVersions } from 'compare-versions';

export async function getRenderData(
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

      const renderData: IEntityWithColumnAndRelationAndIndex[] = await Promise.all(
        entities.map(async (entity) => {
          const [columns, relations, indices] = await Promise.all([
            (await alasql.promise('SELECT * FROM ? WHERE [$kind] = ? AND entity = ? AND version = ?', [
              records,
              CE_RECORD_KIND.COLUMN,
              entity.entity,
              version,
            ])) as IColumnRecord[],

            (await alasql.promise('SELECT * FROM ? WHERE [$kind] = ? AND entity = ? AND version = ?', [
              records,
              CE_RECORD_KIND.RELATION,
              entity.entity,
              version,
            ])) as IRelationRecord[],

            (await alasql.promise('SELECT * FROM ? WHERE [$kind] = ? AND entity = ? AND version = ?', [
              records,
              CE_RECORD_KIND.INDEX,
              entity.entity,
              version,
            ])) as IIndexRecord[],
          ]);

          return { ...entity, columns, relations, indices } satisfies IEntityWithColumnAndRelationAndIndex;
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
