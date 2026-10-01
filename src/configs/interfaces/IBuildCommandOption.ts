import type { IDocumentOption } from "#/configs/interfaces/IDocumentOption";

export interface IBuildCommandOption extends IDocumentOption {
  /**
   * define the route base path. The route base path is used as the base path for navbar anchor when generating HTML documents
   * Format: html
   * */
  routeBasePath?: string;

  /**
   * define what will be written in the HTML document title tag
   * Format: html
   * */
  title?: string;

  /** define the path to the prettier configuration file */
  prettierConfig?: string;

  /**
   * define the path to the puppeteer configuration file
   * Format: html, pdf, image
   * */
  puppeteerConfig?: string;

  /**
   * define the ER diagram width. The width is defined by the HTML document css attribute width
   * Format: html, pdf, image
   * */
  width?: string;

  /**
   * define the viewport width to puppeteer. The width is defined by the HTML document css attribute width
   * Format: html, pdf, image
   * */
  viewportWidth?: number;

  /**
   * define the viewport height to puppeteer. The width is defined by the HTML document css attribute height
   * Format: html, pdf, image
   * */
  viewportHeight?: number;

  /**
   * define the background color to html documents. eg. transparent, red, '#F0F0F0'
   * Format: pdf, image
   * */
  backgroundColor?: string;

  /**
   * define the format to image file
   * Format: image
   * */
  imageFormat?: "png" | "svg";
}
