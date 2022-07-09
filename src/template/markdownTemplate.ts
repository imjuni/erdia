import markdownMermaidTemplate from '@template/markdownMermaidTemplate';

export default function markdownTemplate(table: string, includeRawMermaid: boolean, diagram: string) {
  const mermaid = markdownMermaidTemplate(diagram);

  return `
${table !== '' ? table : ''}
${mermaid !== '' ? mermaid : ''}
${includeRawMermaid ? `\`\`\`\n${diagram}\n\`\`\`` : ''}
  `.trim();
}
