/**
 * Entity document version using package.json version or specific file, timestamp
 *
 * - timestamp: use timestamp
 * - file: use version file
 * - package.json: use package.json
 */
export const CE_ENTITY_VERSION_FROM = {
  TIMESTAMP: 'timestamp',
  PACKAGE_JSON: 'package.json',
  FILE: 'file',
} as const;

export type CE_ENTITY_VERSION_FROM = (typeof CE_ENTITY_VERSION_FROM)[keyof typeof CE_ENTITY_VERSION_FROM];
