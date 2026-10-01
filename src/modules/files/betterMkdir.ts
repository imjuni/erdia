import fs from "node:fs";

import { isFalse } from "my-easy-fp";
import { exists, getDirname } from "my-node-fp";
import { extname as getExtname } from "pathe";

export const betterMkdir = async (filePath: string) => {
  const isFilePathExist = await exists(filePath);
  if (isFalse(isFilePathExist)) {
    const extname = getExtname(filePath);
    const hasExtname = extname !== "" && extname.length > 0;
    if (hasExtname) {
      const dirPath = await getDirname(filePath);
      await fs.promises.mkdir(dirPath, { recursive: true });
    } else {
      await fs.promises.mkdir(filePath, { recursive: true });
    }
  }
};
