import buildOptionBuilder from '#cli/builders/buildOptionBuilder';
import commonOptionBuilder from '#cli/builders/commonOptionBuilder';
import documentOptionBuilder from '#cli/builders/documentOptionBuilder';
import buildDocumentCommandHandler from '#cli/commands/buildDocumentCommandHandler';
import cleanDocumentCommandHandler from '#cli/commands/cleanDocumentCommandHandler';
import initDocumentCommandHandler from '#cli/commands/initDocumentCommandHandler';
import { CE_COMMAND_LIST } from '#configs/const-enum/CE_COMMAND_LIST';
import type IBuildCommandOption from '#configs/interfaces/IBuildCommandOption';
import type ICommonOption from '#configs/interfaces/ICommonOption';
import preLoadConfig from '#configs/modules/preLoadConfig';
import consola from 'consola';
import { isError } from 'my-easy-fp';
import sourceMapSupport from 'source-map-support';
import yargs, { type CommandModule } from 'yargs';

sourceMapSupport.install();

const buildCmdModule: CommandModule<IBuildCommandOption, IBuildCommandOption> = {
  command: CE_COMMAND_LIST.BUILD,
  aliases: CE_COMMAND_LIST.BUILD_ALIAS,
  describe: 'build entity, er diagram document',
  builder: (argv) => {
    const withCommonArgv = commonOptionBuilder<IBuildCommandOption>(argv);
    const withDocumentArgv = documentOptionBuilder<IBuildCommandOption>(withCommonArgv);
    const withBuildArgv = buildOptionBuilder<IBuildCommandOption>(withDocumentArgv);
    return withBuildArgv;
  },
  handler: async (argv) => {
    try {
      await buildDocumentCommandHandler(argv);
    } catch (caught) {
      const err = isError(caught, new Error('unknown error raised'));
      consola.error(err);
    }
  },
};

const cleanCmdModule: CommandModule<ICommonOption, ICommonOption> = {
  command: CE_COMMAND_LIST.CLEAN,
  aliases: CE_COMMAND_LIST.CLEAN_ALIAS,
  describe: 'clean entity, er diagram document',
  builder: (argv) => {
    const withCommonArgv = commonOptionBuilder<ICommonOption>(argv);
    return withCommonArgv;
  },
  handler: async (argv) => {
    try {
      await cleanDocumentCommandHandler(argv);
    } catch (caught) {
      const err = isError(caught, new Error('unknown error raised'));
      consola.error(err);
    }
  },
};

const initCmdModule: CommandModule<{}, {}> = {
  command: CE_COMMAND_LIST.INIT,
  aliases: CE_COMMAND_LIST.INIT_ALIAS,
  describe: 'create `.erdiarc` configuration',
  handler: async () => {
    try {
      await initDocumentCommandHandler();
    } catch (caught) {
      const err = isError(caught, new Error('unknown error raised'));
      consola.error(err);
    }
  },
};

const parser = yargs(process.argv.slice(2));

parser
  .command(buildCmdModule as CommandModule<{}, IBuildCommandOption>)
  .command(cleanCmdModule as CommandModule<{}, ICommonOption>)
  .command(initCmdModule as CommandModule<{}, ICommonOption>)
  .demandCommand()
  .recommendCommands()
  .config(preLoadConfig())
  // .check(isValidConfig)
  .help();

const handler = async () => {
  await parser.argv;
};

handler().catch((caught) => {
  const err = isError(caught, new Error('unknown error raised'));
  consola.error(err.message);
  consola.error(err.stack);

  process.exit(1);
});
