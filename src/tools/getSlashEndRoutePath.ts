export default function getSlashEndRoutePath(basePath: string): string {
  if (basePath.endsWith('/')) {
    return basePath;
  }

  return `${basePath}/`;
}
