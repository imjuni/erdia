# ERdia

ERdia is create ER Diagram and Entity schema specification using by TypeORM and mermiad.js

![ts](https://flat.badgen.net/badge/Built%20With/TypeScript/blue)
[![Download Status](https://img.shields.io/npm/dw/erdia.svg)](https://npmcharts.com/compare/erdia?minimal=true)
[![Github Star](https://img.shields.io/github/stars/imjuni/erdia.svg?style=popout)](https://github.com/imjuni/erdia)
[![Github Issues](https://img.shields.io/github/issues-raw/imjuni/erdia.svg)](https://github.com/imjuni/erdia/issues)
[![NPM version](https://img.shields.io/npm/v/erdia.svg)](https://www.npmjs.com/package/erdia)
[![License](https://img.shields.io/npm/l/erdia.svg)](https://github.com/imjuni/erdia/blob/master/LICENSE)
[![ci](https://github.com/imjuni/fast-maker/actions/workflows/ci.yml/badge.svg?branch=master&style=flat-square)](https://github.com/imjuni/fast-maker/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/imjuni/fast-maker/branch/master/graph/badge.svg?token=YrUlnfDbso&style=flat-square)](https://codecov.io/gh/imjuni/fast-maker)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Why `ERdia` ?

`erdia` automatic create DB entity specification, ER diagram. DB entity specification, ER diagram important document that are maintainence and develop process. But not so easy keep freshness. `erdia` help to easily keep freshness and easily create beautiful document using [EJS](https://ejs.co) template engine.

Summary,

1. ER diagram create using [mermaid.js](http://mermaid.js.org/) syntax.
1. Every document create using EJS template engine
1. Only need TypeORM configuration

Automate your database ER diagram drawing!

## Table of Contents <!-- omit in toc -->

- [Showcase](#showcase)
- [Getting started](#getting-started)
- [How it works?](#how-it-works)
- [Installation](#installation)
- [Usage](#usage)
- [Requirement](#requirement)
- [Example](#example)
- [Output Format](#output-format)
- [TypeScript and Re-Map Paths](#typescript-and-re-map-paths)

## Showcase

![Erdia showcase](./assets/erdia-showcase.gif)

![Erdia showcase](./assets/erdiagram.png)

## Getting started

```sh
npm install erdia --save-dev
npx erdia init
npx erdia build
```

`erdia` support initialization command. And you execute `build` command.

## How it works?

```mermaid
graph LR

A[TypeORM Entity] --> erdia
subgraph erdia
direction TB
C[TypeORM Entity]-->|extract <br/>entity specification|B[erdia]
end
erdia-->|extract <br />specification|D
D[EJS<br />template<br />engine]-->E[html]
D-->F[markdown]
D-->G[pdf]
D-->H[image]
```

## Installation

```basn
npm i erdia --save-dev
```

## Usage

```sh
erdia build -d [your dataSource path] -o dbdoc --format html
```

## Requirement

- TypeORM 0.3.x

## Example

- [ER diagram png image format](./assets/erdiagram.png)
- [ER diagram pdf format](./assets/erdiagram.pdf)
- [Entity definition table pdf format](./assets/table.pdf)

## Output Format

ERdia support html, markdown, pdf, svg, png. Database entity specification table only support html, markdown, pdf format.

```sh
# PDF document generate
erdia build -d [your dataSourcePath] -o db.pdf --format pdf
```

## TypeScript and Re-Map Paths

```sh
ts-node -r tsconfig-paths/register ./node_modules/.bin/erdia er -d [your dataSource path]
```

ERdia load dataSource file using TypeORM module. If you use module resolution need additional parameter need for successfully execution. You have to pass tsconfig-paths/register. See ts-node [paths and baseUrl](https://github.com/TypeStrong/ts-node#paths-and-baseurl) section
