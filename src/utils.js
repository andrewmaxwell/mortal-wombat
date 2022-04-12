export const assocPath = ([first, ...rest], val, obj) => {
  const copy = Array.isArray(obj) ? [...obj] : {...obj};
  copy[first] = rest.length ? assocPath(rest, val, copy[first]) : val;
  return copy;
};

// const memoize = (func) => {
//   const cache = {};
//   return (...args) => {
//     const key = JSON.stringify(args);
//     if (cache[key] === undefined) cache[key] = func(...args);
//     return cache[key];
//   };
// };
