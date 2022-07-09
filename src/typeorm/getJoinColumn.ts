import logger from '@tool/logger';
import getSelectedEntityName from '@typeorm/getSelectedEntityName';
import IRelationData from '@typeorm/interface/IRelationData';
import { isEmpty, isNotEmpty } from 'my-easy-fp';
import { RelationMetadata } from 'typeorm/metadata/RelationMetadata';

const log = logger();

function getInverseRelationMetadata(relationMetadata: RelationMetadata) {
  const entityName = getSelectedEntityName(relationMetadata.entityMetadata);
  const inverseRelationMetadata = relationMetadata.inverseEntityMetadata.relations.find(
    (relation) => getSelectedEntityName(relation.inverseEntityMetadata) === entityName,
  );

  if (inverseRelationMetadata === undefined || inverseRelationMetadata === null) {
    throw new Error(
      `Cannot found relation from inverse entity metadata: ${relationMetadata.inverseEntityMetadata.name}`,
    );
  }

  return inverseRelationMetadata;
}

function getManyToOneJoinColumn(
  relationMetadata: RelationMetadata,
): Pick<IRelationData, 'joinColumnName' | 'joinPropertyName' | 'inverseJoinColumnNullable'> {
  const [joinColumn] = relationMetadata.joinColumns;

  if (isEmpty(joinColumn)) {
    throw new Error(`Invalid joinColumn detected: ${relationMetadata.propertyName}`);
  }

  return {
    inverseJoinColumnNullable: joinColumn.isNullable,
    joinPropertyName: joinColumn.propertyName,
    joinColumnName: joinColumn.databaseName,
  };
}

function getManyToManyJoinColumn(
  relationMetadata: RelationMetadata,
): Pick<IRelationData, 'joinColumnName' | 'joinPropertyName' | 'inverseJoinColumnOne' | 'inverseJoinColumnNullable'> {
  const joinColumn = relationMetadata.joinColumns.at(0);
  const inverseRelationMetadata = getInverseRelationMetadata(relationMetadata);

  if (isNotEmpty(joinColumn)) {
    log.debug(`M:N entity: ${joinColumn.propertyName}-${relationMetadata.joinTableName}`);

    return {
      inverseJoinColumnOne: false,
      inverseJoinColumnNullable: inverseRelationMetadata.isNullable,
      joinPropertyName: joinColumn.propertyName,
      joinColumnName: relationMetadata.joinTableName,
    };
  }

  const entityName = getSelectedEntityName(relationMetadata.entityMetadata);

  const manyToManyRelation = relationMetadata.inverseEntityMetadata.manyToManyRelations.find(
    (manyToOneRelationMetadata) => {
      const inverseEntityName = getSelectedEntityName(manyToOneRelationMetadata.inverseEntityMetadata);
      return inverseEntityName === entityName;
    },
  );

  if (manyToManyRelation === undefined || manyToManyRelation === null) {
    throw new Error(`Cannot found relation on many-to-many side: ${relationMetadata.entityMetadata.name}`);
  }

  const [inverseJoinColumn] = manyToManyRelation.joinColumns;

  if (inverseJoinColumn === undefined || inverseJoinColumn === null) {
    throw new Error(`Cannot found join-column on many-to-many side: ${manyToManyRelation.entityMetadata.name}`);
  }

  return {
    inverseJoinColumnOne: false,
    inverseJoinColumnNullable: inverseRelationMetadata.isNullable,
    joinPropertyName: inverseJoinColumn.propertyName,
    joinColumnName: manyToManyRelation.joinTableName,
  };
}

export default function getJoinColumn(
  relationMetadata: RelationMetadata,
): Pick<IRelationData, 'joinColumnName' | 'joinPropertyName' | 'inverseJoinColumnOne' | 'inverseJoinColumnNullable'> {
  if (relationMetadata.relationType === 'one-to-one') {
    const [joinColumn] = relationMetadata.joinColumns;

    if (isEmpty(joinColumn)) {
      throw new Error(`Invalid joinColumn detected: ${relationMetadata.propertyName}`);
    }

    return {
      inverseJoinColumnOne: true,
      inverseJoinColumnNullable: joinColumn.isNullable,
      joinPropertyName: joinColumn.propertyName,
      joinColumnName: joinColumn.databaseName,
    };
  }

  if (relationMetadata.relationType === 'many-to-one') {
    return { ...getManyToOneJoinColumn(relationMetadata), inverseJoinColumnOne: true };
  }

  if (relationMetadata.relationType === 'one-to-many') {
    const oneEntityName = getSelectedEntityName(relationMetadata.entityMetadata);

    const manyToOneRelation = relationMetadata.inverseEntityMetadata.manyToOneRelations.find(
      (manyToOneRelationMetadata) => {
        const entityName = getSelectedEntityName(manyToOneRelationMetadata.inverseEntityMetadata);
        return entityName === oneEntityName;
      },
    );

    if (manyToOneRelation === undefined || manyToOneRelation === null) {
      throw new Error(`Cannot found relation on many-to-one side: ${relationMetadata.entityMetadata.name}`);
    }

    return { ...getManyToOneJoinColumn(manyToOneRelation), inverseJoinColumnOne: false };
  }

  if (relationMetadata.relationType === 'many-to-many') {
    return getManyToManyJoinColumn(relationMetadata);
  }

  return {
    inverseJoinColumnOne: true,
    inverseJoinColumnNullable: false,
    joinPropertyName: '',
    joinColumnName: '',
  };
}
