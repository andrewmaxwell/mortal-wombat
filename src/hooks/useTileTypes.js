import {useEffect, useState} from 'react';
import {listen} from '../firebase';

export const useTileTypes = (onError) => {
  const [tileTypes, setTileTypes] = useState();
  useEffect(() => listen('tileTypes', setTileTypes, onError), []);
  return tileTypes;
};
