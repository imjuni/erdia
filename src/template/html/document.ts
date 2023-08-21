import { CE_OUTPUT_COMPONENT } from '#configs/const-enum/CE_OUTPUT_COMPONENT';
import { CE_TEMPLATE_NAME } from '#template/cosnt-enum/CE_TEMPLATE_NAME';

const htmlDocument = `<!DOCTYPE html>
<html lang="en" data-bs-theme="dark">

<head>
  <% if (it.metadata.title != null) { %>
  <title><%= it.metadata.title %></title>
  <% } else { %>
  <title><%= it.metadata.name %> entity specification</title>
  <% } %>
  <meta charset="utf-8"> 
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>
  <%~ include('${CE_TEMPLATE_NAME.HTML_STYLE}', it); %>
</head>

<body class="bg-body-tertiary">
  <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="<%= it.option.routeBasePath != null ? it.option.routeBasePath : '/' %>"><%= it.metadata.name %></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <% if (it.option.components.includes('${CE_OUTPUT_COMPONENT.TABLE}')) { %>
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="<%= it.option.routeBasePath != null ? it.option.routeBasePath : '/' %>">Entity</a>
          </li>
          <% } %>
          <% if (it.option.components.includes('${CE_OUTPUT_COMPONENT.ER}')) { %>
          <li class="nav-item">
            <% if (it.option.components.includes('${CE_OUTPUT_COMPONENT.TABLE}')) { %>
            <a class="nav-link" href="<%= it.option.routeBasePath != null ? it.option.routeBasePath : '' %>/mermaid.html">ER Diagram</a>
            <% } else { %>
            <a class="nav-link" href="<%= it.option.routeBasePath != null ? it.option.routeBasePath : '/' %>">ER Diagram</a>
            <% } %>
          </li>
          <% } %>
        </ul>
      </div>
    </div>
  </nav>

  <%~ include('${CE_TEMPLATE_NAME.HTML_DOCUMENT_TOC}', it); %>

  <div class="bd-cheatsheet container-fluid bg-body">
    <section>
      <select id="entity-version-select" class="form-select form-select-lg mb-3" aria-label="Large select example">
      <% it.versions.forEach((version) => { %>
        <option
          value="<%= it.metadata.name %>-<%= version.version.replaceAll('.', '-') %>"
          <% if (version.latest) { -%>
            <%= " selected" -%>
          <% } -%>
        >
          <%= it.metadata.name %> <%= version.version %>
        </option>
      <% }) %>
      </select>
    </section>

  <% it.versions.forEach((version) => { %>
    <section class="entity-version-content-section content-<%= it.metadata.name %>-<%= version.version.replaceAll('.', '-') %> <% if (!version.latest) { -%>
      hide
    <% } %>">
      <h2><%= it.metadata.name %> <%= version.version %></h2>
      <%~ include('${CE_TEMPLATE_NAME.HTML_TABLE}', { version, option: it.option, metadata: it.metadata }); %>
    </section>
  <% }) %>
  </div>
</body>

<script>
var so = document.getElementById("entity-version-select");

so.addEventListener('change', (e) => {
  var sectionsForContentHide = document.getElementsByClassName('entity-version-content-section');
  [].forEach.call(sectionsForContentHide, (element) => {
    element.className = element.className
      .split(' ')
      .filter(className => className !== 'hide')
      .concat(['hide'])
      .join(' ');
  });

  var sectionsForTocHide = document.getElementsByClassName('entity-version-toc-section');
  [].forEach.call(sectionsForTocHide, (element) => {
    element.className = element.className
      .split(' ')
      .filter(className => className !== 'hide')
      .concat(['hide'])
      .join(' ');
  });

  var sectionsForContentReveal = document.querySelector('.content-' + e.target.value);
  sectionsForContentReveal.className = sectionsForContentReveal.className
    .split(' ')
    .filter(className => className !== 'hide')
    .join(' ');
  
  var sectionsForTocReveal = document.querySelector('.toc-' + e.target.value);
  sectionsForTocReveal.className = sectionsForTocReveal.className
    .split(' ')
    .filter(className => className !== 'hide')
    .join(' ');
});
</script>
</html>`;

export default htmlDocument;
