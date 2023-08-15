import type { CE_OUTPUT_COMPONENT } from '#configs/const-enum/CE_OUTPUT_COMPONENT';
import type IDocumentOption from '#configs/interfaces/IDocumentOption';

export interface IInitDocAnswer {
  type: 'document';
  documentType: 'html' | 'md' | 'pdf';
  components: CE_OUTPUT_COMPONENT[];
  theme: IDocumentOption['theme'];
}

export interface IInitImageAnswer {
  type: 'image';
  documentType: 'image';
  imageFormat: 'svg' | 'png';
  theme: IDocumentOption['theme'];
}
