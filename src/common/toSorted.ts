export const toSorted = <T>(values: readonly T[], compare: (left: T, right: T) => number): T[] => {
  const sorted: T[] = [];
  for (const value of values) {
    const index = sorted.findIndex((entry) => compare(value, entry) < 0);
    if (index === -1) {
      sorted.push(value);
    } else {
      sorted.splice(index, 0, value);
    }
  }
  return sorted;
};
