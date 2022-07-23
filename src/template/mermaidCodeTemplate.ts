export default function mermaidCodeTemplate(entity: string, relation: string) {
  return `
erDiagram

${entity}

${relation}
`.trim();
}
