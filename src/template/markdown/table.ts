export const table = `## <%= it.metadata.version %> Entities
<% it.entities.forEach((entity) => { %>
### <%= entity.dbName %>(<%= entity.name %>)

#### <%= entity.dbName %>(<%= entity.name %>) columns
| Database Name | Property Name | Attribute | Type | Nullable | Charset | Comment |
| ------------- | ------------- | --------- | ---- | -------- | ------- | ------- |
<% entity.columns.forEach((column) => { %>
| <%-= column.dbName %> | <% -%>
<%-= column.name %> | <% -%>
<%-= column.attributeKey.join(',') %> | <% -%>
<%-= column.columnTypeWithLength %> | <% -%>
<%-= column.isNullable ? 'Nullable' : '' %> | <% -%>
<%-= column.charset %> | <% -%>
<%-= column.comment %> |
<% }) %>

<% if (entity.indices != null && entity.indices.length > 0) { -%>
#### <%= entity.dbName %>(<%= entity.name %>) indices
| Database Name | Property Name | Unique | Columns | 
| ------------- | ------------- | ------ | ------- |
<% entity.indices.forEach((index) => { %>
| <%-= index.dbName -%> | <%-= index.name -%> | <% -%>

<%- if (index.isUnique) { -%>
 Unique | <% -%>
<% } else { -%>
 | <% -%>
<% } -%>

<%- if (index.columnNames != null && index.columnNames.length > 0) { -%>
  <%- index.columnNames.join(', ') %> |
<% } else { -%>
 |
<% } %><% /* end of column names */ -%>
<% }) %><% /* end of forEach */ -%>
<% } %><% /* end of indices if */ %>
<% }) %>
`;
