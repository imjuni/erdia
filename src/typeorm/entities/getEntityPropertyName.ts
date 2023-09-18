import type IEntityRecord from '#/databases/interfaces/IEntityRecord';
import type { EntityMetadata } from 'typeorm';

/**
 * 엔티티 메타 데이터를 받아서 다이어그램에서 사용할 이름을 반환한다.
 * 괄호나 엘리어스를 표시할 수 있는 방법이 없어서 테이블 이름을 사용한다.
 * 테이블 이름이 없는 경우에만 엔티티 이름을 사용한다.
 *
 * @param entityMeta 엔티티 메타 데이터
 * @returns entity name in CF-ER Diagram
 */
export default function getEntityPropertyName(entityMeta: Pick<EntityMetadata, 'tableName' | 'name'> | IEntityRecord) {
  if ('$kind' in entityMeta) {
    if (entityMeta.name == null || entityMeta.name === '') {
      return entityMeta.dbName;
    }

    return entityMeta.name;
  }

  const { tableName, name } = entityMeta;

  if (name == null || name === '') {
    return tableName;
  }

  return name;
}
