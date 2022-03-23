import path from 'path';
import { IErdiaCliOptions } from './options';
import { isEmpty, isFalse, TNullablePick } from 'my-easy-fp';
import { exists, getDirname, isDirectory } from './filetools';
import fs from 'fs';

const configWeightMap: Record<string, number> = {
  '.env': 3,
  '.js': 4,
  '.mjs': 5,
  '.cjs': 6,
  '.ts': 2,
  '.mts': 7,
  '.cts': 8,
  '.json': 1,
  '.yml': 9,
  '.yaml': 10,
  '.xml': 11,
};

export default async function ormconfigFinder(
  options: TNullablePick<IErdiaCliOptions, 'ormconfigPath'>,
): Promise<{ path: string; name: string }> {
  const cwd = process.cwd();
  const ormconfigPath = await getDirname(options.ormconfigPath ?? path.join(cwd));

  const configFilename = await (async () => {
    if (isEmpty(options.ormconfigPath)) {
      return 'ormconfig';
    }

    if (
      (await exists(options.ormconfigPath)) &&
      isFalse(await isDirectory(options.ormconfigPath))
    ) {
      return path.basename(options.ormconfigPath).replace(path.extname(options.ormconfigPath), '');
    }

    return 'ormconfig';
  })();

  const filenames = await fs.promises.readdir(ormconfigPath);

  const ormconfigFiles = filenames
    .filter(
      (filename) => path.basename(filename).replace(path.extname(filename), '') === configFilename,
    )
    .sort(
      (left, right) =>
        configWeightMap[path.extname(left)] ?? 0 - configWeightMap[path.extname(right)] ?? 0,
    );
  const [ormconfigFile] = ormconfigFiles;

  return { path: path.resolve(path.join(ormconfigPath, ormconfigFile)), name: configFilename };
}
