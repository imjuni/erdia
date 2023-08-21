import type { CE_ENTITY_VERSION_FROM } from '#configs/const-enum/CE_ENTITY_VERSION_FROM';
import type { CE_MERMAID_THEME } from '#configs/const-enum/CE_MERMAID_THEME';
import type { CE_OUTPUT_COMPONENT } from '#configs/const-enum/CE_OUTPUT_COMPONENT';
import type { CE_OUTPUT_FORMAT } from '#configs/const-enum/CE_OUTPUT_FORMAT';
import type { CE_PROJECT_NAME_FROM } from '#configs/const-enum/CE_PROJECT_NAME_FROM';

export interface IInitDocAnswer {
  format: CE_OUTPUT_FORMAT;
  dataSourceFile: string;
  isDetachTemplate: boolean;
  templatePath?: string;
  isSelectDatabasePath: boolean;
  databasePath: string;
  isEnterRouteBasePath: boolean;
  routeBasePath?: string;
  projectName: CE_PROJECT_NAME_FROM;
  versionFrom: CE_ENTITY_VERSION_FROM;
  versionPath?: string;
  output: string;
  components: CE_OUTPUT_COMPONENT[];
  theme: CE_MERMAID_THEME;
  imageFormat?: 'svg' | 'png';
}
