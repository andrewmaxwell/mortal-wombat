import {useEffect, useState} from 'react';
import {listen} from '../firebase';

export const useTileTypes = (onError, worldId) => {
  const [tileTypes, setTileTypes] = useState();

  // TODO: this should be part of useWorld or something
  useEffect(
    () => listen(`worlds/${worldId}/tileTypes`, setTileTypes, onError),
    [worldId]
  );

  return tileTypes;
};
