export interface IDrizzleSource {
  readonly db: unknown;
  readonly schema?: Record<string, unknown>;
  readonly databaseName?: string;
  readonly dispose?: () => void | Promise<void>;
}

export const defineDrizzleSource = (source: IDrizzleSource) => source;
