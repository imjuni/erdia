export default function getPackageName(json: Record<string, unknown>): string {
  const { name } = json;

  if (typeof name === 'string' && name !== '') {
    return name;
  }

  throw new Error('Cannot get project name from package.json');
}
