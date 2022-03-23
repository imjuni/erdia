export interface IErdiaCliOptions {
  /** configuration name */
  name: string;

  /** ormconfig file path */
  ormconfigPath: string;

  /** output filename */
  output?: string;

  /** use html extension */
  html: boolean;
}
