import type IDocumentOption from '#/configs/interfaces/IDocumentOption';

export default interface IBuildCommandOption extends IDocumentOption {
  /**
   * define the route base path. The route base path is used as the base path for navbar anchor when generating HTML documents
   * @format html
   * */
  routeBasePath?: string;

  /**
   * define what will be written in the HTML document title tag
   * @format html
   * */
  title?: string;

  /** define the path to the prettier configuration file */
  prettierConfig?: string;

  /**
   * define the path to the puppeteer configuration file
   * @format html, pdf, image
   * */
  puppeteerConfig?: string;

  /**
   * define the ER diagram width. The width is defined by the HTML document css attribute width
   * @format html, pdf, image
   * */
  width?: string;

  /**
   * define the viewport width to puppeteer. The width is defined by the HTML document css attribute width
   * @format html, pdf, image
   * */
  viewportWidth?: number;

  /**
   * define the viewport height to puppeteer. The width is defined by the HTML document css attribute height
   * @format html, pdf, image
   * */
  viewportHeight?: number;

  /**
   * define the background color to html documents. eg. transparent, red, '#F0F0F0'
   * @format pdf, image
   * */
  backgroundColor?: string;

  /**
   * define the format to image file
   * @format image
   * */
  imageFormat?: 'png' | 'svg';
}
