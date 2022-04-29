import {useEffect, useState} from 'react';
import {listen} from '../firebase';

export const useWorld = (onError) => {
  const [world, setWorld] = useState({});
  useEffect(() => listen('world', setWorld, onError), []);
  return world;
};
