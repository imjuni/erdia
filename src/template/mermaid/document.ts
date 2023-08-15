import { CE_TEMPLATE_NAME } from '#template/cosnt-enum/CE_TEMPLATE_NAME';

const mermaidDocument = `%%{init: {'theme':'<%= option.theme %>'}}%%
erDiagram

<% entities.forEach((entity) => { -%>
<%- include('${CE_TEMPLATE_NAME.MERMAID_ENTITY}', { entity }) %>
<%= -%>
<%- include('${CE_TEMPLATE_NAME.MERMAID_RELATION}', { entity }) %>
<% }) -%>`;

export default mermaidDocument;
