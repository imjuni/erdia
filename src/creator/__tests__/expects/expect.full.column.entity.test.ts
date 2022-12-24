export default {
  name: 'user',
  columns: [
    {
      columns: ['number', 'id', 'PK', '"not null"'],
      mermaid: 'number id PK "not null"',
      weight: 20649017.22,
    },
    {
      columns: ['number', 'photoId', 'FK', '"nullable"'],
      mermaid: 'number photoId FK "nullable"',
      weight: 10649010.18,
    },
    {
      columns: ['varchar', 'lastName', '"not null"'],
      mermaid: 'varchar lastName "not null"',
      weight: 743014.25,
    },
    {
      columns: ['boolean', 'isActive', '"not null - line1&lt;br /&gt;line2&lt;br /&gt;line3"'],
      mermaid: 'boolean isActive "not null - line1&lt;br /&gt;line2&lt;br /&gt;line3"',
      weight: 736017.07,
    },
    {
      columns: ['string', 'first_name', '"not null - user firstname"'],
      mermaid: 'string first_name "not null - user firstname"',
      weight: 663020.17,
    },
  ],
  mermaid:
    'user {\n  number id PK "not null"\n  number photoId FK "nullable"\n  varchar lastName "not null"\n  boolean isActive "not null - line1&lt;br /&gt;line2&lt;br /&gt;line3"\n  string first_name "not null - user firstname"\n}',
};
