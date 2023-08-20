import { CE_OUTPUT_COMPONENT } from '#configs/const-enum/CE_OUTPUT_COMPONENT';
import { CE_TEMPLATE_NAME } from '#template/cosnt-enum/CE_TEMPLATE_NAME';

const markdownDocument = `# <%= it.metadata.name %>

<% it.versions.filter((version) => version.latest).forEach((version) => { %>
<% if (it.option.components.includes('${CE_OUTPUT_COMPONENT.TABLE}')) { %>
<%~ include('${CE_TEMPLATE_NAME.MARKDOWN_TOC}', { entities: version.entities, option: it.option, metadata: it.metadata }); %>
<%~ include('${CE_TEMPLATE_NAME.MARKDOWN_TABLE}', { entities: version.entities, option: it.option, metadata: it.metadata }); %>
<% } %>

<% if (it.option.components.includes('${CE_OUTPUT_COMPONENT.ER}')) { %>
<%~ include('${CE_TEMPLATE_NAME.MARKDOWN_MERMAID}', { entities: version.entities, option: it.option, metadata: it.metadata }); %>
<% } %>
<% }) %>
`;

export default markdownDocument;
