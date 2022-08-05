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
  const joinColumn = relationMetadata.joinColumns.find(
    (column) => getSelectedEntityName(column.entityMetadata) === getSelectedEntityName(relationMetadata.entityMetadata),
  );

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
  const joinTable = relationMetadata.joinTableName;
  const joinColumn = relationMetadata.joinColumns.find(
    (column) => getSelectedEntityName(column.entityMetadata) === joinTable,
  );
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

  const inverseJoinTable = manyToManyRelation.joinTableName;
  const inverseJoinColumn = manyToManyRelation.joinColumns.find(
    (column) => getSelectedEntityName(column.entityMetadata) === inverseJoinTable,
  );

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
    const joinColumn = relationMetadata.joinColumns.find(
      (column) =>
        getSelectedEntityName(column.entityMetadata) === getSelectedEntityName(relationMetadata.entityMetadata),
    );

    if (isNotEmpty(joinColumn)) {
      return {
        inverseJoinColumnOne: true,
        inverseJoinColumnNullable: joinColumn.isNullable,
        joinPropertyName: joinColumn.propertyName,
        joinColumnName: joinColumn.databaseName,
      };
    }

    const entityName = getSelectedEntityName(relationMetadata.entityMetadata);
    const inverseRelationMetadata = relationMetadata.inverseEntityMetadata.oneToOneRelations.find(
      (oneToOneRelation) => {
        return getSelectedEntityName(oneToOneRelation.inverseEntityMetadata) === entityName;
      },
    );

    if (isEmpty(inverseRelationMetadata)) {
      throw new Error(`Invalid joinColumn detected: ${relationMetadata.propertyName}`);
    }

    const inverseJoinColumn = inverseRelationMetadata.joinColumns.find(
      (column) =>
        getSelectedEntityName(column.entityMetadata) === getSelectedEntityName(inverseRelationMetadata.entityMetadata),
    );

    if (isEmpty(inverseJoinColumn)) {
      throw new Error(`Invalid joinColumn detected: ${relationMetadata.propertyName}`);
    }

    return {
      inverseJoinColumnOne: true,
      inverseJoinColumnNullable: inverseRelationMetadata.isNullable,
      joinPropertyName: inverseJoinColumn.propertyName,
      joinColumnName: inverseJoinColumn.databaseName,
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
