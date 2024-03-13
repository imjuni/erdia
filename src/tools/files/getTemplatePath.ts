import { exists, getDirname } from 'my-node-fp';
import path from 'path';

/**
 * get template path
 *
 * istanbul ignore next
 * */
export async function getTemplatePath(filePath: string) {
  const dirPath = await getDirname(filePath);

  if (dirPath == null && !(await exists(dirPath))) {
    throw new Error(`invalid filePath: ${filePath}`);
  }

  // find template directory for test-case
  const firstDirPath = path.join(dirPath, '..', '..', '..', 'templates');

  if (firstDirPath != null && (await exists(firstDirPath))) {
    return firstDirPath;
  }

  // find template directory for evaluate-template function
  const secondDirPath = path.join(dirPath, '..', '..', 'templates');

  if (secondDirPath != null && (await exists(secondDirPath))) {
    return secondDirPath;
  }

  // find template directory bundled js file
  const thirdDirPath = path.join(dirPath, 'templates');

  if (thirdDirPath != null && (await exists(thirdDirPath))) {
    return thirdDirPath;
  }

  throw new Error('Cannot found template and template path');
}
