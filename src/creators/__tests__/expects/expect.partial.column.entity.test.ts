// eslint-disable-next-line import/no-default-export
export default {
  name: 'user',
  columns: [
    {
      columns: ['number', 'id', '"not null"'],
      mermaid: 'number id "not null"',
      weight: 20649017.22,
    },
    {
      columns: ['number', 'photoId', '"nullable"'],
      mermaid: 'number photoId "nullable"',
      weight: 10649010.18,
    },
    {
      columns: ['varchar', 'lastName', '"not null"'],
      mermaid: 'varchar lastName "not null"',
      weight: 743014.25,
    },
    {
      columns: ['boolean', 'isActive', '"not null"'],
      mermaid: 'boolean isActive "not null"',
      weight: 736017.07,
    },
    {
      columns: ['string', 'first_name', '"not null"'],
      mermaid: 'string first_name "not null"',
      weight: 663020.17,
    },
  ],
  mermaid:
    'user {\n  number id "not null"\n  number photoId "nullable"\n  varchar lastName "not null"\n  boolean isActive "not null"\n  string first_name "not null"\n}',
};
