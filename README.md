# ERdia
ERdia is create ER Diagram using by TypeORM and mermiad.js

# Install

```sh
npm install --save-dev erdia
```

# Usage
```
# using npx
npx erdia er -d [your database configuration name]
npx erdia mdtable -d [your database configuration name]
npx erdia mdfull -d [your database configuration name]

# or 
erdia er -d [your database configuration name]
erdia mdtable -d [your database configuration name]
erdia mdfull -d [your database configuration name]
```

erdia need [ormconfig.json](https://typeorm.io/#/using-ormconfig) file. Because typeorm entity initialize after database connection. See [ormconfig.json](https://typeorm.io/#/using-ormconfig) section in [typeorm.io](https://typeorm.io/)

# Option

## er
ER diagram creation command

| Option | Required | Default | Description |
| :-: | :-: | :-: | :- |
| database | required | N/A | database configuration name in ormconfig |
| output | - | N/A | output filename, markdown format |

## mdtable
Entity markdown table creation command

| Option | Required | Default | Description |
| :-: | :-: | :-: | :- |
| database | required | N/A | database configuration name in ormconfig |
| output | - | N/A | output filename, markdown format |
| html | - | true | html formatting in markdown. newline character replace to <br /> | 

## mdfull
Entity markdown table with ER Diagram creation command

| Option | Required | Default | Description |
| :-: | :-: | :-: | :- |
| database | required | N/A | database configuration name in ormconfig |
| output | - | N/A | output filename, markdown format |
| html | - | true | html formatting in markdown. newline character replace to <br /> | 

# erdia with tsconfig-paths
```
npm install erdia --save-dev
node -r ts-node/register -r tsconfig-paths/register ./node_modules/.bin/erdia mdfull -d [database configuration name] -o output.md
```
