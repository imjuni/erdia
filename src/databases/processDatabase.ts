import { compareVersions } from "compare-versions";
import { atOrThrow } from "my-easy-fp";

import type { IBuildCommandOption } from "#/configs/interfaces/IBuildCommandOption";
import type { IRecordMetadata } from "#/databases/interfaces/IRecordMetadata";
import type { TDatabaseRecord } from "#/databases/interfaces/TDatabaseRecord";

export async function processDatabase(
  metadata: IRecordMetadata,
  db: TDatabaseRecord[],
  option: Pick<IBuildCommandOption, "versionFrom">,
): Promise<{
  next: TDatabaseRecord[];
  deleted: TDatabaseRecord[];
  prev: TDatabaseRecord[];
}> {
  // case 01. empty database, first create database
  if (db.length <= 0) {
    return { next: [], deleted: [], prev: [] };
  }

  const currentVersion = metadata.version;
  const versions = [...new Set(db.map((record) => record.version))];
  const sortedVersions =
    option.versionFrom === "timestamp"
      ? versions.sort((l, r) => r.localeCompare(l))
      : versions.sort((l, r) => compareVersions(r, l));

  const firstVersionFromDb = atOrThrow(sortedVersions, 0);

  // case 02. different version between current and latest from database
  if (currentVersion !== firstVersionFromDb) {
    const latestRecords = db.filter((record) => record.version === firstVersionFromDb);

    return { next: db, deleted: [], prev: latestRecords };
  }

  // case 03. database have only one version, but one version same current version
  if (sortedVersions.length <= 1) {
    return { next: [], deleted: [], prev: [] };
  }

  const secondVersionFromDb = atOrThrow(sortedVersions, 1);

  // case 04. same version between current and latest from database
  // in this case, update current version records in database
  const partialRecords = db.filter((record) => record.version !== currentVersion);
  const oldRecords = db.filter((record) => record.version === currentVersion);
  const latestRecords = db.filter((record) => record.version === secondVersionFromDb);

  return { next: partialRecords, deleted: oldRecords, prev: latestRecords };
}
