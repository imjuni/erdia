const entity = `"<%= entity.dbName %>(<%= entity.name %>)" {<% -%>
<% entity.columns.forEach((column) => {%>
  <%= column.columnTypeWithLength -%> <%= column.name -%>
<% if (column.attributeKey != null && column.attributeKey.length > 0) { -%>
  <%= column.attributeKey.join(',') -%>
<% } -%>
<% if (column.comment != null && column.comment != '') { -%>
  "<%- column.comment -%>"<% -%>
<% } -%>
<% }) %>
}`;

export default entity;
