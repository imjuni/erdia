export interface IErdiaCliOptions {
  /** use ormconfig file */
  'use-ormconfig': boolean;

  /** database name */
  database: string;

  /**
   * use loader script,
   * loader script default function return typeorm Connection object
   * type is () => Connection
   * */
  'use-loader-path'?: string;
}
