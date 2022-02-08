import eol from '@misc/eol';
import fs from 'fs';

export default async function write({
  type,
  content,
  database,
  filename,
}: {
  type: 'mdtable' | 'er' | 'mdfull';
  content: string;
  database: string;
  filename: string;
}) {
  switch (type) {
    case 'mdtable':
      await fs.promises.writeFile(filename, `# ${database}${eol(2)}${content}`);
      break;
    case 'er':
      await fs.promises.writeFile(filename, `# ${database}${eol(2)}${content}`);
      break;
    case 'mdfull':
      await fs.promises.writeFile(filename, `# ${database}${eol(2)}${content}`);
      break;
    default:
      throw new Error(`unknown type: ${type}`);
  }
}
