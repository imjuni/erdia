const htmlTable = `<div class="container-fluid">
<%- it.entities.forEach((entity) => { %>
  <div class="container-fluid">
    <h2 id="<%= entity.dbName %>-<%= entity.name %>" class="title is-3">
    <%= entity.dbName %>
    <small class="text-body-secondary">(<%= entity.name %>)</small>
    </h2>

    <div class="container-fluid">
      <table class="table table-striped table-hover caption-top">
        <caption><%= entity.dbName %><small class="text-body-secondary">(<%= entity.name %>)</small> columns</caption>
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
            <td><%= column.dbName %></td>
            <td><%= column.name %></td>
            <td>
              <% if (column.attributeKey.indexOf('PK') > -1) { -%>
              <span class="badge text-bg-success">PK</span>
              <% } -%>
              <% if (column.attributeKey.indexOf('FK') > -1) { -%>
              <span class="badge text-bg-info">FK</span>
              <% } -%>
              <% if (column.attributeKey.indexOf('UK') > -1) { -%>
              <span class="badge text-bg-warning">UK</span>
              <% } -%>
            </td>
            <td><%= column.columnTypeWithLength %></td>
            <td>
              <% if (column.isNullable) { -%>
              <span class="badge text-bg-danger">NULLABLE</span>
              <% } -%>
            </td>
            <td><%= column.charset %></td>
            <td><%= column.comment %></td>
          </tr>
          <% }) %>
        </tbody>
      </table>
    </div>

    <div class="mx-auto p-2" style="width: 100%;"></div>

    <div class="container-fluid">
    <% if (entity.indices != null && entity.indices.length > 0) { -%>
      <table class="table table-striped table-hover caption-top">
        <caption><%= entity.dbName %><small class="text-body-secondary">(<%= entity.name %>)</small> indices</caption>
        <thead>
          <tr>
            <th>Database Name</th>
            <th>Property Name</th>
            <th>Unique</th>
            <th>Columns</th>
          </tr>
        </thead>

        <tbody>
        <% entity.indices.forEach((index) => { -%>
          <tr>
            <td><span><%= index.dbName %></span></td>
            <td><span><%= index.name %></span></td>
            
            <td>
            <% if (index.isUnique) { -%>
              <span class="badge text-bg-warning">Unique</span>
            <% } %>
            </td>
            
            <td>
            <% if (index.columnNames != null && index.columnNames.length > 0) { -%>
              <ul style="margin: 0">
              <% index.columnNames.forEach((columnName) => { -%>
                <li><%= columnName %></li>
              <% }) -%>
              </ul>
            <% } -%>
            </td>
          </tr>
        <% }) -%>
        </tbody>
      </table>
    <% } -%>
    </div>
    <div class="mx-auto p-4" style="width: 100%;"></div>
  </div>
<% }) -%>
</div>`;

export default htmlTable;
