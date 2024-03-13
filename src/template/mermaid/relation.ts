export const relation = `<% it.entity.relations.forEach((relation) => { %>
<% if (relation.isDuplicate) { return; } %>
"<%= relation.dbName %>(<%= relation.name %>)"<% -%>
<% if (relation.joinColumnOne && relation.joinColumnNullable) { %>
  |o<% -%>
<% } else if (relation.joinColumnOne && !relation.joinColumnNullable) { %>
  ||<% -%>
<% } else if (!relation.joinColumnOne && relation.joinColumnNullable) { %>
  }o<% -%>
<% } else { %>
  }|<% -%>
<% } %>
  --  <% -%>
<% if (relation.inverseJoinColumnOne && relation.inverseJoinColumnNullable) { %>
o|  <% -%>
<% } else if (relation.inverseJoinColumnOne && !relation.inverseJoinColumnNullable) { %>
||  <% -%>
<% } else if (!relation.inverseJoinColumnOne && relation.inverseJoinColumnNullable) { %>
o{  <% -%>
<% } else { %>
|{  <% -%>
<% } %>
"<%= relation.inverseEntityDBName %>(<%= relation.inverseEntityName %>)":  <% -%>
"<%= [relation.joinColumnName,relation.inverseJoinColumnName].filter((name) => name != null).sort().join(',') %>"<% -%>

<% }) %>`;
