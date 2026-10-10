# Running the examples

Run every command from the repository root. `pnpm run dev` runs `tsx src/cli.ts` without building the package; append the CLI command and options after it.

## Prerequisites

Node.js 20 or later and pnpm are required.

```sh
pnpm install
mkdir -p examples/db
pnpm run dev build --help
```

The root `.erdiarc` still points to the previous directory layout, so pass `-d` as shown below. Also pass `--database-path` to store the change-history file, `erdiadb.json`, in each example's output directory.

## Generate HTML from the TypeORM examples

Use `--skip-image-in-html` to skip Puppeteer image generation when you only need to check the generated documents.

### EntitySchema

```sh
pnpm run dev build \
  -d examples/typeorm/schema-type/dataSourceConfig.ts \
  -o dist/examples/schema-type \
  --database-path dist/examples/schema-type \
  --format html \
  --skip-image-in-html
```

### Class entities

```sh
pnpm run dev build \
  -d examples/typeorm/class-type/dataSourceConfig.ts \
  -o dist/examples/class-type \
  --database-path dist/examples/class-type \
  --format html \
  --skip-image-in-html
```

The class example uses `examples/db/sqlite3.sqlite3`. Its `dropSchema: true` and `synchronize: true` settings recreate that database's schema when the example runs. The other two TypeORM examples use in-memory databases.

### Data source created by a factory

```sh
pnpm run dev build \
  -d examples/typeorm/async-schema-type/dataSourceConfig.ts \
  -o dist/examples/async-schema-type \
  --database-path dist/examples/async-schema-type \
  --format html \
  --skip-image-in-html
```

The `async-schema-type` example currently exports the result of a synchronous factory as its default export.

In each output directory, open `index.html` for the entity specifications and `mermaid.html` for the ER diagram. Check the columns, PK/FK attributes, and relationships against the example definitions. The CLI may log errors yet exit successfully, so check the logs and generated files as well as the exit code.

To view the files in a browser, start a server and open the address it prints:

```sh
pnpm exec http-server dist/examples -p 7879 -o /
```

## Test output formats and options

### Markdown

```sh
pnpm run dev build \
  -d examples/typeorm/schema-type/dataSourceConfig.ts \
  -o dist/examples/markdown \
  --database-path dist/examples/markdown \
  --format md
```

Check `dist/examples/markdown/erdia.md`. The format value is `md`, not `markdown`.

### PDF

```sh
pnpm run dev build \
  -d examples/typeorm/schema-type/dataSourceConfig.ts \
  -o dist/examples/pdf \
  --database-path dist/examples/pdf \
  --format pdf \
  --theme default
```

### PNG image

```sh
pnpm run dev build \
  -d examples/typeorm/schema-type/dataSourceConfig.ts \
  -o dist/examples/png \
  --database-path dist/examples/png \
  --format image \
  --image-format png \
  --viewport-width 1920 \
  --viewport-height 1080 \
  --background-color white
```

Use `--image-format svg` for SVG output. PDF and image output, as well as images embedded in HTML, require a browser that Puppeteer can run. To test HTML image generation, change `--skip-image-in-html` to `--skip-image-in-html=false` in an HTML command.

### Common options

| Option                                         | Description                                                                              |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `--orm typeorm\|drizzle`                       | Input ORM; defaults to `typeorm`                                                         |
| `-d`, `--data-source-path`                     | Path to a TypeORM data source or Drizzle schema module                                   |
| `-o`, `--output`                               | Output directory for generated documents                                                 |
| `-c`, `--config`                               | Path to a separate configuration file                                                    |
| `--database-path`                              | Directory for the change-history file `erdiadb.json`                                     |
| `--format html\|md\|pdf\|image`                | Output format                                                                            |
| `--components table er`                        | Generate entity specifications and an ER diagram; either component can be selected alone |
| `--skip-image-in-html`                         | Skip generating the image embedded in HTML                                               |
| `--theme default\|dark\|forest\|neutral\|null` | Mermaid theme                                                                            |
| `--title "Example ERD"`                        | HTML document title                                                                      |
| `--image-format svg\|png`                      | Image format; defaults to `svg`                                                          |
| `--width "100%"`                               | CSS width of the ER diagram                                                              |
| `--viewport-width 1280`                        | Puppeteer viewport width                                                                 |
| `--viewport-height 1440`                       | Puppeteer viewport height                                                                |
| `--background-color white`                     | Background color                                                                         |
| `--puppeteer-config <path>`                    | Path to a Puppeteer configuration file                                                   |

