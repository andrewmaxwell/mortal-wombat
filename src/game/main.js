import './game.css';
import {load} from './load';

let game;
const pressing = {};

const loop = () => {
  if (document.hasFocus() && game) {
    document.body.style.opacity = 1;
    game.iterate(pressing);
  } else {
    document.body.style.opacity = 0.5;
  }
  requestAnimationFrame(loop);
};

const init = async () => {
  game = await load();
  loop();

  const keydown = (e) => (pressing[e.code] = e.type === 'keydown');
  const keypress = (e) => {
    if (e.code === 'KeyP') game.makePoop();
  };
  window.addEventListener('keydown', keydown);
  window.addEventListener('keyup', keydown);
  window.addEventListener('keypress', keypress);
};

init();
