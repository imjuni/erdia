import eol from '@misc/eol';
import type { TCommand } from '../erdia';
import template from '../template';

export default function getContent({
  type,
  table,
  diagram,
  database,
}: {
  type: TCommand;
  table: string;
  diagram: string;
  database: string;
}) {
  switch (type) {
    case 'mdtable':
      return `# ${database}${eol(2)}${table}`;
    case 'er':
      return `# ${database}${eol(2)}${diagram}`;
    case 'mdfull':
      return [
        `# ${database}`,
        `## Tables${eol()}${table}`,
        `## ER Diagram${eol(2)}\`\`\`mermaid${eol()}${diagram}\`\`\``,
      ].join(eol(2));
    case 'htmler':
      return template
        .replace('$[##html-gernerated-table-replace-tag##]', '')
        .replace(
          '$[##html-gernerated-marmaid-replace-tag##]',
          `<section class="section">${eol()}<h1 class="title is-2">${database}</h1>${eol()}${diagram}</section>`,
        );
    case 'htmltable':
      return template
        .replace(
          '$[##html-gernerated-table-replace-tag##]',
          `<section class="section">${eol()}<h1 class="title is-2">${database}</h1>${eol(
            2,
          )}${table}${eol()}</section>`,
        )
        .replace('$[##html-gernerated-marmaid-replace-tag##]', '');
    case 'htmlfull':
      return template
        .replace(
          '$[##html-gernerated-table-replace-tag##]',
          `<section class="section"><h1 class="title is-2">${database}</h1></section>${eol()}<section class="section">${eol()}<h2 class="title is-3">Tables</h2>${eol(
            2,
          )}${table}${eol()}</section>`,
        )
        .replace(
          '$[##html-gernerated-marmaid-replace-tag##]',
          `<section class="section">${eol()}<h2 class="title is-3">ER Diagram</h2>${eol()}${diagram}</section>`,
        );
    default:
      throw new Error(`unknown type: ${type}`);
  }
}
