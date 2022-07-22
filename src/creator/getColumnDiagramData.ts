import IErdiaHtmlOption from '@config/interface/IErdiaHtmlOption';
import IErdiaImageOption from '@config/interface/IErdiaImageOption';
import IErdiaMarkdownOption from '@config/interface/IErdiaMarkdownOption';
import IErdiaPDFOption from '@config/interface/IErdiaPDFOption';
import IColumnData from '@typeorm/interface/IColumnData';
import sanitizeHtml from 'sanitize-html';

export default function getColumnDiagramData(
  column: IColumnData,
  option: IErdiaHtmlOption | IErdiaMarkdownOption | IErdiaPDFOption | IErdiaImageOption,
) {
  const columnData = [column.columnType, column.columnName];

  if (option.erColumns.includes('attribute-key') && column.attributeKey !== undefined && column.attributeKey !== '') {
    columnData.push(column.attributeKey);
  }

  if (option.erColumns.includes('comment') && column.comment !== undefined && column.comment !== '') {
    const comment = sanitizeHtml(column.comment, {
      allowedTags: [],
      disallowedTagsMode: 'escape',
    });

    columnData.push(`"${comment}"`);
  }

  return {
    columns: columnData,
    mermaid: columnData.join(' '),
    weight: column.weight,
  };
}
