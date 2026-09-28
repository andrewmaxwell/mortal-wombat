import {Controls} from './controls';
import './game.css';
import {GamepadControls} from './gamepadControls';
import {load} from './load';
import {TouchControls} from './touchControls';

// Physics constants are tuned per-tick at 60 ticks/sec. Stepping at a fixed rate
// keeps game speed the same on 120/144Hz displays.
const TICK_MS = 1000 / 60;
const TICK_TOLERANCE_MS = 1; // absorb frame timing jitter so 60Hz stays at 1 tick/frame
const MAX_TICKS_PER_FRAME = 5;

let game,
  controls,
  isPaused = false,
  lastTime,
  elapsed = 0;

const rootElement = document.querySelector('#root');

const loop = (now) => {
  requestAnimationFrame(loop);
  if (!document.hasFocus() || !game) {
    if (!isPaused) {
      isPaused = true;
      document.body.style.opacity = 0.5;
    }
    lastTime = undefined;
    return;
  }
  if (isPaused) {
    isPaused = false;
    document.body.style.opacity = 1;
  }

  elapsed += lastTime === undefined ? TICK_MS : now - lastTime;
  lastTime = now;

  // read the controls only on frames that tick: touch taps are latched until read
  let controlState;
  let ticks = 0;
  while (elapsed >= TICK_MS - TICK_TOLERANCE_MS) {
    controlState ??= controls.getPressing();
    if (!game.dialog.isOpen) game.iterate(controlState);
    elapsed -= TICK_MS;
    if (++ticks >= MAX_TICKS_PER_FRAME) {
      elapsed = 0; // too far behind (e.g. tab was stalled); don't try to catch up
      break;
    }
  }
};

const init = async () => {
  game = await load(rootElement);
  const onPress = (id) => {
    if (game.dialog.isOpen) {
      if (id === 'space' && game.dialog.hasChoices()) game.dialog.choose();
      else game.dialog.next();
    } else {
      if (id === 'poop') game.makePoop();
      else if (id === 'space') game.interact();
    }
  };
  controls = new Controls({onPress}, [
    new GamepadControls({onPress}),
    new TouchControls({onPress}, rootElement),
  ]);
  window.addEventListener('resize', () => {
    game.updateViewport();
  });
  requestAnimationFrame(loop);
};

init();
