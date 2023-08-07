import {useEffect, useState} from 'react';

const parseJSON = (str, defaultVal) => {
  try {
    return JSON.parse(str);
  } catch (e) {
    console.error(e);
    return defaultVal;
  }
};

export const useStatePersist = (key, initial) => {
  const [val, setVal] = useState(
    localStorage[key] === undefined
      ? initial
      : parseJSON(localStorage[key], initial),
  );

  useEffect(() => {
    localStorage[key] = JSON.stringify(val);
  }, [val]);

  return [val, setVal];
};
