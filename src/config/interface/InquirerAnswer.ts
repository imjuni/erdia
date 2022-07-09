import TOutputComponent from '@config/interface/TOutputComponent';

export interface IInitDocAnswer {
  type: 'document';
  documentType: 'html' | 'md' | 'pdf';
  components: TOutputComponent[];
}

export interface IInitImageAnswer {
  type: 'image';
  documentType: 'image';
  imageFormat: 'svg' | 'png';
}
