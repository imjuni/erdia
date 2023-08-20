import type { CE_OUTPUT_COMPONENT } from '#configs/const-enum/CE_OUTPUT_COMPONENT';
import type { CE_OUTPUT_FORMAT } from '#configs/const-enum/CE_OUTPUT_FORMAT';
import type { CE_PROJECT_NAME_FROM } from '#configs/const-enum/CE_PROJECT_NAME_FROM';
import type ICommonOption from '#configs/interfaces/ICommonOption';

export default interface IDocumentOption extends ICommonOption {
  /** type of generated document */
  components: CE_OUTPUT_COMPONENT[];

  /**
   * determine whether project name will come from the name in `package.json` or database name
   *
   * - db: database name from TypeORM
   * - app: application name from package.json
   * */
  projectName: CE_PROJECT_NAME_FROM;

  /** custom template file path. `erdia` are using [EJS](https://ejs.co/) template engine */
  templatePath?: string;

  /** erdia entity database file path */
  databasePath?: string;

  /** document version using package.json version or timestamp */
  versionFrom: 'timestamp' | 'package.json' | 'file';

  /** If the versionFrom option set `file`, read the file from this path */
  versionPath?: string;

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
