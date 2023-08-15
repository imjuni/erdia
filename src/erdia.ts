import type ICommonOption from '#configs/interfaces/ICommonOption';
import getConfigContent from '#configs/modules/getConfigContent';
import consola from 'consola';
import del from 'del';
import fs from 'fs';
import { exists } from 'my-node-fp';

export async function cleanDoc(option: ICommonOption) {
  const files = [
    'erdiagram.md',
    'table.md',
    'erdiagram.html',
    'table.html',
    'erdiagram.pdf',
    'table.pdf',
    'erdiagram.svg',
    'erdiagram.png',
  ].concat(option.output ?? []);

  const existFiles = await Promise.all(files.map(async (filename) => ({ filename, exists: await exists(filename) })));
  const existFilenames = existFiles.filter((existFile) => existFile.exists).map((existFile) => existFile.filename);

  consola.info(`clean: ${existFilenames.join(', ')}`);

  await del(existFilenames);
}

export async function initErdia() {
  const configContnent = await getConfigContent();
  await fs.promises.writeFile('.erdiarc', configContnent);
}
