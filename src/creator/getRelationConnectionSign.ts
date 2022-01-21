import { RelationType } from 'typeorm/metadata/types/RelationTypes';

// 피대상자, 연결, 대상자, 연결수식
const getRelationConnectionSign = (
  relationType: RelationType,
  columnIsNullable?: boolean,
  inverseColumnIsNullable?: boolean,
) => {
  switch (relationType) {
    case 'many-to-many':
      return `${inverseColumnIsNullable ?? false ? '}o' : '}|'}--${
        columnIsNullable ?? false ? 'o{' : '|{'
      }`;
    case 'many-to-one':
      return `${inverseColumnIsNullable ?? false ? '}o' : '}|'}--${
        columnIsNullable ?? false ? 'o|' : '||'
      }`;
    case 'one-to-many':
      return `${inverseColumnIsNullable ?? false ? '|o' : '||'}--${
        columnIsNullable ?? false ? 'o{' : '|{'
      }`;
    case 'one-to-one':
      return `${inverseColumnIsNullable ?? false ? '|o' : '||'}--${
        columnIsNullable ?? false ? 'o|' : '||'
      }`;
  }
};

export default getRelationConnectionSign;
