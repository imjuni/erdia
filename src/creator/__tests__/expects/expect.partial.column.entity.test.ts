export default {
  name: 'user',
  columns: [
    {
      columns: ['number', 'id'],
      mermaid: 'number id',
      weight: 20649017.22,
    },
    {
      columns: ['number', 'photoId'],
      mermaid: 'number photoId',
      weight: 10649010.18,
    },
    {
      columns: ['varchar', 'lastName'],
      mermaid: 'varchar lastName',
      weight: 743014.25,
    },
    {
      columns: ['boolean', 'isActive'],
      mermaid: 'boolean isActive',
      weight: 736017.07,
    },
    {
      columns: ['string', 'first_name'],
      mermaid: 'string first_name',
      weight: 663020.17,
    },
  ],
  mermaid: 'user {\n  number id\n  number photoId\n  varchar lastName\n  boolean isActive\n  string first_name\n}',
};
