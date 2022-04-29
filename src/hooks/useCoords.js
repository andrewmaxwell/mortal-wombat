import {useEffect} from 'react';
import {useStatePersist} from './useStatePersist';

const mapping = {
  KeyS: 'down',
  KeyA: 'left',
  KeyW: 'up',
  KeyD: 'right',
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
};

const MOVE_AMOUNT = 4;

export const useCoords = (initialX = 0, initialY = 0) => {
  const [xCoord, setXCoord] = useStatePersist('xCoord', initialX);
  const [yCoord, setYCoord] = useStatePersist('yCoord', initialY);

  useEffect(() => {
    const onkeyDown = (e) => {
      if (e.target !== document.body) return;
      const dir = mapping[e.code];
      if (dir === 'up') setYCoord((y) => y - MOVE_AMOUNT);
      if (dir === 'down') setYCoord((y) => y + MOVE_AMOUNT);
      if (dir === 'left') setXCoord((x) => x - MOVE_AMOUNT);
      if (dir === 'right') setXCoord((x) => x + MOVE_AMOUNT);
    };
    window.addEventListener('keydown', onkeyDown);
    return () => {
      window.removeEventListener('keydown', onkeyDown);
    };
  }, []);

  return {xCoord, yCoord, setXCoord, setYCoord};
};
