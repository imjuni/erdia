import { CE_OUTPUT_FORMAT } from '#configs/const-enum/CE_OUTPUT_FORMAT';
import type IBuildCommandOption from '#configs/interfaces/IBuildCommandOption';

export default function getComment(option: Pick<IBuildCommandOption, 'format'>, comment: undefined | null | string) {
  if (comment == null) {
    return '';
  }

  if (option.format === CE_OUTPUT_FORMAT.MARKDOWN) {
    return comment.replace(/\r\n/g, '\\\\r\\\\n').replace(/\n\r/g, '\\\\n\\\\r').replace(/\n/g, '\\\\n');
  }

  if (option.format === 'html') {
    return comment.replace(/\r\n/g, '<br />').replace(/\n\r/g, '<br />').replace(/\n/g, '<br />');
  }

  return comment.replace(/\r\n/g, '<br />').replace(/\n\r/g, '<br />').replace(/\n/g, '<br />');
}
