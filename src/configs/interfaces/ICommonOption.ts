export interface ICommonOption {
  /** define the path to to configuration file: .erdiarc */
  config: string;

  /** define the directory to output file */
  output?: string;

  /** define the ORM used to load the schema */
  orm?: "drizzle" | "typeorm";

  /** define the path to a TypeORM data source or Drizzle schema file */
  dataSourcePath: string;

  /** define the logo display on cli interface */
  showLogo?: boolean;
}
