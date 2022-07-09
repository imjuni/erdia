import IErdiaDocumentOption from '@config/interface/IErdiaDocumentOption';

export default interface IErdiaMarkdownOption extends IErdiaDocumentOption {
  type: 'markdown';

  /** replace newline character "\n" to <br /> tag. */
  htmlBr: boolean;
}
