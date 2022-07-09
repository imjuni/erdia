import IErdiaCommonOption from '@config/interface/IErdiaCommonOption';

export default interface IErdiaImageOption extends IErdiaCommonOption {
  type: 'image';

  /** ER diagram width, it will be set width css attribute */
  width: string;

  /** puppeteer viewport width */
  viewportWidth: number;

  /** puppeteer viewport height */
  viewportHeight: number;

  /** puppeteer config file path */
  puppeteerConfigPath?: string;

  /** export image file format */
  imageFormat: 'png' | 'svg';

  /** Background color. Example: transparent, red, '#F0F0F0'. Optional. Default: white */
  backgroundColor: string;
}
