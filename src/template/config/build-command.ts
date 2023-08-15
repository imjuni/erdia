const build = `{
  // directory for output files
  "output": "<%= config.output %>",

  // typeorm dataSourcePath
  "data-source-path": "<%= config.dataSourceFile %>",

  // type of generated document
  "components": <%- JSON.stringify(config.components) %>,

  // output format of generated documents
  // - html
  // - markdown
  // - pdf
  // - image
  "format": "<%= config.format %>",

  // mermaid.js plugin theme configuration
  // @url https://mermaid-js.github.io/mermaid/#/Setup?id=theme
  "theme": "<%= config.theme %>",

  // document version using package.json version or timestamp
  "use-pkg-ver": true,

  // kind of document name
  // - db: database name from TypeORM
  // - app: application name from package.json
  "project-name": "<%= config.projectName %>",

  // prettier config path
  // "prettier-config": "set your .prettierrc file path",

  // title tag content that inside of html document
  // "title": "set title tag content in html document",

  // ER diagram width, it will be set width css attribute
  // @format pdf, image
  <% if (config.format === 'pdf' || config.format === 'image') { -%>
  "width": "100%",
  <% } else { -%>
  // "width": "100%",
  <% } -%>

  // puppeteer viewport width
  // @format pdf, image
  <% if (config.format === 'pdf' || config.format === 'image') { -%>
  "viewport-width": 1280,
  <% } else { -%>
  // "viewport-width": 1280,
  <% } -%>

  // puppeteer viewport height
  // @format pdf, image
  <% if (config.format === 'pdf' || config.format === 'image') { -%>
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
  <% if (config.format === 'image') { %>
  "image-format": "<%= config.imageFormat %>",
  <% } else { %>
  // "image-format": "svg",
  <% } %>
}`;

export default build;
