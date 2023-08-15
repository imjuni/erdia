import { CE_OUTPUT_COMPONENT } from '#configs/const-enum/CE_OUTPUT_COMPONENT';
import { CE_TEMPLATE_NAME } from '#template/cosnt-enum/CE_TEMPLATE_NAME';

const htmlDocument = `<!DOCTYPE html>
<html lang="en" data-bs-theme="dark">

<head>
  <% if (metadata.title != null) { %>
  <title><%= metadata.title %></title>
  <% } else { %>
  <title><% metadata.name %> entity specification</title>
  <% } %>
  <meta charset="utf-8"> 
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>
  <%- include('${CE_TEMPLATE_NAME.HTML_STYLE}', { entities, option, metadata }); %>
</head>

<body class="bg-body-tertiary">
  <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#"><%= metadata.name %></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <% if (option.components.includes('${CE_OUTPUT_COMPONENT.TABLE}')) { %>
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/">Entity</a>
          </li>
          <% } %>
          <% if (option.components.includes('${CE_OUTPUT_COMPONENT.ER}')) { %>
          <li class="nav-item">
            <% if (option.components.includes('${CE_OUTPUT_COMPONENT.TABLE}')) { %>
            <a class="nav-link" href="/mermaid.html">ER Diagram</a>
            <% } else { %>
            <a class="nav-link" href="/">ER Diagram</a>
            <% } %>
          </li>
          <% } %>
        </ul>
      </div>
    </div>
  </nav>

  <%- include('${CE_TEMPLATE_NAME.HTML_DOCUMENT_TOC}', { entities, option, metadata }); %>

  <div class="bd-cheatsheet container-fluid bg-body">
    <section id="content">
      <%- include('${CE_TEMPLATE_NAME.HTML_TABLE}', { entities, option, metadata }); %>
    </section>
  </div>
</body>
</html>`;

export default htmlDocument;
