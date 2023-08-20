const table = `## <%= metadata.version %> Entities
<% entities.forEach((entity) => { %>
### <%= entity.dbName %>(<%= entity.name %>)

| Database Name | Property Name | Attribute | Type | Nullable | Charset | Comment |
| ------------- | ------------- | --------- | ---- | -------- | ------- | ------- |
<% entity.columns.forEach((column) => { -%>
| <%= column.dbName %> | <%= column.name %> | <%= column.attributeKey.join(',') %> | <%= column.columnTypeWithLength %> | <%= column.isNullable ? 'Nullable' : '' %> | <%= column.charset %> | <%= column.comment %> |
<% }) -%>
<% }) -%>`;

export default table;
