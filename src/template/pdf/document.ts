import { CE_OUTPUT_COMPONENT } from 'src/configs/const-enum/CE_OUTPUT_COMPONENT';
import { CE_TEMPLATE_NAME } from 'src/template/cosnt-enum/CE_TEMPLATE_NAME';

const htmlDocument = `<!DOCTYPE html>
<html lang="en">

<head>
  <% if (it.metadata.title != null) { %>
  <title><%= it.metadata.title %></title>
  <% } else { %>
  <title>ER diagram generated by erdia</title>
  <% } %>
  <meta charset="utf-8">
  <%~ include('${CE_TEMPLATE_NAME.PDF_MERMAID_SCRIPT}', it); %>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>
  <%~ include('${CE_TEMPLATE_NAME.PDF_STYLE}', it); %>
</head>

<body class="bg-body-tertiary">
  <div class="bd-cheatsheet container-fluid bg-body">
    <section id="content">
      <h1 class="title is-2">
        <%= it.metadata.name %>
      </h1>
    </section>

  <% it.versions.filter((version) => version.latest).forEach((version) => { %>
    <% if (it.option.components.includes('${CE_OUTPUT_COMPONENT.TABLE}')) { %>
    <section id="toc-content">
      <h2 id="entity-relationship-table-of-content" class="title is-3">
        Table Of Contents
        <a class="anchor-link" href="#entity-relationship-mermiad-diagram" aria-label="Link to this section: Entity Relationship Diagram">#</a>
      </h2>
      <%~ include('${CE_TEMPLATE_NAME.PDF_DOCUMENT_TOC}', { entities: version.entities, option: it.option, metadata: it.metadata }); %>
    </section>

    <section id="talbe-content">
      <h2 id="entity-relationship-entities" class="title is-3">
        <%= it.metadata.version %> Entities
        <a class="anchor-link" href="#entity-relationship-mermiad-diagram" aria-label="Link to this section: Entity Relationship Diagram">#</a>
      </h2>
      <%~ include('${CE_TEMPLATE_NAME.PDF_TABLE}', { entities: version.entities, option: it.option, metadata: it.metadata }); %>
    </section>
    <% } %>

    <% if (it.option.components.includes('${CE_OUTPUT_COMPONENT.ER}')) { %>
    <section id="diagram-content">
      <h2 id="entity-relationship-mermiad-diagram" class="title is-3">
        ER Diagram
        <a class="anchor-link" href="#entity-relationship-mermiad-diagram" aria-label="Link to this section: Entity Relationship Diagram">#</a>
      </h2>

      <pre class="mermaid">
        <%~ include('${CE_TEMPLATE_NAME.MERMAID_DOCUMENT}', { entities: version.entities, option: it.option, metadata: it.metadata }); %>
      </pre>
    </section>
    <% } %>
  <% }) %>
  </div>
</body>

</html>`;

export default htmlDocument;
