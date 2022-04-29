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
      const match = location.hash?.match(/^#(\d+)\/(\d+)\/(\d+)$/);
      if (!match) return;
      const [, x, y, scale] = match.map(Number);
      setXCoord(x);
      setYCoord(y);
      setScale(scale);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => {
      window.removeEventListener('hashchange', onHashChange);
    };
  }, []);
};
