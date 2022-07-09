import { populate } from 'my-easy-fp';
import os from 'os';

export default function eol(multiplier?: number) {
  const nonNullableMultiplier = multiplier ?? 1;

  return populate(nonNullableMultiplier)
    .map(() => os.EOL)
    .join('');
}
