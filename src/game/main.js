import {StrictMode, useEffect, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import './game.css';
import {load} from './load';
import {Render} from './Render';

const useGame = () => {
  const game = useRef();
  const [, setCounter] = useState(0); // this is to force rerendering

  useEffect(() => {
    const pressing = {};
    let loop;

    load().then((newGame) => {
      game.current = newGame;
      loop = () => {
        game.current.iterate(pressing);
        setCounter((c) => c + 1);
        requestAnimationFrame(loop);
      };
      loop();
    });

    const keydown = (e) => (pressing[e.code] = e.type === 'keydown');
    const keypress = (e) => {
      if (e.code === 'KeyP') game.current.makePoop();
    };
    window.addEventListener('keydown', keydown);
    window.addEventListener('keyup', keydown);
    window.addEventListener('keypress', keypress);

    return () => {
      window.removeEventListener('keydown', keydown);
      window.removeEventListener('keyup', keydown);
      window.removeEventListener('keypress', keypress);
      cancelAnimationFrame(loop);
    };
  }, []);

  return game.current;
};

const GameContainer = () => {
  const game = useGame();
  return game && <Render {...game} />;
};

createRoot(document.querySelector('#root')).render(
  <StrictMode>
    <GameContainer />
  </StrictMode>
);
