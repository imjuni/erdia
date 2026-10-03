# 예제 테스트 방법

모든 명령은 저장소 루트에서 실행합니다. `pnpm run dev`는 빌드 없이 `tsx src/cli.ts`를 실행하며, 뒤에 CLI 명령과 옵션을 붙입니다.

## 준비

Node.js 18 이상과 pnpm이 필요합니다.

```sh
pnpm install
mkdir -p examples/db
pnpm run dev build --help
```

루트 `.erdiarc`의 데이터 소스 경로는 이전 디렉터리 구조를 사용하므로 아래 명령처럼 `-d`를 지정합니다. `--database-path`도 명시하여 변경 이력 파일인 `erdiadb.json`을 각 테스트 출력 폴더에 저장합니다.

## TypeORM 예제별 HTML 생성

빠르게 문서 생성을 확인할 때는 `--skip-image-in-html`로 Puppeteer를 통한 이미지 생성을 생략합니다.

### EntitySchema

```sh
pnpm run dev build \
  -d examples/typeorm/schema-type/dataSourceConfig.ts \
  -o dist/examples/schema-type \
  --database-path dist/examples/schema-type \
  --format html \
  --skip-image-in-html
```

### 클래스 엔티티

```sh
pnpm run dev build \
  -d examples/typeorm/class-type/dataSourceConfig.ts \
  -o dist/examples/class-type \
  --database-path dist/examples/class-type \
  --format html \
  --skip-image-in-html
```

클래스 예제는 `examples/db/sqlite3.sqlite3`를 사용하며, `dropSchema: true`와 `synchronize: true` 설정으로 실행 시 해당 DB의 스키마를 다시 생성합니다. 다른 두 TypeORM 예제는 메모리 DB를 사용합니다.

### 팩토리에서 생성한 데이터 소스

```sh
pnpm run dev build \
  -d examples/typeorm/async-schema-type/dataSourceConfig.ts \
  -o dist/examples/async-schema-type \
  --database-path dist/examples/async-schema-type \
  --format html \
  --skip-image-in-html
```

현재 `async-schema-type` 예제는 동기 팩토리의 반환값을 기본 내보내기로 제공합니다.

각 출력 폴더의 `index.html`에서 테이블 명세를, `mermaid.html`에서 ER 다이어그램을 확인합니다. 컬럼, PK/FK, 관계가 예제 정의와 일치하는지 확인합니다. CLI가 오류를 기록하고도 정상 종료할 수 있으므로 종료 코드와 함께 오류 로그 및 생성 파일도 확인합니다.

브라우저에서 확인하려면 다음 명령으로 서버를 실행한 뒤 출력되는 주소를 엽니다.

```sh
pnpm exec http-server dist/examples -p 7879 -o /
```

## 출력 형식과 옵션 테스트

### Markdown

```sh
pnpm run dev build \
  -d examples/typeorm/schema-type/dataSourceConfig.ts \
  -o dist/examples/markdown \
  --database-path dist/examples/markdown \
  --format md
```

생성된 `dist/examples/markdown/erdia.md`를 확인합니다. 옵션 값은 `markdown`이 아닌 `md`입니다.

### PDF

```sh
pnpm run dev build \
  -d examples/typeorm/schema-type/dataSourceConfig.ts \
  -o dist/examples/pdf \
  --database-path dist/examples/pdf \
  --format pdf \
  --theme default
```

### PNG 이미지

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

SVG는 `--image-format svg`로 변경합니다. PDF·이미지 출력과 HTML 이미지 첨부에는 Puppeteer가 실행할 수 있는 브라우저가 필요합니다. HTML 이미지 첨부까지 확인하려면 HTML 명령의 `--skip-image-in-html`을 `--skip-image-in-html=false`로 바꿉니다.

### 자주 사용하는 옵션

| 옵션 | 설명 |
| --- | --- |
| `--orm typeorm\|drizzle` | 입력 ORM. 기본값은 `typeorm` |
| `-d`, `--data-source-path` | TypeORM 데이터 소스 또는 Drizzle 스키마 파일 경로 |
| `-o`, `--output` | 문서 출력 폴더 |
| `-c`, `--config` | 별도 설정 파일 경로 |
| `--database-path` | 변경 이력 파일 `erdiadb.json` 저장 폴더 |
| `--format html\|md\|pdf\|image` | 출력 형식 |
| `--components table er` | 테이블 명세와 ER 다이어그램 출력. 하나만 지정 가능 |
| `--skip-image-in-html` | HTML의 ER 이미지 첨부 생성 생략 |
| `--theme default\|dark\|forest\|neutral\|null` | Mermaid 테마 |
| `--title "Example ERD"` | HTML 문서 제목 |
| `--image-format svg\|png` | 이미지 형식, 기본값 `svg` |
| `--width "100%"` | ER 다이어그램 CSS 너비 |
| `--viewport-width 1280` | Puppeteer 뷰포트 너비 |
| `--viewport-height 1440` | Puppeteer 뷰포트 높이 |
| `--background-color white` | 배경색 |
| `--puppeteer-config <path>` | Puppeteer 설정 파일 경로 |

