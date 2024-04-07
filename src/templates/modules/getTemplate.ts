import type { ITemplate } from '#/templates/interfaces/ITemplate';
import { isTrue } from 'my-easy-fp';
import { basenames, exists, getDirname } from 'my-node-fp';
import fs from 'node:fs';
import pathe from 'pathe';

export async function getTemplate(dirPath: string, filePath: string): Promise<ITemplate | undefined> {
  if (isTrue(await exists(filePath))) {
    const buf = await fs.promises.readFile(filePath);
    const relative = pathe.relative(dirPath, filePath).replace(`.${pathe.sep}`, '');
    const dirname = await getDirname(relative);
    const basename = basenames(relative, ['.eta', '.ejs']);

    return { key: pathe.join(dirname, basename), content: buf.toString() };
  }

  return undefined;
}
