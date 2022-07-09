import IErdiaDocumentOption from '@config/interface/IErdiaDocumentOption';

export default interface IErdiaPDFOption extends IErdiaDocumentOption {
  type: 'pdf';

  /** ER diagram width, it will be set width css attribute */
  width: string;

  /** puppeteer viewport width */
  viewportWidth: number;

  /** puppeteer viewport height */
  viewportHeight: number;

  /** puppeteer config file path */
  puppeteerConfigPath?: string;

  /** Background color. Example: transparent, red, '#F0F0F0'. Optional. Default: white */
  backgroundColor: string;
}
