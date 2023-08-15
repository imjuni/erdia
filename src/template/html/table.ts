const htmlTable = `<div class="container-fluid">
  <% entities.forEach((entity) => { -%>
<div class="container-fluid">
  <h2 id="<%= entity.dbName %>-<%= entity.name %>" class="title is-3">
  <%= entity.dbName %>
  <small class="text-body-secondary">(<%= entity.name %>)</small>
  <a class="anchor-link" href="#<%= entity.dbName %>-<%= entity.name %>" aria-label="Link to this section: <%= entity.dbName %>(<%= entity.name %>)">#</a>
  </h2>

  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>Database Name</th>
        <th>Property Name</th>
        <th>Attribute</th>
        <th>Type</th>
        <th>Nullable</th>
        <th>Charset</th>
        <th>Comment</th>
      </tr>
    </thead>
    <tbody>
      <% entity.columns.forEach((column) => { -%><tr>
        <td id="<%= entity.dbName %>-<%= entity.name %>-<%= column.dbName %>">
          <a class="anchor-link" href="#<%= entity.dbName %>-<%= entity.name %>-<%= column.dbName %>" aria-label="Link to this section: <%= column.dbName %> in <%= entity.dbName %>(<%= entity.name %>)">#</a>
          <%= column.dbName %>
        </td>
        <td id="<%= entity.dbName %>-<%= entity.name %>-<%= column.name %>">
          <a class="anchor-link" href="#<%= entity.dbName %>-<%= entity.name %>-<%= column.name %>" aria-label="Link to this section: <%= column.name %> in <%= entity.dbName %>(<%= entity.name %>)">#</a>
          <%= column.name %>
        </td>
        <td><%= column.attributeKey.join(',') %></td>
        <td><%= column.columnTypeWithLength %></td>
        <td><%= column.isNullable ? 'Nullable' : '' %></td>
        <td><%= column.charset %></td>
        <td><%= column.comment %></td>
      </tr>
      <% }) %>
    </tbody>
  </table>
  <div class="mx-auto p-4" style="width: 100%;"></div>
</div>
<% }) -%>
</div>`;

export default htmlTable;
