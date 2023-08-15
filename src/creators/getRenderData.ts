import type IBuildCommandOption from '#configs/interfaces/IBuildCommandOption';
import type IColumnRecord from '#databases/interfaces/IColumnRecord';
import type IEntityRecord from '#databases/interfaces/IEntityRecord';
import type IEntityWithColumnAndRelation from '#databases/interfaces/IEntityWithColumnAndRelation';
import type IRecordMetadata from '#databases/interfaces/IRecordMetadata';
import type IRelationRecord from '#databases/interfaces/IRelationRecord';
import type TDatabaseRecord from '#databases/interfaces/TDatabaseRecord';
import alasql from 'alasql';

export default async function getRenderData(
  records: TDatabaseRecord[],
  metadata: IRecordMetadata,
  option: IBuildCommandOption,
) {
  const entities = (await alasql.promise(`SELECT * FROM ? WHERE [$kind] = ? AND version = ?`, [
    records,
    'entity',
    metadata.version,
  ])) as IEntityRecord[];

  const renderData: IEntityWithColumnAndRelation[] = await Promise.all(
    entities.map(async (entity) => {
      const [columns, relations] = await Promise.all([
        (await alasql.promise('SELECT * FROM ? WHERE [$kind] = ? AND entity = ? AND version = ?', [
          records,
          'column',
          entity.entity,
          metadata.version,
        ])) as IColumnRecord[],

        (await alasql.promise('SELECT * FROM ? WHERE [$kind] = ? AND entity = ? AND version = ?', [
          records,
          'relation',
          entity.entity,
          metadata.version,
        ])) as IRelationRecord[],
      ]);

      return { ...entity, columns, relations } satisfies IEntityWithColumnAndRelation;
    }),
  );

  return { entities: renderData, option, metadata };
}
