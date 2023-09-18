import consola from 'consola';
import fs from 'fs';
import { CE_DEFAULT_VALUE } from 'src/configs/const-enum/CE_DEFAULT_VALUE';
import getConfigContent from 'src/configs/modules/getConfigContent';
import applyPrettier from 'src/creators/applyPretter';

export default async function initConfigCommandHandler() {
  const rawConfig = await getConfigContent();
  const prettiered = await applyPrettier(rawConfig, 'json');

  await fs.promises.writeFile(CE_DEFAULT_VALUE.CONFIG_FILE_NAME, prettiered);
  consola.info(`${CE_DEFAULT_VALUE.CONFIG_FILE_NAME} file created`);

  return rawConfig;
}
