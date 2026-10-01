import type { DataSource } from "typeorm";

import type { CE_OUTPUT_FORMAT } from "#/configs/const-enum/CE_OUTPUT_FORMAT";
import type { IRecordMetadata } from "#/databases/interfaces/IRecordMetadata";
import type { TDatabaseRecord } from "#/databases/interfaces/TDatabaseRecord";
import type { ISchemaLoader } from "#/loaders/interfaces/ISchemaLoader";
import { getTypeOrmRecords } from "#/loaders/typeorm/extractors/getTypeOrmRecords";

export class TypeOrmLoader implements ISchemaLoader {
  readonly name = "typeorm" as const;
  private readonly dataSource: DataSource;
  private readonly format: CE_OUTPUT_FORMAT;
  private initializedByLoader = false;
  public constructor(
    dataSource: DataSource,
    format: CE_OUTPUT_FORMAT = "html"
  ) {
    this.dataSource = dataSource;
    this.format = format;
  }
  public async initialize() {
    if (!this.dataSource.isInitialized) {
      await this.dataSource.initialize();
      this.initializedByLoader = true;
    }
  }
  public async dispose() {
    if (this.initializedByLoader && this.dataSource.isInitialized) {
      await this.dataSource.destroy();
      this.initializedByLoader = false;
    }
  }
  public extract(metadata: IRecordMetadata): Promise<TDatabaseRecord[]> {
    return Promise.resolve(
      getTypeOrmRecords(this.dataSource, this.format, metadata)
    );
  }
}
