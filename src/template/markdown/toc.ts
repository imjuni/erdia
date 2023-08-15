import { CE_OUTPUT_COMPONENT } from '#configs/const-enum/CE_OUTPUT_COMPONENT';

const toc = `## Table Of Contents

1. Entities
<% entities.forEach((entity, index) => { -%>
    <%= index + 1 %>. <%= entity.dbName %>(<%= entity.name %>)
<% }) %><%= -%>
<% if (option.components.includes('${CE_OUTPUT_COMPONENT.ER}')) { %>
2. ER Diagram
<% } %>
`;

export default toc;
