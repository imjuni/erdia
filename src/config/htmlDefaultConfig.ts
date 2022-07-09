const htmlDefaultConfig = ({
  output,
  dataSourceFilePath,
  components,
}: {
  dataSourceFilePath: string;
  components: string;
  output: string;
}) =>
  `
{
  // configuration file type
  "type": "html",

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
  "er-columns":[
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
  ]
}
`.trim();

export default htmlDefaultConfig;
