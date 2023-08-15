import type Fuse from 'fuse.js';
import { bignumber } from 'mathjs';

export default function getAutoCompleteSource(fuse: Fuse<string>, limit: number) {
  return (_answersSoFar: unknown, input: string | undefined) => {
    const safeInput = input === undefined || input === null ? '' : input;

    return fuse
      .search(safeInput)
      .map((matched) => {
        return {
          ...matched,
          oneBased: bignumber(1)
            .sub(bignumber(matched.score ?? 0))
            .mul(100)
            .floor()
            .div(100)
            .toNumber(),
          percent: bignumber(1)
            .sub(bignumber(matched.score ?? 0))
            .mul(10000)
            .floor()
            .div(100)
            .toNumber(),
        };
      })
      .filter((matched) => matched.percent > limit)
      .sort((l, r) => r.percent - l.percent)
      .map((matched) => matched.item);
  };
}
