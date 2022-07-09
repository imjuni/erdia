import { isNotEmpty } from 'my-easy-fp';
import path from 'path';

export default function getFilename(filename: string, postfix?: string, newExtname?: string) {
  if (isNotEmpty(postfix)) {
    return [path.basename(filename, path.extname(filename)), postfix, newExtname ?? 'html'].join('.');
  }

  return [path.basename(filename, path.extname(filename)), newExtname ?? 'html'].join('.');
}
