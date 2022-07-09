export default function markdownMermaidTemplate(mermaid: string) {
  if (mermaid === '') {
    return mermaid;
  }

  return `
\`\`\`mermaid
${mermaid}
\`\`\`
`;
}
