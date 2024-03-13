import { CE_OUTPUT_COMPONENT } from '#/configs/const-enum/CE_OUTPUT_COMPONENT';
import { CE_TEMPLATE_NAME } from '#/template/cosnt-enum/CE_TEMPLATE_NAME';

export const mermaid = `<!DOCTYPE html>
<html lang="en" data-bs-theme="dark">

<head>
  <% if (it.metadata.title != null) { %>
  <title><%= it.metadata.title %></title>
  <% } else { %>
  <title><%= it.metadata.name %> entity specification</title>
  <% } %>
  <meta charset="utf-8">
  <%~ include('${CE_TEMPLATE_NAME.HTML_MERMAID_SCRIPT}', it); %>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>
  <%~ include('${CE_TEMPLATE_NAME.HTML_STYLE}', it); %>
</head>

<body class="bg-body-tertiary">
  <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="<%= it.option.routeBasePath != null ? it.option.routeBasePath + 'index.html' : '/' %>"><%= it.metadata.name %></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <% if (it.option.components.includes('${CE_OUTPUT_COMPONENT.TABLE}')) { %>
          <li class="nav-item">
            <a class="nav-link" aria-current="page" href="<%= it.option.routeBasePath != null ? it.option.routeBasePath + 'index.html' : '/' %>">Entity</a>
          </li>
          <% } %>
          <% if (it.option.components.includes('${CE_OUTPUT_COMPONENT.ER}')) { %>
          <li class="nav-item">
            <% if (it.option.components.includes('${CE_OUTPUT_COMPONENT.TABLE}')) { %>
            <a class="nav-link active" aria-current="page" href="<%= it.option.routeBasePath != null ? it.option.routeBasePath : '' %>mermaid.html">ER Diagram</a>
            <% } else { %>
            <a class="nav-link active" aria-current="page" href="<%= it.option.routeBasePath != null ? it.option.routeBasePath + 'index.html' : '#' %>/">ER Diagram</a>
            <% } %>
          </li>
          <% } %>
        </ul>
      </div>
    </div>
  </nav>

  <% it.versions.filter((version) => version.latest).forEach((version) => { -%>
  <%~ include('${CE_TEMPLATE_NAME.HTML_MERMAID_TOC}', { entities: version.entities, option: it.option, metadata: it.metadata }) %>
  <% }) %>

  <div class="bd-cheatsheet container-fluid bg-body">
    <section id="content">
      <h2 id="entity-relationship-mermiad-diagram" class="title is-3">
        ER Diagram
        <a class="anchor-link" href="#entity-relationship-mermiad-diagram" aria-label="Link to this section: Entity Relationship Diagram">#</a>
      </h2>

      <h3 class="title is-4">Diagram</h3>
      <pre class="mermaid">
      <% it.versions.filter((version) => version.latest).forEach((version) => { -%>
      <%~ include('${CE_TEMPLATE_NAME.MERMAID_DOCUMENT}', { entities: version.entities, option: it.option, metadata: it.metadata }) %>
      <% }) -%>
      </pre>

      <% if (!it.option.skipImageInHtml) { %>
      <h3 class="title is-4">
        <a class="anchor-link" href="/<%= it.metadata.name %>.svg" target="_blank" aria-label="Link to this section: Entity Relationship Diagram Image">Image</a>
      </h3>
      <% } %>
    </section>

    <div class="mx-auto p-2" style="width: 100%;"></div>

    <section id="content">
      <h2 id="entity-relationship-mermiad-source-code" class="title is-3">
        Mermaid source code
        <a class="anchor-link" href="#entity-relationship-mermiad-source-code" aria-label="Link to this section: Mermaid source code">#</a>
      </h2>
      
      <textarea rows="10" class="form-control meramid-source-code">
<%- it.versions.filter((version) => version.latest).forEach((version) => { %>
<%-~ include('${CE_TEMPLATE_NAME.MERMAID_DOCUMENT}', { entities: version.entities, option: it.option, metadata: it.metadata }); -%>
<%- }) -%></textarea>
    </section>

    <div class="mx-auto p-5" style="width: 100%;"></div>
  </div>

</body>

</html>`;
