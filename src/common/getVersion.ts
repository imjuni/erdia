import dayjs from 'dayjs';

export default function getVersion(json: Record<string, unknown>, usePackageJSon?: boolean) {
  if (usePackageJSon ?? false) {
    const { version } = json;

    if (typeof version === 'string' && version !== '') {
      return version;
    }

    return dayjs().format();
  }

  return dayjs().format();
}
