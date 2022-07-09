import { populate } from 'my-easy-fp';

export default function indent(multiplier?: number) {
  const nonNullableMultiplier = multiplier ?? 1;

  return populate(nonNullableMultiplier)
    .map(() => ' ')
    .join('');
}
