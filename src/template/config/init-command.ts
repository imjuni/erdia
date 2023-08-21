const build = `{
  // directory for output files
  "output": "<%= it.config.output %>",

  // typeorm dataSourcePath
  "data-source-path": "<%= it.config.dataSourceFile %>",

  // type of generated document
  "components": <%~ JSON.stringify(it.config.components) %>,

  // kind of document name
  // - db: database name from TypeORM
  // - app: application name from package.json
  "project-name": "<%= it.config.projectName %>",

  // custom template file path. erdia are using [ETA](https://eta.js.org/) template engine
  <% if (it.config.templatePath != null) { %>
    "template-path": "<%= it.config.templatePath %>",
  <% } else { %>
    // "template-path": "",
  <% } %>

  // erdia entity database file path
  "database-path": "<%= it.config.databasePath %>",

  // document version using package.json version or timestamp
  "version-from": "<%= it.config.versionFrom %>",

  // If the versionFrom option set file, read the file from this path
<% if (it.config.versionFrom != null) { %>
  "version-path": "<%= it.config.versionPath %>",
<% } else { %>
  // "version-path": "",
<% } %>

  // output format of generated documents
  // - html
  // - markdown
  // - pdf
  // - image
  "format": "<%= it.config.format %>",

  // skip image file attachment in html document
  "skipImageInHtml": false,

  // mermaid.js plugin theme configuration
  // @url https://mermaid-js.github.io/mermaid/#/Setup?id=theme
  "theme": "<%= it.config.theme %>",

  // prettier config path
  // "prettier-config": "set your .prettierrc file path",

  // title tag content that inside of html document
  // "title": "set title tag content in html document",

  // ER diagram width, it will be set width css attribute
  // @format pdf, image
  <% if (it.config.format === 'pdf' || it.config.format === 'image') { -%>
  "width": "100%",
  <% } else { -%>
  // "width": "100%",
  <% } -%>

  // puppeteer viewport width
  // @format pdf, image
  <% if (it.config.format === 'pdf' || it.config.format === 'image') { -%>
  "viewport-width": 1280,
  <% } else { -%>
  // "viewport-width": 1280,
  <% } -%>

  // puppeteer viewport height
  // @format pdf, image
  <% if (it.config.format === 'pdf' || it.config.format === 'image') { -%>
  "viewport-height":  1440,
  <% } else { -%>
  // "viewport-height":  1440,
  <% } -%>

  // puppeteer config file path
  // @format pdf, image
  // "puppeteer-config-path": "set your puppeteer configuration file path",

  // Background color. Example: transparent, red, '#F0F0F0'. Optional. Default: white
  // @format pdf, image
  // "background-color": "#FFFFFF",

  // ER diagram export image file format
  // @format image
  <% if (it.config.format === 'image') { %>
  "image-format": "<%= it.config.imageFormat %>",
  <% } else { %>
  // "image-format": "svg",
  <% } %>
}`;

export default build;
