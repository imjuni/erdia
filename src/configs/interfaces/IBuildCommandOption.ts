import type IDocumentOption from '#configs/interfaces/IDocumentOption';

export default interface IBuildCommandOption extends IDocumentOption {
  $kind: 'build';

  /** prettier config path */
  prettierConfig?: string;

  /** title tag content that inside of html document */
  title?: string;

  /** address of route base path for html document */
  routeBasePath?: string;

  /**
   * ER diagram width, it will be set width css attribute
   * @format html, pdf, image
   * */
  width?: string;

  /**
   * puppeteer viewport width
   * @format pdf, image
   * */
  viewportWidth?: number;

  /**
   * puppeteer viewport height
   * @format pdf, image
   * */
  viewportHeight?: number;

  /**
   * puppeteer config file path
   * @format pdf, image
   * */
  puppeteerConfigPath?: string;

  /**
   * Background color. Example: transparent, red, '#F0F0F0'. Optional. Default: white
   * @format pdf, image
   * */
  backgroundColor?: string;

  /**
   * ER diagram export image file format
   * @format image
   * */
  imageFormat?: 'png' | 'svg';
}
