export interface IErdiaCliOptions {
  /** dataSource path */
  dataSourcePath: string;

  /** connection configuration file path (contain dataSourceOption in ts, js, import file) */
  // connectionConfigPath: string;

  /** output filename */
  output?: string;

  /** use html extension */
  html: boolean;

  /** verbose log message */
  verbose: boolean;
}
