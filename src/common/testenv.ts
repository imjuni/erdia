import IErdiaHtmlOption from '@config/interface/IErdiaHtmlOption';
import IErdiaMarkdownOption from '@config/interface/IErdiaMarkdownOption';

export const htmlOption: IErdiaHtmlOption = {
  type: 'html',
  c: '',
  config: '',
  o: undefined,
  output: undefined,
  t: [],
  components: [],
  erColumns: [],
  tableColumns: [],
  v: true,
  verbose: true,
  d: '',
  dataSourcePath: '',
  width: '100%',
  indent: 2,
  theme: 'dark',
};

export const markdownOption: IErdiaMarkdownOption = {
  type: 'markdown',
  c: '',
  config: '',
  o: undefined,
  output: undefined,
  t: [],
  components: [],
  erColumns: [],
  tableColumns: [],
  v: true,
  verbose: true,
  d: '',
  indent: 2,
  dataSourcePath: '',
  htmlBr: false,
  theme: 'dark',
};
