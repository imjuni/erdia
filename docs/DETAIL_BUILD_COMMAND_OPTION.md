# Build options

## Table of Contents <!-- omit in toc -->

- [CLI options](#cli-options)
- [`building()` options](#building-options)

## CLI options

`--format` selects one output format per run: `html`, `md` (Markdown), `pdf`, or `image`. In the **Applies to** column, **All** means all four output formats. An option may be accepted by the CLI but only affect the formats listed here.

| Option                      | Required | Default            | Applies to          | What it does                                                                             |
| --------------------------- | -------- | ------------------ | ------------------- | ---------------------------------------------------------------------------------------- |
| `--config` (`-c`)           | No       | None               | All                 | Reads settings from a configuration file such as `.erdiarc`.                             |
| `--orm`                     | No       | `typeorm`          | All                 | Selects `typeorm` or `drizzle`.                                                          |
| `--output` (`-o`)           | No       | Current directory  | All                 | Sets the directory for generated files.                                                  |
| `--data-source-path` (`-d`) | Yes      | —                  | All                 | Loads a TypeORM data source or Drizzle schema module, according to `--orm`.              |
| `--show-logo`               | No       | `false`            | All                 | Shows the CLI logo.                                                                      |
| `--components` (`-t`)       | No       | `table er`         | HTML, Markdown, PDF | Selects the entity table, ER diagram, or both. Image output always uses the ER diagram.  |
| `--project-name`            | No       | `app`              | All                 | Chooses the project name from `package.json` (`app`) or the database (`db`).             |
| `--database-path`           | No       | Current directory  | All                 | Sets the directory for the change-history file `erdiadb.json`.                           |
| `--template-path`           | No       | Built-in templates | All                 | Loads custom [ETA](https://eta.js.org/) templates from a directory.                      |
| `--skip-image-in-html`      | No       | `false`            | HTML                | Skips generating the ER diagram image embedded in HTML.                                  |
| `--format`                  | No       | `html`             | All                 | Selects `html`, `md`, `pdf`, or `image` output.                                          |
| `--version-from`            | No       | `package.json`     | All                 | Reads the document version from `package.json`, a `file`, or a `timestamp`.              |
| `--version-path`            | No       | None               | All                 | Sets the version file path when `--version-from file` is selected.                       |
| `--theme`                   | No       | `dark`             | All                 | Selects a Mermaid theme: `default`, `dark`, `forest`, `neutral`, or `null`.              |
| `--route-base-path`         | No       | None               | HTML                | Sets the base path for navbar links.                                                     |
| `--title`                   | No       | Generated title    | HTML, PDF, image    | Overrides the HTML title; otherwise it uses the project name and "entity specification". |
| `--prettier-config`         | No       | None               | All                 | Loads a custom Prettier configuration for generated content.                             |
| `--puppeteer-config`        | No       | None               | PDF                 | Loads Puppeteer launch options for PDF generation.                                       |
| `--width`                   | No       | `100%`             | None currently      | Accepted by the CLI but not currently used by the rendering templates.                   |
| `--viewport-width`          | No       | `1280`             | PDF, image          | Sets the Puppeteer viewport width in pixels.                                             |
| `--viewport-height`         | No       | `1440`             | PDF, image          | Sets the Puppeteer viewport height in pixels.                                            |
| `--background-color`        | No       | `white`            | PDF, image          | Sets the image background; for PDF, `transparent` disables background printing.          |
| `--image-format`            | No       | `svg`              | Image               | Selects `svg` or `png`. The image embedded in HTML is always SVG.                        |

## `building()` options

The `building()` function does not run the CLI option parser, so CLI defaults are not automatically applied to its arguments. Its first argument is an options object; the second, optional `logging` argument enables console messages. Fields marked **Yes** are required by the TypeScript options type.

| Field                    | Required | Applies to          | What it does                                                |
| ------------------------ | -------- | ------------------- | ----------------------------------------------------------- |
| `option.config`          | No       | All                 | Configuration file path.                                    |
| `option.orm`             | No       | All                 | Selects `typeorm` or `drizzle`; omitting it uses TypeORM.   |
| `option.output`          | No       | All                 | Output directory; omitting it uses the current directory.   |
| `option.dataSourcePath`  | Yes      | All                 | TypeORM data source or Drizzle schema module path.          |
| `option.showLogo`        | No       | All                 | Shows the CLI logo.                                         |
| `option.components`      | Yes      | HTML, Markdown, PDF | Selects `table`, `er`, or both.                             |
| `option.projectName`     | Yes      | All                 | Selects `app` or `db` as the source of the project name.    |
| `option.databasePath`    | No       | All                 | Directory for `erdiadb.json`.                               |
| `option.templatePath`    | No       | All                 | Custom ETA template directory.                              |
| `option.skipImageInHtml` | No       | HTML                | Skips the embedded ER diagram image.                        |
| `option.format`          | Yes      | All                 | Selects `html`, `md`, `pdf`, or `image`.                    |
| `option.versionFrom`     | Yes      | All                 | Selects `package.json`, `file`, or `timestamp`.             |
| `option.versionPath`     | No       | All                 | Version file path when `option.versionFrom` is `file`.      |
| `option.theme`           | Yes      | All                 | Mermaid theme.                                              |
| `option.routeBasePath`   | No       | HTML                | Base path for navbar links.                                 |
| `option.title`           | No       | HTML, PDF, image    | Generated document's HTML title.                            |
| `option.prettierConfig`  | No       | All                 | Custom Prettier configuration path.                         |
| `option.puppeteerConfig` | No       | PDF                 | Puppeteer launch options for PDF generation.                |
| `option.width`           | No       | None currently      | Accepted but not currently used by the rendering templates. |
| `option.viewportWidth`   | No       | PDF, image          | Puppeteer viewport width in pixels.                         |
| `option.viewportHeight`  | No       | PDF, image          | Puppeteer viewport height in pixels.                        |
| `option.backgroundColor` | No       | PDF, image          | Background color.                                           |
| `option.imageFormat`     | No       | Image               | Selects `svg` or `png`.                                     |
| `logging`                | No       | All                 | Enables console messages when true.                         |
