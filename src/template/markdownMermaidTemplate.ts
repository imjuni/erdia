export default function markdownMermaidTemplate(mermaid: string, theme: string) {
  if (mermaid === '') {
    return mermaid;
  }

  return `
\`\`\`mermaid
%%{init: {'theme':'${theme}'}}%%
${mermaid}
\`\`\`
`;
}
