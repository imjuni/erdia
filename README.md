# ERdia
ERdia is create ER Diagram using by TypeORM and mermiad.js

[![Download Status](https://img.shields.io/npm/dw/erdia.svg)](https://npmcharts.com/compare/erdia?minimal=true) [![Github Star](https://img.shields.io/github/stars/imjuni/erdia.svg?style=popout)](https://github.com/imjuni/erdia) [![Github Issues](https://img.shields.io/github/issues-raw/imjuni/erdia.svg)](https://github.com/imjuni/erdia/issues) [![NPM version](https://img.shields.io/npm/v/erdia.svg)](https://www.npmjs.com/package/erdia) [![License](https://img.shields.io/npm/l/erdia.svg)](https://github.com/imjuni/erdia/blob/master/LICENSE)

# Warning
typeorm change interface 0.3.x. Erdia 0.5.0 support typeorm 0.2.x and Erdia 0.6.0 support typeorm 0.3.x. And Erdia 0.6.0 add required option `dataSourcePath`. See typeorm 0.3.x have [breaking change](https://github.com/typeorm/typeorm/blob/master/CHANGELOG.md#breaking-changes-1).

# Install

```sh
npm install --save-dev erdia
```

# Usage
Normaly you meet error "Cannot use import statement outside a module". Because TypeORM entity writen by Typescript, So Typescript syntax raise error by Node.js interpreter. So you have to execute using by "ts-node" also pass tsconfig-paths module(If you using module resolution)

```
ts-node -r tsconfig-paths/register ./node_modules/.bin/erdia er -p [your dataSource path]
ts-node -r tsconfig-paths/register ./node_modules/.bin/erdia mdtable -p [your dataSource path]
ts-node -r tsconfig-paths/register ./node_modules/.bin/erdia mdfull -p [your dataSource path]

# recommend, create entity list table and er diagram html document
ts-node -r tsconfig-paths/register ./node_modules/.bin/erdia htmlfull -p [your dataSource path] -v -o entity.html
```

erdia need dataSource file. Because typeorm entity initialize after dataSource initialize. See [dataSource](https://typeorm.io/data-source) section in [typeorm.io](https://typeorm.io/)

# Option
erdia have 6 command, er and mdtable, mdfull, htmler, htmltable, htmlfull. Every command basically print result but you pass output option, create file and not display console result. htmler, htmltable, htmlfull using by [bulma](https://bulma.io/) and [mermaid.js](https://mermaid-js.github.io) from cdnjs.

## Markdown
### er
ER diagram creation command
### mdtable
Entity markdown table creation command
### mdfull
Entity markdown table with ER Diagram creation command

## Html
### htmler
ER diagram creation command
### htmltable
Entity html table creation command
### htmlfull
Entity html table with ER Diagram creation command

## Detail Option
| Option | Alias | Command | Required | Default | Description |
| :- | :-: | :-: | :-: | :-: | :- |
| dataSourcePath | p | all | | N/A | dataSource file path. dataSource file dynamic import using import funciton |
| output | o | all | | N/A | output filename, markdown format |
| verbose | v | all | | N/A | log message display |
| html | h | er, mdtable, mdfull | | true | html formatting in markdown. newline character replace to <br /> | 
