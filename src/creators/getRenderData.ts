import { compareVersions } from "compare-versions";

import { CE_OUTPUT_FORMAT } from "#/configs/const-enum/CE_OUTPUT_FORMAT";
import type { IBuildCommandOption } from "#/configs/interfaces/IBuildCommandOption";
import { CE_RECORD_KIND } from "#/databases/const-enum/CE_RECORD_KIND";
import type { IColumnRecord } from "#/databases/interfaces/IColumnRecord";
import type { IEntityRecord } from "#/databases/interfaces/IEntityRecord";
import type { IEntityWithColumnAndRelationAndIndex } from "#/databases/interfaces/IEntityWithColumnAndRelationAndIndex";
import type { IIndexRecord } from "#/databases/interfaces/IIndexRecord";
import type { IRecordMetadata } from "#/databases/interfaces/IRecordMetadata";
import type { IRelationRecord } from "#/databases/interfaces/IRelationRecord";
import type { IRenderData } from "#/databases/interfaces/IRenderData";
import type { TDatabaseRecord } from "#/databases/interfaces/TDatabaseRecord";
import { getSlashEndRoutePath } from "#/modules/getSlashEndRoutePath";

export async function getRenderData(
  records: TDatabaseRecord[],
  metadata: IRecordMetadata,
  option: Omit<IBuildCommandOption, "config">,
): Promise<IRenderData> {
  const recordsByVersion = new Map<
    string,
    {
      entities: IEntityRecord[];
      children: Map<
        string,
        {
          columns: IColumnRecord[];
          relations: IRelationRecord[];
          indices: IIndexRecord[];
        }
      >;
    }
  >();

  for (const record of records) {
    let group = recordsByVersion.get(record.version);
    if (group === undefined) {
      group = { entities: [], children: new Map() };
      recordsByVersion.set(record.version, group);
    }
    if (record.$kind === CE_RECORD_KIND.ENTITY) {
      group.entities.push(record);
      continue;
    }
    let children = group.children.get(record.entity);
    if (children === undefined) {
      children = { columns: [], relations: [], indices: [] };
      group.children.set(record.entity, children);
    }
    switch (record.$kind) {
      case CE_RECORD_KIND.COLUMN:
        children.columns.push(record);
        break;
      case CE_RECORD_KIND.RELATION:
        children.relations.push(record);
        break;
      case CE_RECORD_KIND.INDEX:
        children.indices.push(record);
        break;
    }
  }

  const versions = [...recordsByVersion.keys()].sort(
    option.versionFrom === "timestamp"
      ? (l, r) => r.localeCompare(l)
      : (l, r) => compareVersions(r, l),
  );
  const renderDatas = versions.map((version) => {
    const group = recordsByVersion.get(version)!;
    const entities: IEntityWithColumnAndRelationAndIndex[] = group.entities.map((entity) => ({
      ...entity,
      ...(group.children.get(entity.entity) ?? { columns: [], relations: [], indices: [] }),
    }));
    return { version, entities, latest: version === metadata.version };
  });

  if (option.format === CE_OUTPUT_FORMAT.HTML) {
    return {
      versions: renderDatas,
      option: {
        ...option,
        routeBasePath:
          option.routeBasePath == null ? undefined : getSlashEndRoutePath(option.routeBasePath),
      },
      metadata,
    };
  }

  return { versions: renderDatas, option, metadata };
}
