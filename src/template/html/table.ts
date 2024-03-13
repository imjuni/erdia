export const htmlTable = `<div class="container-fluid">
  <% it.version.entities.forEach((entity) => { -%>
  <div class="container-fluid">
    <h2 id="<%= it.version.version.replaceAll('.', '-') %>-<%= entity.dbName %>-<%= entity.name %>" class="title is-3">
      <% if (entity.change === 'add') { -%>
      <span class="badge text-bg-success">Add</span>
      <% } else if (entity.change === 'change') { -%>
      <span class="badge text-bg-warning">Update</span>
      <% } else if (entity.change === 'delete') { -%>
      <span class="badge text-bg-danger">Delete</span>
      <% } -%>
      <%= entity.dbName %>
      <small class="text-body-secondary">(<%= entity.name %>)</small>
      <a class="anchor-link" href="#<%= it.version.version.replaceAll('.', '-') %>-<%= entity.dbName %>-<%= entity.name %>" aria-label="Link to this section: <%= entity.dbName %>(<%= entity.name %>)">#</a>
    </h2>

    <div class="container-fluid">
      <table class="table table-striped table-hover caption-top">
        <caption><i class="bi bi-grid-3x2-gap"></i> <%= entity.dbName %><small class="text-body-secondary">(<%= entity.name %>)</small> columns</caption>
        <thead>
          <tr>
            <th>&nbsp;</th><!-- changing status -->
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
          <% entity.columns.forEach((column) => { -%>
          <tr>
            <td>
              <% if (column.change === 'add') { -%>
              <span class="badge text-bg-success">Add</span>
              <% } else if (column.change === 'change') { -%>
              <span class="badge text-bg-warning">Update</span>
              <% } else if (column.change === 'delete') { -%>
              <span class="badge text-bg-danger">Delete</span>
              <% } -%>
            </td>

            <td id="<%= it.version.version.replaceAll('.', '-') %>-<%= entity.dbName %>-<%= entity.name %>-<%= column.dbName %>">
              <a class="anchor-link" href="#<%= it.version.version.replaceAll('.', '-') %>-<%= entity.dbName %>-<%= entity.name %>-<%= column.dbName %>" aria-label="Link to this section: <%= column.dbName %> in <%= entity.dbName %>(<%= entity.name %>)">#</a>
              <span><%= column.dbName %></span>
            </td>

            <td id="<%= it.version.version.replaceAll('.', '-') %>-<%= entity.dbName %>-<%= entity.name %>-<%= column.name %>">
              <a class="anchor-link" href="#<%= it.version.version.replaceAll('.', '-') %>-<%= entity.dbName %>-<%= entity.name %>-<%= column.name %>" aria-label="Link to this section: <%= column.name %> in <%= entity.dbName %>(<%= entity.name %>)">#</a>
              <span><%= column.name %></span>
            </td>

            <td>
            <% if (column.change !== 'change') { -%>
              <% if (column.attributeKey.indexOf('PK') > -1) { -%>
              <span class="badge text-bg-success">PK</span>
              <% } -%>
              <% if (column.attributeKey.indexOf('FK') > -1) { -%>
              <span class="badge text-bg-info">FK</span>
              <% } -%>
              <% if (column.attributeKey.indexOf('UK') > -1) { -%>
              <span class="badge text-bg-warning">UK</span>
              <% } -%>
            <% } else { -%>
              <% if (column.attributeKey.indexOf('PK') > -1) { -%>
              <span class="badge text-bg-success">PK</span>
              <% } -%>
              <% if (column.attributeKey.indexOf('FK') > -1) { -%>
              <span class="badge text-bg-info">FK</span>
              <% } -%>
              <% if (column.attributeKey.indexOf('UK') > -1) { -%>
              <span class="badge text-bg-warning">UK</span>
              <% } -%>
              <br />
              <% if (column.prev != null && column?.prev?.columnTypeWithLength && column.attributeKey.join(',') !== column?.prev?.attributeKey.join(',')) { -%>
                <% if (column.attributeKey.indexOf('PK') > -1) { -%>
                <span class="badge text-bg-success"><del>PK</del></span>
                <% } -%>
                <% if (column.attributeKey.indexOf('FK') > -1) { -%>
                <span class="badge text-bg-info"><del>FK</del></span>
                <% } -%>
                <% if (column.attributeKey.indexOf('UK') > -1) { -%>
                <span class="badge text-bg-warning"><del>UK</del></span>
                <% } -%>
                <br />
              <% } -%>
            <% } -%>
            </td>

            <td>
            <% if (column.change !== 'change') { -%>
              <span><%= column.columnTypeWithLength %></span>
            <% } else { -%>
              <span><%= column.columnTypeWithLength %></span>
              <br />
              <% if (column.prev != null && column?.prev?.columnTypeWithLength && column.columnTypeWithLength !== column?.prev?.columnTypeWithLength) { -%>
              <span><del><%= column.prev.columnTypeWithLength %></del></span>
              <% } -%>
            <% } -%>
            </td>

            <td>
            <% if (column.change !== 'change') { -%>
              <% if (column.isNullable) { -%>
              <span class="badge text-bg-danger">NULLABLE</span>
              <% } -%>
            <% } else { -%>
              <span><%= column.isNullable ? 'Nullable' : '' %></span>
              <br />
              <% if (column.prev != null && column?.prev?.isNullable && column.isNullable !== column?.prev?.isNullable) { -%>
              <span><del><%= column.prev.isNullable ? 'Nullable' : '' %></del></span>
              <% } -%>
            <% } -%>
            </td>

            <td>
            <% if (column.change !== 'change') { -%>
              <span><%= column.charset %></span>
            <% } else { -%>
              <span><%= column.charset %></span>
              <br />
              <% if (column.prev != null && column?.prev?.charset != null && column.charset !== column?.prev?.charset) { -%>
              <span><del><%= column.prev.charset %></del></span>
              <% } -%>
            <% } -%>
            </td>

            <td>
            <% if (column.change !== 'change') { -%>
              <span><%= column.comment %></span>
            <% } else { -%>
              <span><%= column.comment %></span>
              <br />
              <% if (column.prev != null && column?.prev?.comment != null && column.comment !== column?.prev?.comment) { -%>
              <span><del><%= column.prev.comment %></del></span>
              <% } -%>
            <% } -%>
            </td>
          </tr>
          <% }) %>
        </tbody>
      </table>
    </div>

    <div class="mx-auto p-2" style="width: 100%;"></div>

    <div class="container-fluid">
    <% if (entity.indices != null && entity.indices.length > 0) { -%>
      <table class="table table-striped table-hover caption-top">
        <caption><i class="bi bi-key"></i> <%= entity.dbName %><small class="text-body-secondary">(<%= entity.name %>)</small> indices</caption>
        <thead>
          <tr>
            <th>&nbsp;</th><!-- changing status -->
            <th>Database Name</th>
            <th>Property Name</th>
            <th>Unique</th>
            <th>Columns</th>
          </tr>
        </thead>

        <tbody>
        <% entity.indices.forEach((index) => { -%>
          <tr>
            <td>
              <% if (index.change === 'add') { -%>
              <span class="badge text-bg-success">Add</span>
              <% } else if (index.change === 'change') { -%>
              <span class="badge text-bg-warning">Update</span>
              <% } else if (index.change === 'delete') { -%>
              <span class="badge text-bg-danger">Delete</span>
              <% } -%>
            </td>
            
            <td id="<%= it.version.version.replaceAll('.', '-') %>-<%= entity.dbName %>-<%= entity.name %>-<%= index.dbName %>">
              <a class="anchor-link" href="#<%= it.version.version.replaceAll('.', '-') %>-<%= entity.dbName %>-<%= entity.name %>-<%= index.dbName %>" aria-label="Link to this section: <%= index.dbName %> in <%= entity.dbName %>(<%= entity.name %>)">#</a>
              <span><%= index.dbName %></span>
            </td>
            
            <td id="<%= it.version.version.replaceAll('.', '-') %>-<%= entity.dbName %>-<%= entity.name %>-<%= index.name %>">
              <a class="anchor-link" href="#<%= it.version.version.replaceAll('.', '-') %>-<%= entity.dbName %>-<%= entity.name %>-<%= index.name %>" aria-label="Link to this section: <%= index.name %> in <%= entity.dbName %>(<%= entity.name %>)">#</a>
              <span><%= index.name %></span>
            </td>
            
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
