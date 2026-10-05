import type { Argv } from "yargs";

import { outputOptionBuilder } from "#/cli/builders/outputOptionBuilder";

export const commonOptionBuilder = <T>(args: Argv<T>) => {
  // option
  outputOptionBuilder(args)
    .option("orm", {
      choices: ["typeorm", "drizzle"],
      default: "typeorm",
      describe: "define the ORM used to load the schema",
      type: "string",
    })
    .option("config", {
      alias: "c",
      describe: "define the path to to configuration file: .erdiarc",
      type: "string",
    })
    .option("data-source-path", {
      alias: "d",
      describe: "define the path to a TypeORM data source or Drizzle schema file",
      type: "string",
    })
    .option("show-logo", {
      describe: "define the logo display on cli interface",
      type: "boolean",
      default: false,
    })
    .demandOption("data-source-path");
  return args;
};
