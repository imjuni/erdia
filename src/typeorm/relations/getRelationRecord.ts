import getRelationHash from '#common/getRelationHash';
import type IReason from '#creators/interfaces/IReason';
import type IRecordMetadata from '#databases/interfaces/IRecordMetadata';
import type IRelationRecord from '#databases/interfaces/IRelationRecord';
import getEntityName from '#typeorm/entities/getEntityName';
import getEntityPropertyName from '#typeorm/entities/getEntityPropertyName';
import getJoinColumn from '#typeorm/relations/getJoinColumn';
import getManyToManyEntityMetadata from '#typeorm/relations/getManyToManyEntityMetadata';
import consola from 'consola';
import { isError } from 'my-easy-fp';
import { fail, pass, type PassFailEither } from 'my-only-either';
import type { EntityMetadata } from 'typeorm';
import type { RelationMetadata } from 'typeorm/metadata/RelationMetadata';

export default function getRelationRecord(
  entityMetadatas: EntityMetadata[],
  relationMetadata: RelationMetadata,
  metadata: IRecordMetadata,
): PassFailEither<IReason, IRelationRecord[]> {
  try {
    const entityDBName = getEntityName(relationMetadata.entityMetadata);
    const entityPropertyName = getEntityPropertyName(relationMetadata.entityMetadata);
    const inverseEntityDBName = getEntityName(relationMetadata.inverseEntityMetadata);
    const inverseEntityPropertyName = getEntityPropertyName(relationMetadata.inverseEntityMetadata);
    const { relationType } = relationMetadata;
    const { joinColumnName, joinPropertyName, inverseJoinColumnOne, inverseJoinColumnNullable, isDuplicate } =
      getJoinColumn(relationMetadata);
    const joinColumnOne = relationType === 'one-to-many' || relationType === 'one-to-one';
    const relationHash = getRelationHash({
      entity: entityDBName,
      inverseEntityName: inverseEntityDBName,
      relationType: relationMetadata.relationType,
    });

    // 작업하면서 알게된 내용인데, relation 관계에서 isNullable은 기본 값이 true 이다
    // 그래서 false를 원하면 별도로 nullable: false 으로 전달해야 한다
    // example 디렉터리 아래 License.ts 파일 참고
    //
    // nullable option in relation(eg> ManyToOne, OneToMany, etc) have false to default
    // see license.ts file in example directory
    const joinColumnNullable = relationMetadata.isNullable;

    consola.debug(`relation: [${relationMetadata.relationType}] ${entityDBName} -> ${inverseEntityDBName}`);

    if (relationType === 'many-to-many') {
      // 이거 foreign-key로 연결된다, 이걸 끄는 방법을 찾아봐야겠다
      const joinEntityMetadata = getManyToManyEntityMetadata(entityMetadatas, relationMetadata);
      const joinEntityName = getEntityName(joinEntityMetadata);
      const joinEntityPropertyName = getEntityPropertyName(joinEntityMetadata);
      const order = [entityDBName, inverseEntityDBName].sort().indexOf(entityDBName) + 1;

      const relationRecord: IRelationRecord = {
        ...metadata,
        $kind: 'relation',
        entity: entityDBName,
        name: entityPropertyName,
        dbName: entityDBName,
        inverseEntityName: inverseEntityPropertyName,
        inverseEntityDBName,
        joinColumnName,
        joinPropertyName,
        relationHash,
        joinColumnOne,
        joinColumnNullable,
        inverseJoinColumnNullable,
        inverseJoinColumnOne,
        relationType,
        order,
        isDuplicate,
      };

      const manyToManyRelationEntityRecord: IRelationRecord = {
        ...metadata,
        $kind: 'relation',
        entity: joinEntityName,
        name: joinEntityPropertyName,
        dbName: joinEntityName,
        inverseEntityName: entityPropertyName,
        inverseEntityDBName: entityDBName,
        joinPropertyName,
        joinColumnName,
        joinColumnOne: false,
        joinColumnNullable: false,
        inverseJoinColumnOne: true,
        inverseJoinColumnNullable: false,
        relationType: 'many-to-one',
        relationHash: getRelationHash({
          entity: joinEntityName,
          inverseEntityName: joinEntityName,
          relationType: 'many-to-one',
        }),
        isDuplicate: false,
        order: [joinEntityName, entityDBName].sort().indexOf(joinEntityName) + 1,
      };

      return pass([relationRecord, manyToManyRelationEntityRecord]);
    }

    return pass([
      {
        ...metadata,
        $kind: 'relation',
        entity: entityDBName,
        name: entityPropertyName,
        dbName: entityDBName,
        inverseEntityName: inverseEntityPropertyName,
        inverseEntityDBName,
        joinColumnName,
        joinPropertyName,
        relationHash,
        joinColumnOne,
        joinColumnNullable,
        inverseJoinColumnNullable,
        inverseJoinColumnOne,
        relationType,
        isDuplicate,
        order: [entityDBName, inverseEntityDBName].sort().indexOf(entityDBName) + 1,
      } satisfies IRelationRecord,
    ]);
  } catch (caught) {
    const err = isError(caught, new Error('unknown error raised from getRelationData'));

    const reason: IReason = {
      columnName: 'N/A',
      entityName: getEntityName(relationMetadata.entityMetadata),
      message: `${getEntityName(relationMetadata.entityMetadata)}: ${err.message}`,
    };

    return fail(reason);
  }
}
