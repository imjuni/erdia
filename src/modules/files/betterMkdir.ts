import { isFalse } from 'my-easy-fp';
import { exists, getDirname } from 'my-node-fp';
import fs from 'node:fs';
import pathe from 'pathe';

export async function betterMkdir(filePath: string) {
  const isFilePathExist = await exists(filePath);

  if (isFalse(isFilePathExist)) {
    const extname = pathe.extname(filePath);
    const hasExtname = extname !== '' && extname.length > 0;

    if (hasExtname) {
      const dirPath = await getDirname(filePath);
      await fs.promises.mkdir(dirPath, { recursive: true });
    } else {
      await fs.promises.mkdir(filePath, { recursive: true });
    }
  }
}
