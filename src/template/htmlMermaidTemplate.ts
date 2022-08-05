import IErdiaHtmlOption from '@config/interface/IErdiaHtmlOption';
import IErdiaImageOption from '@config/interface/IErdiaImageOption';
import IErdiaPDFOption from '@config/interface/IErdiaPDFOption';

export default function htmlMermaidTemplate(
  mermaid: string,
  includeTextarea: boolean,
  option: IErdiaHtmlOption | IErdiaPDFOption | IErdiaImageOption,
) {
  if (mermaid === '') {
    return mermaid;
  }

  const { width } = option;

  return `<pre id="mermaid-box" class="mermaid" style="width: ${width};">
%%{init: {'theme':'${option.theme}'}}%%
${mermaid}
</pre>

${
  includeTextarea
    ? `
<form style="margin-top: 20px;">
  <textarea class="textarea" rows="7">
    ${mermaid}
  </textarea>
</form>
`.trim()
    : ''
}`;
}
