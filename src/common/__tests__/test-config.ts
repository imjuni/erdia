/* eslint-disable import/prefer-default-export */
import { CE_OUTPUT_FORMAT } from '#/configs/const-enum/CE_OUTPUT_FORMAT';
import type { IBuildCommandOption } from '#/configs/interfaces/IBuildCommandOption';

export const buildOption: IBuildCommandOption = {
  config: '',
  versionFrom: 'package.json',
  projectName: 'app',
  output: undefined,
  components: [],
  dataSourcePath: '',
  format: CE_OUTPUT_FORMAT.HTML,
  width: '100%',
  theme: 'dark',
};
