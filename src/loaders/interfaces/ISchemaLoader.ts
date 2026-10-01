import type { IRecordMetadata } from "#/databases/interfaces/IRecordMetadata";
import type { TDatabaseRecord } from "#/databases/interfaces/TDatabaseRecord";

export interface ISchemaLoader {
  readonly name: "typeorm" | "drizzle";
  initialize: () => Promise<void>;
  extract: (metadata: IRecordMetadata) => Promise<TDatabaseRecord[]>;
  dispose: () => Promise<void>;
}
