export const mergeDeepLeft = (a, b) => {
  if (a === undefined) return b;
  if (b === undefined) return a;
  if (a && b && typeof a === 'object' && typeof b === 'object') {
    const result = {};
    for (const key in {...a, ...b}) {
      result[key] = mergeDeepLeft(a[key], b[key]);
    }
    return result;
  }
  return a;
};
