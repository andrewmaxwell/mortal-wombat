import {useEffect, useState} from 'react';
import {listen} from '../firebase';

export const useWorld = (onError, worldId) => {
  const [world, setWorld] = useState({});
  useEffect(() => {
    if (worldId) {
      return listen(
        (worldId ? `worlds/${worldId}/` : '') + 'world',
        setWorld,
        onError
      );
    }
  }, [worldId]);
  return world;
};
