import type { CE_OUTPUT_COMPONENT } from '#configs/const-enum/CE_OUTPUT_COMPONENT';
import type IDocumentOption from '#configs/interfaces/IDocumentOption';

export interface IInitDocAnswer {
  format: 'html' | 'md' | 'pdf' | 'image';
  dataSourceFile: string;
  output: string;
  components: CE_OUTPUT_COMPONENT[];
  theme: IDocumentOption['theme'];
  imageFormat?: 'svg' | 'png';
}
