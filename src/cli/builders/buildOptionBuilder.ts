import type { Argv } from "yargs";

export function buildOptionBuilder<T>(args: Argv<T>) {
  // option
  args
    .option("route-base-path", {
      default: undefined,
      describe:
        "define the route base path. The route base path is used as the base path for navbar anchor when generating HTML documents",
      type: "string",
    })
    .option("title", {
      default: undefined,
      describe: "define what will be written in the HTML document title tag",
      type: "string",
    })
    .option("prettier-config", {
      default: undefined,
      describe: "define the path to the prettier configuration file",
      type: "string",
    })
    .option("puppeteer-config", {
      describe: "define the path to the puppeteer configuration file",
      type: "string",
    })
    .option("width", {
      default: "100%",
      describe:
        "define the ER diagram width. The width is defined by the HTML document css attribute width",
      type: "string",
    })
    .option("viewport-width", {
      default: 1280,
      describe:
        "define the viewport width to puppeteer. The width is defined by the HTML document css attribute width",
      type: "number",
    })
    .option("viewport-height", {
      default: 720 * 2,
      describe:
        "define the viewport height to puppeteer. The width is defined by the HTML document css attribute height",
      type: "number",
    })
    .option("image-format", {
      choices: ["svg", "png"],
      default: "svg",
      describe: "define the format to image file",
      type: "string",
    })
    .option("background-color", {
      default: "white",
      describe:
        "define the background color to html documents. eg. transparent, red, '#F0F0F0'",
      type: "string",
    });

  return args;
}