## Test the Drizzle example

erdia loads the Drizzle schema module directly. It extracts tables, columns, indexes, foreign keys, and exported `relations(...)` definitions without connecting to a database or creating a Drizzle instance.

```sh
pnpm run dev build \
  --orm drizzle \
  -d examples/drizzle/schema.ts \
  -o dist/examples/drizzle \
  --database-path dist/examples/drizzle \
  --format html \
  --skip-image-in-html
```

Check `dist/examples/drizzle/index.html` and `dist/examples/drizzle/mermaid.html`. Use the same CLI options with the published package:

```sh
npx ts-node node_modules/erdia/dist/cjs/cli.cjs build \
  --orm drizzle \
  -d src/schema/database/schema.drizzle.ts \
  -o erdiagram
```

Pass a TypeScript or JavaScript module that exports tables created with `sqliteTable`, `mysqlTable`, or `pgTable` to `-d`. If relationships are defined with `relations(...)`, export those definitions from the same module so erdia can include them in the diagram. This is the same kind of schema module passed to `drizzle(connection, { schema })` in an application.

### Example files

| File                                   | Purpose                                                                          |
| -------------------------------------- | -------------------------------------------------------------------------------- |
| `examples/drizzle/drizzle.config.ts`   | SQLite dialect, schema path, database path, and migration output for Drizzle Kit |
| `examples/drizzle/schema.ts`           | SQLite tables, columns, foreign keys, and a unique index                         |
| `examples/drizzle/dataSourceConfig.ts` | Example database connection and Drizzle instance                                 |

The example tables are `user`, `photo`, `license`, `organization`, and `organization_license`. `dataSourceConfig.ts` opens `examples/db/sqlite3.sqlite3` and closes the connection through `dispose()`.

### Run Drizzle Kit with drizzle.config.ts

The configuration file exports a plain object in the [Drizzle Kit configuration format](https://orm.drizzle.team/docs/drizzle-config-file). This project does not depend on `drizzle-kit`, so the example does not import `defineConfig` and uses `pnpm dlx` to run the CLI. All paths are relative to the repository root.

```sh
mkdir -p examples/db
pnpm dlx drizzle-kit generate --config=examples/drizzle/drizzle.config.ts
```

`generate` reads `examples/drizzle/schema.ts` and writes migration SQL and metadata to `dist/examples/drizzle/migrations`. It does not connect to or modify the database.

To apply the schema to the test database instead, run:

```sh
pnpm dlx drizzle-kit push --config=examples/drizzle/drizzle.config.ts
```

`push` connects to and changes `examples/db/sqlite3.sqlite3`. The TypeORM class example shares this file, so switching between these examples can affect each other's schemas.

To inspect the database in a browser, start Drizzle Studio:

```sh
pnpm dlx drizzle-kit studio --config=examples/drizzle/drizzle.config.ts
```

Drizzle Kit uses `drizzle.config.ts` for migrations and Studio. For erdia, pass the schema file named by that configuration's `schema` field, not `drizzle.config.ts` itself.

Check the generated documents for:

- All five entities.
- The `user.photo_id` → `photo.id` and `license.user_id` → `user.id` relationships.
- Foreign-key relationships from `organization_license` to `organization` and `license`.
- The `license_title_index` unique index and the PK/FK/UK attributes.

### Automated Drizzle loader tests

```sh
pnpm exec vitest run src/loaders/drizzle/getDrizzleRecords.test.ts
pnpm exec vitest src/loaders/drizzle/getDrizzleRecords.test.ts
```

The first command runs once; the second watches for changes. The tests cover PostgreSQL, MySQL, and SQLite table configurations; column types and keys; entity, index, and relation records; schema selection; and the loader's `dispose()` call. They use their own schemas and do not connect to a database server.

## Run all tests or only TypeORM tests

```sh
pnpm test
pnpm exec vitest run src/loaders/typeorm
```

`pnpm test` runs the complete test suite with coverage. The second command runs only the TypeORM loader tests.
