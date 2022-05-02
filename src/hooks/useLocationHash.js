import {useEffect} from 'react';
import {debounce} from '../utils';

const setHash = debounce((...args) => {
  location.hash = args.join('/');
}, 1000);

export const useLocationHash = ({
  xCoord,
  yCoord,
  scale,
  setXCoord,
  setYCoord,
  setScale,
}) => {
  useEffect(() => {
    setHash(xCoord, yCoord, scale);
    return setHash.cancel;
  }, [scale, xCoord, yCoord]);

  useEffect(() => {
    const onHashChange = () => {
      const parts = location.hash.slice(1).split('/').map(Number);
      if (parts.length === 3 && parts.every((p) => !isNaN(p))) {
        const [x, y, scale] = parts;
        setXCoord(x);
        setYCoord(y);
        setScale(scale);
      }
    };
    onHashChange();
    window.addEventListener('hashchange', onHashChange);
    return () => {
      window.removeEventListener('hashchange', onHashChange);
    };
  }, []);
};
