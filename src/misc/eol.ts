import { populate } from 'my-easy-fp';
import os from 'os';

const eol = (multiplier?: number) => {
  const nonNullableMultiplier = multiplier ?? 1;

  return populate(nonNullableMultiplier)
    .map(() => os.EOL)
    .join('');
};

export default eol;
