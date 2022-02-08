import { EntityMetadata } from 'typeorm';
import { RelationMetadata } from 'typeorm/metadata/RelationMetadata';

const getInverseEntityIsNullable = ({
  entityMeta,
  relationMeta,
}: {
  entityMeta: EntityMetadata;
  relationMeta: RelationMetadata;
}): boolean => {
  const inverseEntityMeta = relationMeta.inverseEntityMetadata;
  const inverseRelationMeta = inverseEntityMeta.relations.find(
    (relation) => relation.inverseEntityMetadata.name === entityMeta.name,
  );

  // mermaid.js는 단일 릴레이션을 표현할 수 없다. ----o| 와 같은 차트를 그릴 수 없다
  // 그래서 one-to-one 같은 경우, 한쪽 엔티티에서만 relation을 설정한 경우 아래와 같이
  // inverseRelationMeta를 얻을 수 없기 때문에 그릴 수 없는 차트를 그려야한다. 그래서
  // 이것을 그릴 수 있도록 아래와 같이 false를 전달해야 한다.
  if (inverseRelationMeta === undefined || inverseRelationMeta === null) {
    // throw new Error(`Cannot find inverseRelationMeta: ${inverseEntityMeta.name}`);
    return false;
  }

  return inverseRelationMeta.isNullable;
};

export default getInverseEntityIsNullable;
