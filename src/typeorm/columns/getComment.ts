import type IBuildCommandOption from '#configs/interfaces/IBuildCommandOption';

export default function getComment(option: Pick<IBuildCommandOption, 'format'>, comment: undefined | null | string) {
  if (comment == null) {
    return '';
  }

  if (option.format === 'markdown') {
    return comment;
  }

  if (option.format === 'html') {
    return comment.replace(/\n/g, '<br />');
  }

  return comment.replace(/\n/g, '<br />');
}
