import { CE_TEMPLATE_NAME } from 'src/template/cosnt-enum/CE_TEMPLATE_NAME';

const mermaidDocument = `%%{init: {'theme':'<%= it.option.theme %>'}}%%

erDiagram

<% it.entities.forEach((entity) => { -%>
<%~ include('${CE_TEMPLATE_NAME.MERMAID_ENTITY}', { entity }) %>
<% -%>
<%~ include('${CE_TEMPLATE_NAME.MERMAID_RELATION}', { entity }) %>

<% }) -%>`;

export default mermaidDocument;
