import { CE_DEFAULT_VALUE } from '#/configs/const-enum/CE_DEFAULT_VALUE';
import { getConfigContent } from '#/configs/modules/getConfigContent';
import { applyPrettier } from '#/creators/applyPretter';
import consola from 'consola';
import fs from 'fs';

export async function initConfigCommandHandler() {
  const rawConfig = await getConfigContent();
  const prettiered = await applyPrettier(rawConfig, 'json');

  await fs.promises.writeFile(CE_DEFAULT_VALUE.CONFIG_FILE_NAME, prettiered);
  consola.info(`${CE_DEFAULT_VALUE.CONFIG_FILE_NAME} file created`);

  return rawConfig;
}
