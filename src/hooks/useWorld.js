import {useEffect, useState} from 'react';
import {listenChildren} from '../firebase';

// a world's tiles, keyed "x_y". Listening to each tile, rather than the whole world, means a
// change doesn't rebuild every tile from the database's copy.
export const useWorld = (onError, worldId) => {
  const [world, setWorld] = useState({});
  useEffect(() => {
    setWorld({});
    if (!worldId) return;
    return listenChildren(
      `worlds/${worldId}/world`,
      (changes) =>
        setWorld((world) => {
          const next = {...world};
          for (const key in changes) {
            if (changes[key] === null) delete next[key];
            else next[key] = changes[key];
          }
          return next;
        }),
      onError,
    );
  }, [worldId]);
  return world;
};
