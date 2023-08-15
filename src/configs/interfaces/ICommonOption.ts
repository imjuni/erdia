export default interface ICommonOption {
  /** file path of configuration */
  config: string;

  /** directory for output files */
  output?: string;

  /** typeorm dataSourcePath */
  dataSourcePath: string;
}
