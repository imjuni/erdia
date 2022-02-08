# ERdia
ERdia is create ER Diagram using by TypeORM and mermiad.js

# Install

```sh
npm install --save-dev erdia
```

# Option

## ER Diagram
| Option | Required | Description |
| :-: | :-: | :- |
| database | required | database configuration name in ormconfig |
| output | - | output filename, not markdown format |

## Entity markdown table
| Option | Required | Description |
| :-: | :-: | :- |
| database | required | database configuration name in ormconfig |
| output | - | output filename, markdown format |

## Entity markdown table with ER Diagram
| Option | Required | Description |
| :-: | :-: | :- |
| database | required | database configuration name in ormconfig |
| output | - | output filename, markdown format |

# Usage
```
# using npx
npx erdia er

# or 
erdia er
```

# erdia with tsconfig-paths
```
npm install erdia --save-dev
node -r ts-node/register -r tsconfig-paths/register ./node_modules/.bin/erdia mdfull -d [database configuration name] -o output.md
```
