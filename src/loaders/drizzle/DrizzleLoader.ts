import type { IRecordMetadata } from "#/databases/interfaces/IRecordMetadata";
import type { TDatabaseRecord } from "#/databases/interfaces/TDatabaseRecord";
import { getDrizzleRecords } from "#/loaders/drizzle/extractors/getDrizzleRecords";
import type { IDrizzleSource } from "#/loaders/drizzle/interfaces/IDrizzleSource";
import type { ISchemaLoader } from "#/loaders/interfaces/ISchemaLoader";

export class DrizzleLoader implements ISchemaLoader {
  readonly name = "drizzle" as const;
  private readonly source: IDrizzleSource;
  public constructor(source: IDrizzleSource) {
    this.source = source;
  }
  public initialize() {
    void this.source;
    return Promise.resolve();
  }
  public async dispose() {
    await this.source.dispose?.();
  }
  public extract(metadata: IRecordMetadata): Promise<TDatabaseRecord[]> {
    return Promise.resolve(getDrizzleRecords(this.source, metadata));
  }
}
