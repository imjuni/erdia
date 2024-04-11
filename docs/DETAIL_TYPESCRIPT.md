# Run `Erdia` using TypeScript

## Table of Contents <!-- omit in toc -->

- [ts-node](#ts-node)
  - [ts-node without Re-Map Path](#ts-node-without-re-map-path)
  - [ts-node with Re-Map Path](#ts-node-with-re-map-path)
- [tsx](#tsx)
  - [tsx without Re-Map Path](#tsx-without-re-map-path)
  - [tsx with Re-Map Path](#tsx-with-re-map-path)
- [Using Programming Interfaces](#using-programming-interfaces)

## ts-node

### ts-node without Re-Map Path

If you are not using Re-Map Path, run it using `ts-node` as shown in the example below.

```bash
npx ts-node node_modules/erdia/dist/cjs/cli.cjs build -d [your dataSource path] -o erdiagram
```

### ts-node with [Re-Map Path](https://github.com/TypeStrong/ts-node#paths-and-baseurl)

If you are using Re-Map Path, run it using `ts-node` as shown in the example below.

```bash
TS_NODE_PROJECT=tsconfig.json npx ts-node -r tsconfig-paths/register node_modules/erdia/dist/cjs/cli.cjs build -d [your dataSource path] -o erdiagram
```

## tsx

### tsx without Re-Map Path

If you are not using Re-Map Path, run it using `tsx` as shown in the example below.

```bash
npx tsx node_modules/erdia/dist/cjs/cli.cjs build -d [your dataSource path] -o erdiagram
```

### tsx with [Re-Map Path](https://github.com/TypeStrong/ts-node#paths-and-baseurl)

If you are using Re-Map Path, run it using `tsx` as shown in the example below.

```bash
TS_NODE_PROJECT=tsconfig.json npx node -r tsx/cjs -r tsconfig-paths/register node_modules/erdia/dist/cjs/cli.cjs build -d [your dataSource path] -o erdiagram
```

## Using Programming Interfaces

You can use ts-node or tsx, but you could use a simple script to extract the erdiagram. You can use this approach if you are using a monorepo or if your entities are scattered across multiple directories.

```ts
// generate-erdia.ts
import { building, CE_ENTITY_VERSION_FROM, CE_OUTPUT_COMPONENT, CE_PROJECT_NAME_FROM } from 'erdia';

export async function handle() {
  console.log('Start erdia');

  await building(
    {
      config: '',
      dataSourcePath: 'src/databases/data-sources/PetStoreMysqlDataSource.ts',
      format: 'html',
      output: 'dist/html',
      components: [CE_OUTPUT_COMPONENT.TABLE, CE_OUTPUT_COMPONENT.ER],
      projectName: CE_PROJECT_NAME_FROM.APPLICATION,
      versionFrom: CE_ENTITY_VERSION_FROM.PACKAGE_JSON,
      theme: 'dark',
    },
    true,
  );
}

handle().catch((caught) => {
  const err = caught instanceof Error ? caught : new Error('unknown error raised');
  console.log(err.message);
  console.log(err.stack);
});
```

You can run the example script to generate an erdiagram.

```bash
npx tsx generate-erdia.ts
```
