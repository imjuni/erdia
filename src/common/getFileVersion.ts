import { parse } from 'jsonc-parser';
import semver from 'semver';

export function getFileVersion(buf: Buffer): string {
  const rawJson = buf.toString();

  if (semver.valid(rawJson)) {
    return rawJson;
  }

  const parsed = parse(rawJson) as Record<string, string>;
  const { version } = parsed;

  if (version == null || version === '') {
    throw new Error(`invalid version file: ${rawJson}`);
  }

  return version;
}
