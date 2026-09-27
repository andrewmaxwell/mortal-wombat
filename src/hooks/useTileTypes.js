import {useEffect, useState} from 'react';
import {listen} from '../firebase';

export const useTileTypes = (onError, worldId) => {
  const [tileTypes, setTileTypes] = useState();

  useEffect(() => {
    if (worldId) {
      return listen(`worlds/${worldId}/tileTypes`, setTileTypes, onError);
    }
  }, [worldId]);

  return tileTypes;
};
