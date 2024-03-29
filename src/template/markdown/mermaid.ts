import { CE_TEMPLATE_NAME } from '#/template/cosnt-enum/CE_TEMPLATE_NAME';

export const mermaid = `## ER Diagram

\`\`\`mermaid
<%~ include('${CE_TEMPLATE_NAME.MERMAID_DOCUMENT}', { entities: it.entities, option: it.option, metadata: it.metadata }); -%>
\`\`\``;
