import logger from '@tool/logger';
import getRelationData from '@typeorm/getRelationData';
import getSelectedEntityName from '@typeorm/getSelectedEntityName';
import { DataSource } from 'typeorm';

const log = logger();

export default function getRelationDatas(dataSource: DataSource): ReturnType<typeof getRelationData>[] {
  const relationDatas = dataSource.entityMetadatas
    .map((entityMetadata) => {
      log.debug(`Entity: ${getSelectedEntityName(entityMetadata)}, Length: ${entityMetadata.relations.length}`);
      return entityMetadata.relations.map((relation) => getRelationData(dataSource.entityMetadatas, relation));
    })
    .flat();

  return relationDatas;
}
