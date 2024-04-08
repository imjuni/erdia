import { getMetadata } from '#/common/getMetadata';
import { CE_DEFAULT_VALUE } from '#/configs/const-enum/CE_DEFAULT_VALUE';
import type { ICommonOption } from '#/configs/interfaces/ICommonOption';
import { getCwd } from '#/configs/modules/getCwd';
import { container } from '#/modules/containers/container';
import { SymbolDataSource } from '#/modules/containers/keys/SymbolDataSource';
import { getOutputDirectory } from '#/modules/files/getOutputDirectory';
import { getDataSource } from '#/typeorm/getDataSource';
import { showLogo } from '@maeum/cli-logo';
import { asValue } from 'awilix';
import consola from 'consola';
import del from 'del';
import fastSafeStringify from 'fast-safe-stringify';
import { isError, isFalse } from 'my-easy-fp';
import pathe from 'pathe';
import type { DataSource } from 'typeorm';

export async function cleaning(option: ICommonOption) {
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

    container.register(SymbolDataSource, asValue(dataSource));

    const metadata = await getMetadata({ ...option, versionFrom: 'package.json', projectName: 'app' });
    const outputDirPath = await getOutputDirectory(option, getCwd(process.env));

    const filenames = [
      pathe.join(outputDirPath, CE_DEFAULT_VALUE.HTML_MERMAID_FILENAME),
      pathe.join(outputDirPath, CE_DEFAULT_VALUE.HTML_INDEX_FILENAME),
      pathe.join(outputDirPath, `${metadata.name}.md`),
      pathe.join(outputDirPath, `${metadata.name}.png`),
      pathe.join(outputDirPath, `${metadata.name}.svg`),
    ];

    await del(filenames);

    return filenames;
  } catch (caught) {
    const err = isError(caught, new Error('unknown error raised from createHtmlDocCommand'));
    consola.error(err);

    return [];
  } finally {
    if (container.hasRegistration(SymbolDataSource)) {
      const dataSource = container.resolve<DataSource>(SymbolDataSource);
      await dataSource.destroy();
    }
  }
}
