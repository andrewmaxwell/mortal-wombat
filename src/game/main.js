import {Controls} from './controls';
import './game.css';
import {load} from './load';

let game,
  controls,
  isPaused = false;

const rootElement = document.querySelector('#root');

const loop = () => {
  if (document.hasFocus() && game) {
    if (isPaused) {
      isPaused = false;
      document.body.style.opacity = 1;
    }
    const controlState = controls.getPressing();
    if (!game.dialog.isOpen) game.iterate(controlState);
  } else if (!isPaused) {
    isPaused = true;
    document.body.style.opacity = 0.5;
  }
  requestAnimationFrame(loop);
};

const init = async () => {
  game = await load(rootElement);
  controls = new Controls(
    {
      onPress: (id) => {
        if (game.dialog.isOpen) {
          if (id === 'space' && game.dialog.hasChoices()) game.dialog.choose();
          else game.dialog.next();
        } else {
          if (id === 'poop') game.makePoop();
          else if (id === 'space') game.interact();
        }
      },
    },
    rootElement
  );
  window.addEventListener('resize', () => {
    game.updateViewport();
  });
  loop();
};

init();
