import type { CE_ENTITY_VERSION_FROM } from 'src/configs/const-enum/CE_ENTITY_VERSION_FROM';
import type { CE_MERMAID_THEME } from 'src/configs/const-enum/CE_MERMAID_THEME';
import type { CE_OUTPUT_COMPONENT } from 'src/configs/const-enum/CE_OUTPUT_COMPONENT';
import type { CE_OUTPUT_FORMAT } from 'src/configs/const-enum/CE_OUTPUT_FORMAT';
import type { CE_PROJECT_NAME_FROM } from 'src/configs/const-enum/CE_PROJECT_NAME_FROM';
import type ICommonOption from 'src/configs/interfaces/ICommonOption';

export default interface IDocumentOption extends ICommonOption {
  /** define the output component to builded documents */
  components: CE_OUTPUT_COMPONENT[];

  /**
   * define whether project name will come from the `package.json` name field or database name
   *
   * - db: database name from TypeORM
   * - app: application name from package.json
   * */
  projectName: CE_PROJECT_NAME_FROM;

  /** define the directory to store `erdiadb.json` */
  databasePath?: string;

  /** define the directory to ETA templates. `erdia` are using [ETA](https://eta.js.org/) template engine */
  templatePath?: string;

  /** enabling the this option will skip attaching the ER diagram image file to the html document */
  skipImageInHtml?: boolean;

  /**
   * define the output format to builded documents
   *
   * - html
   * - markdown
   * - pdf
   * - image
   * */
  format: CE_OUTPUT_FORMAT;

  /**
   * define whether document version will come from the `package.json` version field or specific file, timestamp
   * */
  versionFrom: CE_ENTITY_VERSION_FROM;

  /** If the versionFrom option set `file`, read the file from this path */
  versionPath?: string;

  /**
   * define the mermaid.js plugin theme
   *
   * @url https://mermaid-js.github.io/mermaid/#/Setup?id=theme
   * */
  theme: CE_MERMAID_THEME;
}
