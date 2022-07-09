const imageDefaultConfig = ({
  output,
  dataSourceFilePath,
  imageFormat,
}: {
  dataSourceFilePath: string;
  output: string;
  imageFormat: string;
}) => `
{
  // configuration file type
  "type": "image",

  // if set output option, erdia write result that is given name
  "output": [
     ${output}
  ],

  // indent size of mermaid code
  "indent": 2,

  // output column of er diagram
  // 
  // attribute-key
  // comment
  "er-columns": [
     "attribute-key",
     "comment"
  ],

  // verbose message display
  "verbose": false,

  // typeorm dataSourcePath
  "data-source-path": "${dataSourceFilePath}",
  
  // ER diagram width, it will be set width css attribute
  "width": "100%",

  // export image file format
  "image-format": "${imageFormat}",
  
  // puppeteer viewport width
  "viewport-width": 1280,

  // puppeteer viewport height
  "viewport-height": 1440,

  // puppeteer config file path
  "puppeteer-config-path": ""
}
`;

export default imageDefaultConfig;
