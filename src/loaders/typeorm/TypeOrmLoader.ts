import type { DataSource } from "typeorm";

import type { CE_OUTPUT_FORMAT } from "#/configs/const-enum/CE_OUTPUT_FORMAT";
import type { IRecordMetadata } from "#/databases/interfaces/IRecordMetadata";
import type { TDatabaseRecord } from "#/databases/interfaces/TDatabaseRecord";
import type { ISchemaLoader } from "#/loaders/interfaces/ISchemaLoader";
import { getColumnRecord } from "#/typeorm/columns/getColumnRecord";
import { getEntityRecords } from "#/typeorm/entities/getEntityRecords";
import { getIndexRecords } from "#/typeorm/indices/getIndexRecords";
import { dedupeManyToManyRelationRecord } from "#/typeorm/relations/dedupeManyToManyRelationRecord";
import { getRelationRecords } from "#/typeorm/relations/getRelationRecords";

export class TypeOrmLoader implements ISchemaLoader {
  readonly name = "typeorm" as const;
  private readonly dataSource: DataSource;
  private readonly format: CE_OUTPUT_FORMAT;
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
    }
  }
  public async dispose() {
    if (this.dataSource.isInitialized) {
      await this.dataSource.destroy();
    }
  }
  public extract(metadata: IRecordMetadata): Promise<TDatabaseRecord[]> {
    const indices = getIndexRecords(this.dataSource, metadata);
    const columns = this.dataSource.entityMetadatas.flatMap((entity) =>
      entity.columns.map((column) =>
        getColumnRecord(column, { format: this.format }, metadata, indices)
      )
    );
    const relations = getRelationRecords(this.dataSource, metadata)
      .flatMap((result) => ("pass" in result ? result.pass : []))
      .flat();
    return Promise.resolve([
      ...getEntityRecords(this.dataSource, metadata),
      ...columns,
      ...dedupeManyToManyRelationRecord(relations),
      ...indices,
    ]);
  }
}
