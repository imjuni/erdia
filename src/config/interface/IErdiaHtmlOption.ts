import IErdiaDocumentOption from '@config/interface/IErdiaDocumentOption';

export default interface IErdiaHtmlOption extends IErdiaDocumentOption {
  type: 'html';

  /**
   * ER diagram width, it will be set width css attribute
   * */
  width: string;
}
