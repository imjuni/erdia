import type IBuildCommandOption from '#/configs/interfaces/IBuildCommandOption';
import type IRecordMetadata from '#/databases/interfaces/IRecordMetadata';
import type TDatabaseRecord from '#/databases/interfaces/TDatabaseRecord';
import alasql from 'alasql';
import { compareVersions } from 'compare-versions';
import { atOrThrow } from 'my-easy-fp';

export default async function processDatabase(
  metadata: IRecordMetadata,
  db: TDatabaseRecord[],
  option: Pick<IBuildCommandOption, 'versionFrom'>,
): Promise<{ next: TDatabaseRecord[]; deleted: TDatabaseRecord[]; prev: TDatabaseRecord[] }> {
  // case 01. empty database, first create database
  if (db.length <= 0) {
    return { next: [], deleted: [], prev: [] };
  }

  const currentVersion = metadata.version;
  const versions = (await alasql.promise('SELECT DISTINCT version FROM ?', [db])) as {
    version: string;
  }[];

  const sortedVersions =
    option.versionFrom === 'timestamp'
      ? versions.sort((l, r) => r.version.localeCompare(l.version))
      : versions.sort((l, r) => compareVersions(r.version, l.version));

  const firstVersionFromDb = atOrThrow(sortedVersions, 0).version;

  // case 02. different version between current and latest from database
  if (currentVersion !== firstVersionFromDb) {
    const latestRecords = (await alasql.promise('SELECT * FROM ? WHERE version = ?', [
      db,
      firstVersionFromDb,
    ])) as TDatabaseRecord[];

    return { next: db, deleted: [], prev: latestRecords };
  }

  // case 03. database have only one version, but one version same current version
  if (sortedVersions.length <= 1) {
    return { next: [], deleted: [], prev: [] };
  }

  const secondVersionFromDb = atOrThrow(sortedVersions, 1).version;

  // case 04. same version between current and latest from database
  // in this case, update current version records in database
  const partialRecords = (await alasql.promise('SELECT * FROM ? WHERE version != ?', [
    db,
    currentVersion,
  ])) as TDatabaseRecord[];

  const oldRecords = (await alasql.promise('SELECT * FROM ? WHERE version = ?', [
    db,
    currentVersion,
  ])) as TDatabaseRecord[];

  const latestRecords = (await alasql.promise('SELECT * FROM ? WHERE version = ?', [
    db,
    secondVersionFromDb,
  ])) as TDatabaseRecord[];

  return { next: partialRecords, deleted: oldRecords, prev: latestRecords };
}
