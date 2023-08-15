const documentToC = `<aside class="bd-aside sticky-xl-top text-body-secondary align-self-start mb-3 mb-xl-5 px-2">
  <h2 class="h6 pt-4 pb-3 mb-4 border-bottom">Entities</h2>
  <nav class="small" id="toc">
    <ul class="list-unstyled">
      <% entities.forEach((entity) => { %>
      <li class="my-2">
        <a class="anchor-link" href="#<%= entity.dbName %>-<%= entity.name %>" aria-label="Link to this section: <%= entity.dbName %>(<%= entity.name %>)">
          <%= entity.dbName %>
        </a>
      </li>
      <% }) %>
    </ul>
  </nav>
</aside>`;

export default documentToC;
