import {useEffect, useState} from 'react';
import {indexBy, objToArr} from '../utils';
import {listen} from '../firebase';

const indexTileTypes = (data) => indexBy((el) => el.id, objToArr(data));

export const useTileTypeIndex = (onError) => {
  const [tileTypes, setTileTypes] = useState({});
  useEffect(
    () =>
      listen(
        'tileTypes',
        (data) => setTileTypes(indexTileTypes(data)),
        onError
      ),
    []
  );
  return tileTypes;
};
