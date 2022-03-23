# ERdia
ERdia is create ER Diagram using by TypeORM and mermiad.js

[![Download Status](https://img.shields.io/npm/dw/erdia.svg)](https://npmcharts.com/compare/erdia?minimal=true) [![Github Star](https://img.shields.io/github/stars/imjuni/erdia.svg?style=popout)](https://github.com/imjuni/erdia) [![Github Issues](https://img.shields.io/github/issues-raw/imjuni/erdia.svg)](https://github.com/imjuni/erdia/issues) [![NPM version](https://img.shields.io/npm/v/erdia.svg)](https://www.npmjs.com/package/erdia) [![License](https://img.shields.io/npm/l/erdia.svg)](https://github.com/imjuni/erdia/blob/master/LICENSE)


# Install

```sh
npm install --save-dev erdia
```

# Usage
Normaly you meet error "Cannot use import statement outside a module". Because TypeORM entity writen by Typescript, So Typescript syntax raise error by Node.js interpreter. So you have to execute using by "ts-node" also pass tsconfig-paths module(If you using module resolution)

```
ts-node -r tsconfig-paths/register ./node_modules/.bin/erdia er -n [your database configuration name]
ts-node -r tsconfig-paths/register ./node_modules/.bin/erdia mdtable -n [your database configuration name]
ts-node -r tsconfig-paths/register ./node_modules/.bin/erdia mdfull -n [your database configuration name]
```

erdia need [ormconfig.json](https://typeorm.io/#/using-ormconfig) file. Because typeorm entity initialize after database connection. See [ormconfig.json](https://typeorm.io/#/using-ormconfig) section in [typeorm.io](https://typeorm.io/)

# Option

## er
ER diagram creation command

| Option | Alias | Required | Default | Description |
| :- | :-: | :-: | :-: | :- |
| ormconfigPath | c | N/A | N/A | ormconfig file path |
| connection | n | required | N/A | database configuration name in ormconfig |
| output | o | - | N/A | output filename, markdown format |

## mdtable
Entity markdown table creation command

| Option | Alias | Required | Default | Description |
| :- | :-: | :-: | :-: | :- |
| ormconfigPath | c | N/A | N/A | ormconfig file path |
| connection | n | required | N/A | database configuration name in ormconfig |
| output | o | - | N/A | output filename, markdown format |
| html | h | - | true | html formatting in markdown. newline character replace to <br /> | 

## mdfull
Entity markdown table with ER Diagram creation command

| Option | Alias | Required | Default | Description |
| :- | :-: | :-: | :-: | :- |
| ormconfigPath | c | N/A | N/A | ormconfig file path |
| connection | n | required | N/A | database configuration name in ormconfig |
| output | o | - | N/A | output filename, markdown format |
| html | h | - | true | html formatting in markdown. newline character replace to <br /> | 

# erdia with tsconfig-paths
```
npm install erdia --save-dev
node -r ts-node/register -r tsconfig-paths/register ./node_modules/.bin/erdia mdfull -d [database configuration name] -o output.md
```
