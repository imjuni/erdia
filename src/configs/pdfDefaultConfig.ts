import type IDocumentOption from '#configs/interfaces/IDocumentOption';

const pdfDefaultConfig = ({
  output,
  dataSourceFilePath,
  components,
  theme,
}: {
  dataSourceFilePath: string;
  components: string;
  output: string;
  theme: IDocumentOption['theme'];
}) =>
  `
{
  // configuration file type
  "type": "pdf",

  // ER diagram width, it will be set width css attribute
  "width": "100%",

  // if set output option, erdia write result that is given name
  "output": [
     ${output}
  ],

  // indent size of mermaid code
  "indent":2,

  // output column of er diagram
  // 
  // attribute-key
  // comment
  "er-columns": [
     "attribute-key",
     "comment"
  ],

  // verbose message display
  "verbose":false,

  // typeorm dataSourcePath
  "data-source-path": "${dataSourceFilePath}",
  
  // type of generated document
  "components":[
    ${components}
  ],
  
  // ouptut column of generated table
  // 
  // entity-name
  // attribute-key
  // comment
  "table-columns":[
     "entity-name",
     "attribute-key",
     "comment"
  ],
  
  // puppeteer viewport width
  "viewport-width": 1280,
  
  // puppeteer viewport height
  "viewport-height": 1440,
  
  // puppeteer config file path
  "puppeteer-config-path": "",

  // Background color. Example: transparent, red, '#F0F0F0'. Optional. Default: white
  "background-color": "white",
  
  "theme": "${theme}"
}
`.trim();

export default pdfDefaultConfig;
