import getEntityName from '@common/getEntityName';
import getInverseEntityIsNullable from '@creator/getInverseEntityIsNullable';
import getRelationConnectionSign from '@creator/getRelationConnectionSign';
import getRelationPostfixDesc from '@creator/getRelationPostfixDesc';
import os from 'os';
import { RelationMetadata } from 'typeorm/metadata/RelationMetadata';

const getRelationDiagram = (relationMeta: RelationMetadata): string => {
  const entityMeta = relationMeta.entityMetadata;

  const columnIsNullable = relationMeta.isNullable;
  const inverseColumnIsNullable = getInverseEntityIsNullable({
    entityMeta,
    relationMeta,
  });

  const relationConnectionSign = getRelationConnectionSign(
    relationMeta.relationType,
    columnIsNullable,
    inverseColumnIsNullable,
  );

  const relationPostfixDesc = getRelationPostfixDesc(relationMeta);

  if (relationMeta.relationType === 'many-to-many') {
    const manyToManyTable = relationMeta.joinTableName;
    const manyToManyRelationConnectionSign = getRelationConnectionSign('one-to-many', false, false);

    return [
      `${getEntityName(entityMeta)} ${manyToManyRelationConnectionSign} ${manyToManyTable} : ${'" "'}`,
      `${getEntityName(
        relationMeta.inverseEntityMetadata,
      )} ${manyToManyRelationConnectionSign} ${manyToManyTable} : ${'" "'}`,
      `${getEntityName(entityMeta)} ${relationConnectionSign} ${getEntityName(
        relationMeta.inverseEntityMetadata,
      )} : ${relationPostfixDesc}`,
    ].join(os.EOL);
  }

  return `${getEntityName(entityMeta)} ${relationConnectionSign} ${getEntityName(
    relationMeta.inverseEntityMetadata,
  )} : ${relationPostfixDesc}`;
};

export default getRelationDiagram;
