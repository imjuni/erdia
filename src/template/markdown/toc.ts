import { CE_OUTPUT_COMPONENT } from '#configs/const-enum/CE_OUTPUT_COMPONENT';

const toc = `## Table Of Contents

1. <%= it.metadata.version %> Entities
<% it.entities.forEach((entity, index) => { -%>
    <%= index + 1 %>. <%= entity.dbName %>(<%= entity.name %>)
<% }) %>
<% if (it.option.components.includes('${CE_OUTPUT_COMPONENT.ER}')) { %>
2. ER Diagram
<% } %>
`;

export default toc;
