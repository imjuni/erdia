import { RelationMetadata } from 'typeorm/metadata/RelationMetadata';

const getRelationPostfixDesc = (relationMeta: RelationMetadata) => {
  switch (relationMeta.relationType) {
    case 'many-to-many':
      return '" "';
    case 'many-to-one':
      return '" "';
    case 'one-to-many':
      return '" "';
    case 'one-to-one':
      return '" "';
    default:
      return '" "';
  }
};

export default getRelationPostfixDesc;
