import IErdiaHtmlOption from '@config/interface/IErdiaHtmlOption';
import IErdiaImageOption from '@config/interface/IErdiaImageOption';
import IErdiaMarkdownOption from '@config/interface/IErdiaMarkdownOption';
import IErdiaPDFOption from '@config/interface/IErdiaPDFOption';

export default function getComment(
  option: IErdiaHtmlOption | IErdiaMarkdownOption | IErdiaPDFOption | IErdiaImageOption,
  comment: undefined | null | string,
) {
  if (comment === undefined || comment === null) {
    return '';
  }

  if (option.type === 'markdown' && option.htmlBr) {
    return comment.replace(/\n/g, '<br />');
  }

  if (option.type === 'markdown') {
    return comment;
  }

  if (option.type === 'html') {
    return comment.replace(/\n/g, '<br />');
  }

  return comment.replace(/\n/g, '<br />');
}
