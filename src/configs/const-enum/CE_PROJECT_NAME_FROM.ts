/**
 * determine whether project name will come from the name in `package.json` or database name
 *
 * - db: database name from TypeORM
 * - app: application name from package.json
 */
export const CE_PROJECT_NAME_FROM = {
  APPLICATION: "app",
  DATABASE: "db",
} as const;

export type CE_PROJECT_NAME_FROM =
  (typeof CE_PROJECT_NAME_FROM)[keyof typeof CE_PROJECT_NAME_FROM];
