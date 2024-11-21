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
import { container } from '#/modules/containers/container';
import { SymbolDataSource } from '#/modules/containers/keys/SymbolDataSource';
import { SymbolDefaultTemplate } from '#/modules/containers/keys/SymbolDefaultTemplate';
import { SymbolLogger } from '#/modules/containers/keys/SymbolLogger';
import { SymbolTemplate } from '#/modules/containers/keys/SymbolTemplate';
import { SymbolTemplateRenderer } from '#/modules/containers/keys/SymbolTemplateRenderer';
import { betterMkdir } from '#/modules/files/betterMkdir';
import type { Logger } from '#/modules/loggers/Logger';
import { createLogger } from '#/modules/loggers/createLogger';
import { TemplateRenderer } from '#/templates/TemplateRenderer';
import { loadTemplates } from '#/templates/modules/loadTemplates';
import { getColumnRecord } from '#/typeorm/columns/getColumnRecord';
import { getEntityRecords } from '#/typeorm/entities/getEntityRecords';
import { getDataSource } from '#/typeorm/getDataSource';
import { getIndexRecords } from '#/typeorm/indices/getIndexRecords';
import { dedupeManyToManyRelationRecord } from '#/typeorm/relations/dedupeManyToManyRelationRecord';
import { getRelationRecords } from '#/typeorm/relations/getRelationRecords';
import { asValue } from 'awilix';
import chalk from 'chalk';
import fastSafeStringify from 'fast-safe-stringify';
import { isError, isFalse } from 'my-easy-fp';
import { isFail, isPass, type IFail, type IPass } from 'my-only-either';
import fs from 'node:fs';
import type { SetOptional } from 'type-fest';
import type { DataSource } from 'typeorm';

export async function building(option: SetOptional<IBuildCommandOption, 'config'>, logging?: boolean) {
  createLogger(logging);
  const logger = container.resolve<Logger>(SymbolLogger);

  try {
    logger.info(`connection initialize: "${chalk.yellowBright(`${option.dataSourcePath}`)}"`);

    const dataSource = await getDataSource(option);
    const [templates] = await Promise.all([await loadTemplates(option), await dataSource.initialize()]);
    const renderer = new TemplateRenderer(templates.template, templates.default);

    if (isFalse(dataSource.isInitialized)) {
      throw new Error(`Cannot initialize in ${fastSafeStringify(dataSource.options, undefined, 2)}`);
    }

    container.register(SymbolDefaultTemplate, asValue(templates.default));
    container.register(SymbolTemplate, asValue(templates.template));
    container.register(SymbolDataSource, asValue(dataSource));
    container.register(SymbolTemplateRenderer, asValue(renderer));

    const metadata = await getMetadata(option);

    logger.success('connection initialized');
    logger.info(`version: ${metadata.version}`);

    logger.info(`extract entities in ${getDatabaseName(dataSource.options)}`);

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

    failRelations.forEach((relation) => logger.warn(relation.message));

    const passRelations = relationRecords
      .filter((relation): relation is IPass<IRelationRecord[]> => isPass(relation))
      .map((relationRecord) => relationRecord.pass)
      .flat();

    const dedupedRelations = dedupeManyToManyRelationRecord(passRelations);
    const records = [...entities, ...columns, ...dedupedRelations, ...indicesRecords];

    logger.success('complete extraction');
    logger.info('Database open and processing');

    const db = await openDatabase(option);
    const processedDb = await processDatabase(metadata, db, option);
    const compared = compareDatabase(metadata, records, processedDb.prev);

    const nextDb = [...compared, ...processedDb.next];
    const renderData = await getRenderData(nextDb, metadata, option);

    await flushDatabase(option, nextDb);
    logger.success('Database open and processing completed');

    logger.info(`output format: ${option.format}`);

    if (option.format === CE_OUTPUT_FORMAT.HTML) {
      const imageOption: SetOptional<IBuildCommandOption, 'config'> = {
        ...option,
        format: CE_OUTPUT_FORMAT.IMAGE,
        imageFormat: 'svg',
        width: '200%',
        theme: CE_MERMAID_THEME.DARK,
      };

      const documents = await createHtml(option, renderData);
      await Promise.all(
        documents.map(async (document) => {
          await betterMkdir(document.dirname);
          await fs.promises.writeFile(document.filename, document.content);
        }),
      );

      if (!option.skipImageInHtml) {
        const imageDocument = await createImageHtml(imageOption, renderData);
        await writeToImage(imageDocument, imageOption, renderData);
      }

      return documents.map((document) => document.filename);
    }

    if (option.format === CE_OUTPUT_FORMAT.MARKDOWN) {
      const document = await createMarkdown(option, renderData);
      await betterMkdir(document.dirname);
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
      await betterMkdir(document.dirname);
      const filenames = await writeToImage(document, option, renderData);
      return filenames;
    }

    return [];
  } catch (caught) {
    const err = isError(caught, new Error('unknown error raised from createHtmlDocCommand'));
    logger.error(err);

    return [];
  } finally {
    if (container.hasRegistration(SymbolDataSource)) {
      const dataSource = container.resolve<DataSource>(SymbolDataSource);
      await dataSource.destroy();
    }
  }
}
