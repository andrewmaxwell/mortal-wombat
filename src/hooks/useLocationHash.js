import {useEffect} from 'react';
import {debounce, isGuid} from '../utils';

const setHash = debounce((...args) => {
  location.hash = args.join('/');
}, 1000);

export const useLocationHash = ({
  worldId,
  xCoord,
  yCoord,
  scale,
  setWorldId,
  setXCoord,
  setYCoord,
  setScale,
}) => {
  useEffect(() => {
    setHash(worldId, xCoord, yCoord, scale);
    return setHash.cancel;
  }, [worldId, scale, xCoord, yCoord]);

  useEffect(() => {
    const onHashChange = () => {
      const [id, x, y, sc] = location.hash.slice(1).split('/');
      if ((!id || isGuid(id)) && [x, y, sc].every((p) => !isNaN(p))) {
        setWorldId(id);
        setXCoord(Number(x));
        setYCoord(Number(y));
        setScale(Number(sc));
      } else {
        console.log('bad hash');
        location.hash = [worldId || '', xCoord, yCoord, scale].join('/');
      }
    };
    onHashChange();
    window.addEventListener('hashchange', onHashChange);
    return () => {
      window.removeEventListener('hashchange', onHashChange);
    };
  }, []);
};
