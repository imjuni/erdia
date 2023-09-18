import consola from 'consola';
import { isError } from 'my-easy-fp';
import sourceMapSupport from 'source-map-support';
import buildOptionBuilder from 'src/cli/builders/buildOptionBuilder';
import commonOptionBuilder from 'src/cli/builders/commonOptionBuilder';
import documentOptionBuilder from 'src/cli/builders/documentOptionBuilder';
import outputOptionBuilder from 'src/cli/builders/outputOptionBuilder';
import buildDocumentCommandHandler from 'src/cli/commands/buildDocumentCommandHandler';
import cleanDocumentCommandHandler from 'src/cli/commands/cleanDocumentCommandHandler';
import initConfigCommandHandler from 'src/cli/commands/initConfigCommandHandler';
import templateEjectCommandHandler from 'src/cli/commands/templateEjectCommandHandler';
import { CE_COMMAND_LIST } from 'src/configs/const-enum/CE_COMMAND_LIST';
import type IBuildCommandOption from 'src/configs/interfaces/IBuildCommandOption';
import type ICommonOption from 'src/configs/interfaces/ICommonOption';
import preLoadConfig from 'src/configs/modules/preLoadConfig';
import yargs, { type CommandModule } from 'yargs';

sourceMapSupport.install();

const buildCmdModule: CommandModule<IBuildCommandOption, IBuildCommandOption> = {
  command: CE_COMMAND_LIST.BUILD,
  aliases: CE_COMMAND_LIST.BUILD_ALIAS,
  describe: 'generate an entity specification document and ER diagram document',
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
  describe: 'clean generated document',
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
  describe: 'generate configuration file: `.erdiarc`',
  handler: async () => {
    try {
      await initConfigCommandHandler();
    } catch (caught) {
      const err = isError(caught, new Error('unknown error raised'));
      consola.error(err);
    }
  },
};

const ejectCmdModule: CommandModule<Pick<ICommonOption, 'output'>, Pick<ICommonOption, 'output'>> = {
  command: CE_COMMAND_LIST.EJECT,
  aliases: CE_COMMAND_LIST.EJECT_ALIAS,
  describe: 'eject document template files',
  builder: (argv) => {
    const withCommonArgv = outputOptionBuilder<Pick<ICommonOption, 'output'>>(argv);
    return withCommonArgv;
  },
  handler: async (argv) => {
    try {
      await templateEjectCommandHandler(argv);
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
  .command(ejectCmdModule as CommandModule<{}, ICommonOption>)
  .demandCommand()
  .recommendCommands()
  .config(preLoadConfig())
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
