const documentToC = `<aside class="bd-aside sticky-xl-top text-body-secondary align-self-start mb-3 mb-xl-5 px-2">
<% it.versions.forEach((version) => { %>
  <section class="entity-version-toc-section toc-<%= it.metadata.name %>-<%= version.version.replaceAll('.', '-') %> <% if (!version.latest) { -%>
    hide
  <% } -%>">
    <h2 class="h6 pt-4 pb-3 mb-4 border-bottom"><%= version.version %></h2>
    <nav id="toc-<%= version.version.replaceAll('.', '-') %>" class="small">
      <ul class="list-unstyled">
        <% version.entities.forEach((entity) => { %>
        <li class="my-2">
          <a class="anchor-link" href="#<%= version.version.replaceAll('.', '-') %>-<%= entity.dbName %>-<%= entity.name %>" aria-label="Link to this section: <%= entity.dbName %>(<%= entity.name %>)">
            <%= entity.dbName %>
          </a>
        </li>
        <% }) %>
      </ul>
    </nav>
  </section>
<% }) %>
</aside>`;

export default documentToC;
