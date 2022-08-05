import IErdiaCommonOption from '@config/interface/IErdiaCommonOption';
import TOutputComponent from '@config/interface/TOutputComponent';

export interface IInitDocAnswer {
  type: 'document';
  documentType: 'html' | 'md' | 'pdf';
  components: TOutputComponent[];
  theme: IErdiaCommonOption['theme'];
}

export interface IInitImageAnswer {
  type: 'image';
  documentType: 'image';
  imageFormat: 'svg' | 'png';
  theme: IErdiaCommonOption['theme'];
}
