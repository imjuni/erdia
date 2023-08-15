import { CE_OUTPUT_COMPONENT } from '#configs/const-enum/CE_OUTPUT_COMPONENT';

const documentToC = `<ul class="list-group list-group-flush">
  <li class="list-group-item">
    <a class="anchor-link" href="#entity-relationship-entities" aria-label="Link to this section: Entities">
      Entities
    </a>
    <ul class="list-group list-group-flush">
      <% entities.forEach((entity) => { %>
      <li class="list-group-item">
        <a class="anchor-link" href="#<%= entity.dbName %>-<%= entity.name %>" aria-label="Link to this section: <%= entity.dbName %>(<%= entity.name %>)">
          <%= entity.dbName %>
        </a>
        </li>
        <% }) %>
    </ul>
  </li>
  <% if (option.components.includes('${CE_OUTPUT_COMPONENT.ER}')) { %>
  <li class="list-group-item">
    <a class="anchor-link" href="#entity-relationship-mermiad-diagram" aria-label="Link to this section: Entities">
      ER Diagram
    </a>
  </li>
  <% } %>
</ul>`;

export default documentToC;
