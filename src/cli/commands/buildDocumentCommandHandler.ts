import { getDatabaseName } from '#/common/getDatabaseName';
import { getMetadata } from '#/common/getMetadata';
import { CE_MERMAID_THEME } from '#/configs/const-enum/CE_MERMAID_THEME';
import { CE_OUTPUT_FORMAT } from '#/configs/const-enum/CE_OUTPUT_FORMAT';
import type { IBuildCommandOption } from '#/configs/interfaces/IBuildCommandOption';
import { createHtml } from '#/creators/createHtml';
import { createImageHtml } from '#/creators/createImageHtml';
import { createMarkdown } from '#/creators/createMarkdown';
import { createPdfHtml } from '#/creators/createPdfHtml';
import { getRenderData } from '#/creators/getRenderData';
import type { IReason } from '#/creators/interfaces/IReason';
import { writeToImage } from '#/creators/writeToImage';
import { writeToPdf } from '#/creators/writeToPdf';
import { compareDatabase } from '#/databases/compareDatabase';
import { flushDatabase } from '#/databases/flushDatabase';
import type { IRelationRecord } from '#/databases/interfaces/IRelationRecord';
import { openDatabase } from '#/databases/openDatabase';
import { processDatabase } from '#/databases/processDatabase';
import { loadTemplates } from '#/template/loadTemplates';
import { getColumnRecord } from '#/typeorm/columns/getColumnRecord';
import { getEntityRecords } from '#/typeorm/entities/getEntityRecords';
import { getDataSource } from '#/typeorm/getDataSource';
import { getIndexRecords } from '#/typeorm/indices/getIndexRecords';
import { dedupeManaToManyRelationRecord } from '#/typeorm/relations/dedupeManaToManyRelationRecord';
import { getRelationRecords } from '#/typeorm/relations/getRelationRecords';
import { showLogo } from '@maeum/cli-logo';
import chalk from 'chalk';
import consola from 'consola';
import fastSafeStringify from 'fast-safe-stringify';
import { isError, isFalse } from 'my-easy-fp';
import { isFail, isPass, type IFail, type IPass } from 'my-only-either';
import fs from 'node:fs';
import type { DataSource } from 'typeorm';

export async function buildDocumentCommandHandler(option: IBuildCommandOption) {
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

    consola.info(`connection initialize: "${chalk.yellowBright(`${option.dataSourcePath}`)}"`);

    const dataSource = await getDataSource(option);
    await dataSource.initialize();

    if (isFalse(dataSource.isInitialized)) {
      throw new Error(`Cannot initialize in ${fastSafeStringify(dataSource.options, undefined, 2)}`);
    }

    localDataSource = dataSource;
    await loadTemplates(option);

    const metadata = await getMetadata(dataSource, option);

    consola.success('connection initialized');
    consola.info(`version: ${metadata.version}`);

    consola.info(`extract entities in ${getDatabaseName(dataSource.options)}`);

    const entities = getEntityRecords(dataSource, metadata);
    const indicesRecords = getIndexRecords(dataSource, metadata);
    const columns = dataSource.entityMetadatas
      .map((entity) => entity.columns.map((column) => getColumnRecord(column, option, metadata, indicesRecords)))
      .flat();

    const relationRecords = getRelationRecords(dataSource, metadata);

    const failRelations = relationRecords
      .filter((relationRecord): relationRecord is IFail<IReason> => isFail(relationRecord))
      .map((relationRecord) => relationRecord.fail)
      .flat();

    failRelations.forEach((relation) => consola.warn(relation.message));

    const passRelations = relationRecords
      .filter((relation): relation is IPass<IRelationRecord[]> => isPass(relation))
      .map((relationRecord) => relationRecord.pass)
      .flat();

    const dedupedRelations = dedupeManaToManyRelationRecord(passRelations);
    const records = [...entities, ...columns, ...dedupedRelations, ...indicesRecords];

    consola.success('complete extraction');
    consola.info('Database open and processing');

    const db = await openDatabase(option);
    const processedDb = await processDatabase(metadata, db, option);
    const compared = compareDatabase(metadata, records, processedDb.prev);

    const nextDb = [...compared, ...processedDb.next];
    const renderData = await getRenderData(nextDb, metadata, option);

    await flushDatabase(option, nextDb);
    consola.success('Database open and processing completed');

    consola.info(`output format: ${option.format}`);

    if (option.format === CE_OUTPUT_FORMAT.HTML) {
      const imageOption: IBuildCommandOption = {
        ...option,
        format: CE_OUTPUT_FORMAT.IMAGE,
        imageFormat: 'svg',
        width: '200%',
        theme: CE_MERMAID_THEME.DARK,
      };

      const documents = await createHtml(option, renderData);
      await Promise.all(documents.map((document) => fs.promises.writeFile(document.filename, document.content)));

      if (!option.skipImageInHtml) {
        const imageDocument = await createImageHtml(imageOption, renderData);
        await writeToImage(imageDocument, imageOption, renderData);
      }

      return documents.map((document) => document.filename);
    }

    if (option.format === CE_OUTPUT_FORMAT.MARKDOWN) {
      const document = await createMarkdown(option, renderData);
      await fs.promises.writeFile(document.filename, document.content);
      return [document.filename];
    }

    if (option.format === CE_OUTPUT_FORMAT.PDF) {
      const document = await createPdfHtml(option, renderData);
      const filenames = await writeToPdf(document, option, renderData);
      return filenames;
    }

    if (option.format === CE_OUTPUT_FORMAT.IMAGE) {
      const document = await createImageHtml(option, renderData);
      const filenames = await writeToImage(document, option, renderData);
      return filenames;
    }

    return [];
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
