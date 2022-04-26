import {useState} from 'react';
import {dissoc, guid} from '../utils';

export const useErrors = () => {
  const [errors, setErrors] = useState({});
  const onError = (msg) => {
    setErrors((e) => ({...e, [guid()]: msg}));
  };
  const clearError = (key) => setErrors((e) => dissoc(key, e));
  return [errors, onError, clearError];
};
