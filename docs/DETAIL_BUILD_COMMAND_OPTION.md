# Document Building

## Table of Contents <!-- omit in toc -->

- [build command cli options](#build-command-cli-options)
- [building function options](#building-function-options)

## build command cli options

| name               | required | default      | format                     | description                                                                                                            |
| ------------------ | -------- | ------------ | -------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| config             |          |              | html, markdown, pdf, image | Defines the path to the configuration file: `.erdiarc`.                                                                |
| output             | required |              | html, markdown, pdf, image | Defines the directory to output files.                                                                                 |
| data-source-path   | required |              | html, markdown, pdf, image | Defines the path to TypeORM data source file.                                                                          |
| show-logo          |          | false        | html, markdown, pdf, image | Defines whether to display the logo on the CLI interface.                                                              |
| components         |          | er, table    | html, markdown, pdf        | Defines the output component(s) to include in the built documents.                                                     |
| project-name       |          | package.json | html, markdown, pdf        | Defines whether the project name will come from the `package.json` name field or the database name.                    |
| database-path      |          | erdiadb.json | html, markdown, pdf        | Defines the directory to store `erdiadb.json`.                                                                         |
| template-path      |          |              | html, markdown, pdf, image | Defines the directory to ETA templates. `erdia` uses [ETA](https://eta.js.org/) template engine.                       |
| skip-image-in-html |          | false        | html                       | Enables skipping the attachment of the ER diagram image file to the HTML document.                                     |
| format             |          | html         | html, markdown, pdf, image | Defines the output format(s) for the built documents.                                                                  |
| version-from       |          |              | html, markdown, pdf, image | Defines whether the document version will come from the `package.json` version field, a specific file, or a timestamp. |
| version-path       |          | package.json | html, markdown, pdf, image | If the versionFrom option is set to `file`, specifies the path to read the file from.                                  |
| theme              |          | dark         | html, markdown, pdf, image | Defines the theme for the mermaid.js plugin.                                                                           |
| route-base-path    |          |              | html                       | Defines the route base path. Used as the base path for navbar anchor when generating HTML documents.                   |
| title              |          |              | html                       | Defines the content of the HTML document title tag.                                                                    |
| prettier-config    |          |              | html, markdown, pdf, image | Defines the path to the prettier configuration file.                                                                   |
| puppeteer-config   |          |              | pdf, image                 | Defines the path to the puppeteer configuration file.                                                                  |
| width              |          | 100%         | pdf, image                 | Defines the ER diagram width. The width is defined by the HTML document CSS attribute width.                           |
| viewport-width     |          | 1280         | pdf, image                 | Defines the viewport width to puppeteer. The width is defined by the HTML document CSS attribute width.                |
| viewport-height    |          | 1440         | pdf, image                 | Defines the viewport height to puppeteer. The height is defined by the HTML document CSS attribute height.             |
| background-color   |          |              | pdf, image                 | Defines the background color to HTML documents. Examples: transparent, red, '#F0F0F0'.                                 |
| image-format       |          | svg          | html, image                | Defines the format to save image files in. Can be either 'png' or 'svg'.                                               |

## building function options

| name                   | required | default      | format                     | description                                                                                                            |
| ---------------------- | -------- | ------------ | -------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| option.output          | required |              | html, markdown, pdf, image | Defines the directory to output files.                                                                                 |
| option.dataSourcePath  | required |              | html, markdown, pdf, image | Defines the path to TypeORM data source file.                                                                          |
| option.showLogo        |          | false        | html, markdown, pdf, image | Defines whether to display the logo on the CLI interface.                                                              |
| option.components      |          | er, table    | html, markdown, pdf        | Defines the output component(s) to include in the built documents.                                                     |
| option.projectName     |          | package.json | html, markdown, pdf        | Defines whether the project name will come from the `package.json` name field or the database name.                    |
| option.databasePath    |          | erdiadb.json | html, markdown, pdf        | Defines the directory to store `erdiadb.json`.                                                                         |
| option.templatePath    |          |              | html, markdown, pdf, image | Defines the directory to ETA templates. `erdia` uses [ETA](https://eta.js.org/) template engine.                       |
| option.skipImageInHtml |          | false        | html                       | Enables skipping the attachment of the ER diagram image file to the HTML document.                                     |
| option.format          |          | html         | html, markdown, pdf, image | Defines the output format(s) for the built documents.                                                                  |
| option.versionFrom     |          |              | html, markdown, pdf, image | Defines whether the document version will come from the `package.json` version field, a specific file, or a timestamp. |
| option.versionPath     |          | package.json | html, markdown, pdf, image | If the versionFrom option is set to `file`, specifies the path to read the file from.                                  |
| option.theme           |          | dark         | html, markdown, pdf, image | Defines the theme for the mermaid.js plugin.                                                                           |
| option.routeBasePath   |          |              | html                       | Defines the route base path. Used as the base path for navbar anchor when generating HTML documents.                   |
| option.title           |          |              | html                       | Defines the content of the HTML document title tag.                                                                    |
| option.prettierConfig  |          |              | html, markdown, pdf, image | Defines the path to the prettier configuration file.                                                                   |
| option.puppeteerConfig |          |              | pdf, image                 | Defines the path to the puppeteer configuration file.                                                                  |
| option.width           |          | 100%         | pdf, image                 | Defines the ER diagram width. The width is defined by the HTML document CSS attribute width.                           |
| option.viewportWidth   |          | 1280         | pdf, image                 | Defines the viewport width to puppeteer. The width is defined by the HTML document CSS attribute width.                |
| option.viewportHeight  |          | 1440         | pdf, image                 | Defines the viewport height to puppeteer. The height is defined by the HTML document CSS attribute height.             |
| option.backgroundColor |          |              | pdf, image                 | Defines the background color to HTML documents. Examples: transparent, red, '#F0F0F0'.                                 |
| option.imageFormat     |          | svg          | html, image                | Defines the format to save image files in. Can be either 'png' or 'svg'.                                               |
| logging                |          |              |                            | Display console message                                                                                                |
