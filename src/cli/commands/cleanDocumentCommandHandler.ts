import getMetadata from '#common/getMetadata';
import { CE_DEFAULT_VALUE } from '#configs/const-enum/CE_DEFAULT_VALUE';
import type ICommonOption from '#configs/interfaces/ICommonOption';
import getCwd from '#configs/modules/getCwd';
import getOutputDirectory from '#tools/files/getOutputDirectory';
import getDataSource from '#typeorm/getDataSource';
import { showLogo } from '@maeum/cli-logo';
import consola from 'consola';
import del from 'del';
import fastSafeStringify from 'fast-safe-stringify';
import { isError, isFalse } from 'my-easy-fp';
import path from 'path';
import type { DataSource } from 'typeorm';

export default async function cleanDocumentCommandHandler(option: ICommonOption) {
  let localDataSource: DataSource | undefined;

  try {
    if (option.showLogo != null) {
      await showLogo({
        message: 'erdia',
        figlet: { font: 'ANSI Shadow', width: 80 },
        color: 'cyan',
      });
    } else {
      consola.info('erdia build start');
    }

    const dataSource = await getDataSource(option);
    await dataSource.initialize();

    if (isFalse(dataSource.isInitialized)) {
      throw new Error(`Cannot initialize in ${fastSafeStringify(dataSource.options, undefined, 2)}`);
    }

    localDataSource = dataSource;

    const metadata = await getMetadata(dataSource, { ...option, versionFrom: 'package.json', projectName: 'app' });
    const outputDir = await getOutputDirectory(option, getCwd(process.env));

    const filenames = [
      path.join(outputDir, CE_DEFAULT_VALUE.HTML_MERMAID_FILENAME),
      path.join(outputDir, CE_DEFAULT_VALUE.HTML_INDEX_FILENAME),
      path.join(outputDir, `${metadata.name}.md`),
      path.join(outputDir, `${metadata.name}.png`),
      path.join(outputDir, `${metadata.name}.svg`),
    ];

    await del(filenames);

    return filenames;
  } catch (caught) {
    const err = isError(caught, new Error('unknown error raised from createHtmlDocCommand'));

    consola.error(err.message);
    consola.error(err.stack);

    return [];
  } finally {
    if (localDataSource != null) {
      await localDataSource.destroy();
    }
  }
}
