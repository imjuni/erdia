import getRelationHash from '@common/getRelationHash';
import IReason from '@creator/interface/IReason';
import logger from '@tool/logger';
import getSelectedEntityName from '@typeorm/getSelectedEntityName';
import IRelationData from '@typeorm/interface/IRelationData';
import { isError } from 'my-easy-fp';
import { fail, pass, PassFailEither } from 'my-only-either';
import { EntityMetadata } from 'typeorm';
import { RelationMetadata } from 'typeorm/metadata/RelationMetadata';
import getJoinColumn from './getJoinColumn';

const log = logger();

function getManyToManyEntityMetadata(entityMetadatas: EntityMetadata[], relationMetadata: RelationMetadata) {
  const entityName = getSelectedEntityName(relationMetadata.entityMetadata);
  const { joinTableName } = relationMetadata;
  const joinEntityMetadata = entityMetadatas.find((entityMetadata) => entityMetadata.name === joinTableName);

  if (joinEntityMetadata !== undefined && joinEntityMetadata !== null) {
    return joinEntityMetadata;
  }

  const manyToManyRelation = relationMetadata.inverseEntityMetadata.manyToManyRelations.find(
    (manyToOneRelationMetadata) => {
      const inverseEntityName = getSelectedEntityName(manyToOneRelationMetadata.inverseEntityMetadata);
      return inverseEntityName === entityName;
    },
  );

  if (manyToManyRelation === undefined || manyToManyRelation === null) {
    throw new Error('many-to-many relations need JoinTable more than one!');
  }

  const inverseJoinTableName = manyToManyRelation.joinTableName;
  const inverseJoinEntityMetadata = entityMetadatas.find(
    (entityMetadata) => entityMetadata.name === inverseJoinTableName,
  );

  if (inverseJoinEntityMetadata === undefined || inverseJoinEntityMetadata === null) {
    throw new Error(`[many-to-many] cannot found entity: ${inverseJoinTableName}`);
  }

  return inverseJoinEntityMetadata;
}

export default function getRelationData(
  entityMetadatas: EntityMetadata[],
  relationMetadata: RelationMetadata,
): PassFailEither<IReason, IRelationData[]> {
  try {
    const entityName = getSelectedEntityName(relationMetadata.entityMetadata);
    const inverseEntityName = getSelectedEntityName(relationMetadata.inverseEntityMetadata);
    const { propertyName, relationType } = relationMetadata;
    const { joinColumnName, joinPropertyName, inverseJoinColumnOne, inverseJoinColumnNullable } =
      getJoinColumn(relationMetadata);
    const joinColumnOne = relationType === 'one-to-many' || relationType === 'one-to-one';
    const relationHash = getRelationHash({
      entityName,
      inverseEntityName,
      relationType: relationMetadata.relationType,
    });

    // 작업하면서 알게된 내용인데, relation 관계에서 isNullable은 기본 값이 true 이다
    // 그래서 false를 원하면 별도로 nullable: false 으로 전달해야 한다
    // example 디렉터리 아래 License.ts 파일 참고
    //
    // nullable option in relation(eg> ManyToOne, OneToMany, etc) have false to default
    // see license.ts file in example directory
    const joinColumnNullable = relationMetadata.isNullable;

    log.debug(`relation: [${relationMetadata.relationType}] ${entityName} -> ${inverseEntityName}`);

    if (relationType === 'many-to-many') {
      const joinEntityMetadata = getManyToManyEntityMetadata(entityMetadatas, relationMetadata);
      const joinColumn = joinEntityMetadata.columns.find((column) => column.propertyName.indexOf(entityName) >= 0);

      const relationData: IRelationData = {
        entityName,
        inverseEntityName: getSelectedEntityName(joinEntityMetadata),
        joinPropertyName: joinColumn?.propertyName ?? '',
        joinColumnName: joinColumn?.databaseName ?? '',
        joinColumnOne: true,
        joinColumnNullable: false,
        inverseJoinColumnOne: false,
        inverseJoinColumnNullable: false,
        relationType: 'one-to-many',
        relationHash: getRelationHash({
          entityName,
          inverseEntityName: getSelectedEntityName(joinEntityMetadata),
          relationType: 'one-to-many',
        }),
      };

      return pass([
        {
          entityName,
          inverseEntityName,
          propertyName,
          joinColumnName,
          joinPropertyName,
          relationHash,
          joinColumnOne,
          joinColumnNullable,
          inverseJoinColumnNullable,
          inverseJoinColumnOne,
          relationType,
        },
        relationData,
      ]);
    }

    return pass([
      {
        entityName,
        inverseEntityName,
        propertyName,
        joinColumnName,
        joinPropertyName,
        relationHash,
        joinColumnOne,
        joinColumnNullable,
        inverseJoinColumnNullable,
        inverseJoinColumnOne,
        relationType,
      },
    ]);
  } catch (catched) {
    const err = isError(catched) ?? new Error('unknown error raised from getRelationData');

    const reason: IReason = {
      columnName: 'N/A',
      entityName: getSelectedEntityName(relationMetadata.entityMetadata),
      message: `${getSelectedEntityName(relationMetadata.entityMetadata)}: ${err.message}`,
    };

    return fail(reason);
  }
}
