// export const assocPath = ([first, ...rest], val, obj) => {
//   const copy = Array.isArray(obj) ? [...obj] : {...obj};
//   copy[first] = rest.length ? assocPath(rest, val, copy[first]) : val;
//   return copy;
// };

export const dissoc = (key, obj) => {
  const copy = {...obj};
  delete copy[key];
  return copy;
};

export const guid = () =>
  Date.now().toString(36) + ':' + Math.random().toString(36).slice(2);

export const isGuid = (str) => /^[0-9a-z]{8,}:[0-9a-z]+$/.test(str);

export const groupBy = (func, arr) => {
  const res = {};
  for (const el of arr) {
    const key = func(el);
    (res[key] = res[key] || []).push(el);
  }
  return res;
};

export const indexBy = (func, arr) => {
  const res = {};
  for (const el of arr) res[func(el)] = el;
  return res;
};

export const objToArr = (obj = {}) =>
  Object.entries(obj).map(([key, el]) => ({key, ...el}));

export const debounce = (func, delay) => {
  let timeout;
  const f = (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
  f.cancel = () => clearTimeout(timeout);
  return f;
};

export const throttle = (func, delay) => {
  let timeout;
  let running = false;
  let runAgainArgs;
  const f = (...args) => {
    if (running) {
      runAgainArgs = args;
      return;
    }
    running = true;
    timeout = setTimeout(() => {
      func(...args);
      running = false;
      if (runAgainArgs) {
        f(...runAgainArgs);
      }
      runAgainArgs = undefined;
    }, delay);
  };
  f.cancel = () => clearTimeout(timeout);
  return f;
};

// const memoize = (func) => {
//   const cache = {};
//   return (...args) => {
//     const key = JSON.stringify(args);
//     if (cache[key] === undefined) cache[key] = func(...args);
//     return cache[key];
//   };
// };
