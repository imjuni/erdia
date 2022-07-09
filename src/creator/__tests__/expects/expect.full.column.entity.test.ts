export default {
  name: 'user',
  columns: [
    {
      columns: ['number', 'id', 'PK'],
      mermaid: 'number id PK',
      weight: 20649017.22,
    },
    {
      columns: ['number', 'photoId', 'FK'],
      mermaid: 'number photoId FK',
      weight: 10649010.18,
    },
    {
      columns: ['varchar', 'lastName'],
      mermaid: 'varchar lastName',
      weight: 743014.25,
    },
    {
      columns: ['boolean', 'isActive', '"line1<br />line2<br />line3"'],
      mermaid: 'boolean isActive "line1<br />line2<br />line3"',
      weight: 736017.07,
    },
    {
      columns: ['string', 'first_name', '"user firstname"'],
      mermaid: 'string first_name "user firstname"',
      weight: 663020.17,
    },
  ],
  mermaid:
    'user {\n  number id PK\n  number photoId FK\n  varchar lastName\n  boolean isActive "line1<br />line2<br />line3"\n  string first_name "user firstname"\n}',
};
