export default interface ICommonOption {
  /** define the path to to configuration file: .erdiarc */
  config: string;

  /** define the directory to output file */
  output?: string;

  /** define the path to TypeORM data source file */
  dataSourcePath: string;

  /** define the logo display on cli interface */
  showLogo?: boolean;
}
