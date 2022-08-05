import TERColumn from '@config/interface/TERColumn';

export default interface IErdiaCommonOption {
  /** file path of configuration */
  c: string;
  /** file path of configuration */
  config: string;

  /** if set output option, erdia write result that is given name */
  o?: string[];
  /** if set output option, erdia write result that is given name */
  output?: string[];

  /** indent size of mermaid code */
  indent: number;

  /**
   * output column of er diagram
   *
   * column-type(*)
   * column-name(*)
   * attribute-key
   * comment
   * */
  erColumns: TERColumn[];

  /** verbose message display */
  v: boolean;
  /** verbose message display */
  verbose: boolean;

  /** typeorm dataSourcePath */
  d: string;
  /** typeorm dataSourcePath */
  dataSourcePath: string;

  /**
   * mermaid.js plugin theme configuration
   *
   * @url https://mermaid-js.github.io/mermaid/#/Setup?id=theme
   * */
  theme: 'default' | 'forest' | 'dark' | 'neutral' | 'null';
}