## Drizzle 예제 테스트

erdia는 Drizzle 스키마 파일을 직접 로드합니다. 실제 DB 접속이나 Drizzle 인스턴스 생성 없이 테이블, 컬럼, 인덱스, 외래 키 메타데이터를 추출합니다.

```sh
pnpm run dev build \
  --orm drizzle \
  -d examples/drizzle/schema.ts \
  -o dist/examples/drizzle \
  --database-path dist/examples/drizzle \
  --format html \
  --skip-image-in-html
```

생성된 `dist/examples/drizzle/index.html`과 `dist/examples/drizzle/mermaid.html`을 확인합니다. 배포된 패키지에서도 같은 옵션을 사용합니다.

```sh
npx ts-node node_modules/erdia/dist/cjs/cli.cjs build \
  --orm drizzle \
  -d src/schema/database/schema.drizzle.ts \
  -o erdiagram
```

`-d`에는 `sqliteTable`, `mysqlTable`, `pgTable` 등으로 만든 테이블을 내보내는 TypeScript 또는 JavaScript 모듈을 지정합니다. 애플리케이션에서 사용하는 `drizzle(connection, { schema })`의 `schema`와 같은 모듈입니다.

### 예제 구성

| 파일 | 역할 |
| --- | --- |
| `examples/drizzle/drizzle.config.ts` | Drizzle Kit용 SQLite dialect, 스키마 경로, DB 접속 경로, 마이그레이션 출력 경로 |
| `examples/drizzle/schema.ts` | SQLite 테이블, 컬럼, 외래 키, 고유 인덱스 정의 |
| `examples/drizzle/dataSourceConfig.ts` | 애플리케이션에서 DB 연결과 Drizzle 인스턴스를 만드는 방법을 보여주는 예제 |

예제 테이블은 `user`, `photo`, `license`, `organization`, `organization_license`입니다. `dataSourceConfig.ts`는 `examples/db/sqlite3.sqlite3`를 열며, `dispose()`로 연결을 닫습니다.

### drizzle.config.ts로 실행

설정 파일은 [Drizzle Kit 설정 형식](https://orm.drizzle.team/docs/drizzle-config-file)의 객체를 기본 내보내기로 제공합니다. `drizzle-kit`이 프로젝트 의존성에 없으므로 `defineConfig`를 import하지 않으며, 테스트 명령은 `pnpm dlx`로 실행합니다. 모든 경로는 저장소 루트 기준입니다.

```sh
mkdir -p examples/db
pnpm dlx drizzle-kit generate --config=examples/drizzle/drizzle.config.ts
```

`generate`는 `examples/drizzle/schema.ts`를 읽어 `dist/examples/drizzle/migrations`에 마이그레이션 SQL과 메타데이터를 생성합니다. DB에는 접속하거나 변경하지 않습니다.

실제로 테스트 DB에 접속하여 스키마를 반영하려면 다음 명령을 실행합니다.

```sh
pnpm dlx drizzle-kit push --config=examples/drizzle/drizzle.config.ts
```

`push`는 `examples/db/sqlite3.sqlite3`에 접속하여 스키마를 변경합니다. 이 파일은 TypeORM 클래스 예제와 공유하므로 두 예제를 번갈아 실행하면 서로의 스키마에 영향을 줍니다.

DB 내용을 브라우저에서 확인하려면 다음 명령으로 Drizzle Studio를 실행합니다.

```sh
pnpm dlx drizzle-kit studio --config=examples/drizzle/drizzle.config.ts
```

`drizzle.config.ts`는 Drizzle Kit가 마이그레이션과 Studio를 위해 사용하는 설정입니다. erdia CLI에는 `drizzle.config.ts`가 아니라 설정의 `schema`가 가리키는 스키마 파일을 전달합니다.

생성된 문서에서 다음 항목을 확인합니다.

- 엔티티 5개가 추출되는지
- `user.photo_id` → `photo.id`, `license.user_id` → `user.id` 관계가 있는지
- `organization_license`에서 `organization`, `license`로 향하는 외래 키 관계가 있는지
- `license_title_index` 고유 인덱스와 PK/FK/UK 속성이 반영되는지

### Drizzle 로더 자동 테스트

```sh
pnpm exec vitest run src/loaders/drizzle/getDrizzleRecords.test.ts
pnpm exec vitest src/loaders/drizzle/getDrizzleRecords.test.ts
```

첫 번째 명령은 한 번 실행하고, 두 번째 명령은 변경을 감지하여 다시 실행합니다. PostgreSQL·MySQL·SQLite 테이블 설정 추출, 컬럼 타입과 키 속성, 엔티티·인덱스·관계 레코드, 스키마 선택, 로더의 `dispose()` 호출을 검증합니다. 이 테스트는 자체 스키마를 사용하며 실제 DB 서버에 접속하지 않습니다.

## 전체 및 TypeORM 자동 테스트

```sh
pnpm test
pnpm exec vitest run src/loaders/typeorm
```

`pnpm test`는 전체 테스트와 커버리지를 실행합니다. 두 번째 명령은 TypeORM 로더 테스트만 실행합니다.
