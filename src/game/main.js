import {loadData} from '../firebase.js';
import {CanvasRenderer} from './CanvasRenderer.js';
import {Game} from './Game.js';

const init = async () => {
  const {tileTypes, world, gameConfig} = await loadData([
    'tileTypes',
    'world',
    'gameConfig',
  ]);

  const typeIndex = {};
  let you;
  for (const type of Object.values(tileTypes)) {
    typeIndex[type.id] = type;
  }
  for (const key in world) {
    const {x, y, tileType} = world[key];
    if (tileType === 'w') {
      you = {x, y};
      delete world[key];
    } else {
      world[key] = {x, y, type: typeIndex[tileType]};
    }
  }

  if (location.hash.length > 1) {
    try {
      you = JSON.parse(atob(location.hash.slice(1)));
    } catch (e) {
      console.log('bad hash', e);
    }
  }

  console.log(gameConfig);
  const game = new Game(you, world, gameConfig);

  const canvas = document.createElement('canvas');
  const renderer = new CanvasRenderer(canvas);
  document.body.append(canvas);

  document.body.style.background = 'black';
  document.body.style.margin = 0;
  document.body.style.overflow = 'hidden';

  const pressing = {};

  const loop = () => {
    game.iterate(pressing);
    renderer.render(game);
    requestAnimationFrame(loop);
  };
  loop();

  const keypress = (e) => (pressing[e.code] = e.type === 'keydown');
  window.addEventListener('keydown', keypress);
  window.addEventListener('keyup', keypress);
};

init();
