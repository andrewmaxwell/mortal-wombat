import {Controls} from './controls';
import './game.css';
import {load} from './load';

let game, controls;

const rootElement = document.querySelector('#root');

const loop = () => {
  if (document.hasFocus() && game) {
    document.body.style.opacity = 1;
    game.iterate(controls.getPressing());
  } else {
    document.body.style.opacity = 0.5;
  }
  requestAnimationFrame(loop);
};

const init = async () => {
  game = await load(rootElement);
  controls = new Controls(
    {
      onPress: (id) => {
        if (id === 'poop') game.makePoop();
      },
    },
    rootElement
  );
  loop();
};

init();
