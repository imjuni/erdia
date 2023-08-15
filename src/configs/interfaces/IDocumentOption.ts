import type { CE_OUTPUT_COMPONENT } from '#configs/const-enum/CE_OUTPUT_COMPONENT';
import type { CE_OUTPUT_FORMAT } from '#configs/const-enum/CE_OUTPUT_FORMAT';
import type ICommonOption from '#configs/interfaces/ICommonOption';

export default interface IDocumentOption extends ICommonOption {
  /** type of generated document */
  components: CE_OUTPUT_COMPONENT[];

  /** custom template file path. `erdia` are using [EJS](https://ejs.co/) template engine */
  templatePath?: string;

  /**
   * output format of generated documents
   * - html
   * - markdown
   * - pdf
   * - image
   * */
  format: CE_OUTPUT_FORMAT;

  /**
   * mermaid.js plugin theme configuration
   *
   * @url https://mermaid-js.github.io/mermaid/#/Setup?id=theme
   * */
  theme: 'default' | 'forest' | 'dark' | 'neutral';
}
