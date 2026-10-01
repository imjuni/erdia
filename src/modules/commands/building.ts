import fs from "node:fs";

import { asValue } from "awilix";
import chalk from "chalk";
import fastSafeStringify from "fast-safe-stringify";
import { isError, isFalse } from "my-easy-fp";
import type { SetOptional } from "type-fest";
import type { DataSource } from "typeorm";

import { getDatabaseName } from "#/common/getDatabaseName";
import { getMetadata } from "#/common/getMetadata";
import { CE_MERMAID_THEME } from "#/configs/const-enum/CE_MERMAID_THEME";
import { CE_OUTPUT_FORMAT } from "#/configs/const-enum/CE_OUTPUT_FORMAT";
import type { IBuildCommandOption } from "#/configs/interfaces/IBuildCommandOption";
import { createHtml } from "#/creators/createHtml";
import { createImageHtml } from "#/creators/createImageHtml";
import { createMarkdown } from "#/creators/createMarkdown";
import { createPdfHtml } from "#/creators/createPdfHtml";
import { getRenderData } from "#/creators/getRenderData";
import { writeToImage } from "#/creators/writeToImage";
import { writeToPdf } from "#/creators/writeToPdf";
import { compareDatabase } from "#/databases/compareDatabase";
import { flushDatabase } from "#/databases/flushDatabase";
import { openDatabase } from "#/databases/openDatabase";
import { processDatabase } from "#/databases/processDatabase";
import { getDataSource } from "#/loaders/typeorm/connections/getDataSource";
import { TypeOrmLoader } from "#/loaders/typeorm/TypeOrmLoader";
import { container } from "#/modules/containers/container";
import { SymbolDataSource } from "#/modules/containers/keys/SymbolDataSource";
import { SymbolDefaultTemplate } from "#/modules/containers/keys/SymbolDefaultTemplate";
import { SymbolLogger } from "#/modules/containers/keys/SymbolLogger";
import { SymbolTemplate } from "#/modules/containers/keys/SymbolTemplate";
import { SymbolTemplateRenderer } from "#/modules/containers/keys/SymbolTemplateRenderer";
import { betterMkdir } from "#/modules/files/betterMkdir";
import { createLogger } from "#/modules/loggers/createLogger";
import type { Logger } from "#/modules/loggers/Logger";
import { loadTemplates } from "#/templates/modules/loadTemplates";
import { TemplateRenderer } from "#/templates/TemplateRenderer";

export const building = async (
  option: SetOptional<IBuildCommandOption, "config">,
  logging?: boolean
) => {
  createLogger(logging);
  const logger = container.resolve<Logger>(SymbolLogger);
  try {
    logger.info(
      `connection initialize: "${chalk.yellowBright(option.dataSourcePath)}"`
    );
    const dataSource = await getDataSource(option);
    const loader = new TypeOrmLoader(dataSource, option.format);
    await loader.initialize();
    const templates = await loadTemplates(option);
    const renderer = new TemplateRenderer(
      templates.template,
      templates.default
    );
    if (isFalse(dataSource.isInitialized)) {
      throw new Error(
        `Cannot initialize in ${fastSafeStringify(dataSource.options, undefined, 2)}`
      );
    }
    container.register(SymbolDefaultTemplate, asValue(templates.default));
    container.register(SymbolTemplate, asValue(templates.template));
    container.register(SymbolDataSource, asValue(dataSource));
    container.register(SymbolTemplateRenderer, asValue(renderer));
    const metadata = await getMetadata(option);
    logger.success("connection initialized");
    logger.info(`version: ${metadata.version}`);
    logger.info(`extract entities in ${getDatabaseName(dataSource.options)}`);
    const records = await loader.extract(metadata);
    logger.success("complete extraction");
    logger.info("Database open and processing");
    const db = await openDatabase(option);
    const processedDb = await processDatabase(metadata, db, option);
    const compared = compareDatabase(metadata, records, processedDb.prev);
    const nextDb = [...compared, ...processedDb.next];
    const renderData = await getRenderData(nextDb, metadata, option);
    await flushDatabase(option, nextDb);
    logger.success("Database open and processing completed");
    logger.info(`output format: ${option.format}`);
    if (option.format === CE_OUTPUT_FORMAT.HTML) {
      const imageOption: SetOptional<IBuildCommandOption, "config"> = {
        ...option,
        format: CE_OUTPUT_FORMAT.IMAGE,
        imageFormat: "svg",
        width: "200%",
        theme: CE_MERMAID_THEME.DARK,
      };
      const documents = await createHtml(option, renderData);
      await Promise.all(
        documents.map(async (document) => {
          await betterMkdir(document.dirname);
          await fs.promises.writeFile(document.filename, document.content);
        })
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
  } catch (error) {
    const err = isError(
      error,
      new Error("unknown error raised from createHtmlDocCommand")
    );
    logger.error(err);
    return [];
  } finally {
    if (container.hasRegistration(SymbolDataSource)) {
      const dataSource = container.resolve<DataSource>(SymbolDataSource);
      await dataSource.destroy();
    }
  }
};
