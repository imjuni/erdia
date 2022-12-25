# ERdia

ERdia is create ER Diagram and Database schema table using by TypeORM and mermiad.js

[![Download Status](https://img.shields.io/npm/dw/erdia.svg)](https://npmcharts.com/compare/erdia?minimal=true) [![Github Star](https://img.shields.io/github/stars/imjuni/erdia.svg?style=popout)](https://github.com/imjuni/erdia) [![Github Issues](https://img.shields.io/github/issues-raw/imjuni/erdia.svg)](https://github.com/imjuni/erdia/issues) [![NPM version](https://img.shields.io/npm/v/erdia.svg)](https://www.npmjs.com/package/erdia) [![License](https://img.shields.io/npm/l/erdia.svg)](https://github.com/imjuni/erdia/blob/master/LICENSE)

Automate your database ER diagram drawing!

![Erdia showcase](./assets/erdia-showcase.gif)

![Erdia showcase](./assets/erdiagram.png)

## Install

```sh
npm install --save-dev erdia
```

## Usage

```sh
erdia html -d [your dataSource path] -o table.html -o erdiagram.html
```

## Requirement

- TypeORM 0.3.x

## Example

- [ER diagram png image format](./assets/erdiagram.png)
- [ER diagram pdf format](./assets/erdiagram.pdf)
- [Entity definition table pdf format](./assets/table.pdf)

## Output Format

ERdia support html, markdown, pdf, svg, png. Database schema table only support html, markdown, pdf format.

```sh
# PDF document generate
erdia pdf -d [your dataSourcePath] -o table.pdf -o entity.pdf
```

## TypeScript and Re-Map Paths

```sh
ts-node -r tsconfig-paths/register ./node_modules/.bin/erdia er -d [your dataSource path]
```

ERdia load dataSource file using TypeORM module. If you use module resolution need additional parameter need for successfully execution. You have to pass tsconfig-paths/register. See ts-node [paths and baseUrl](https://github.com/TypeStrong/ts-node#paths-and-baseurl) section
