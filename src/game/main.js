import {loadData} from '../firebase.js';
import {Game} from './Game.js';
import {Renderer} from './Renderer.js';

const init = async () => {
  const {tileTypes, world} = await loadData(['tileTypes', 'world']);

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

  const game = new Game(you, world);

  const canvas = document.createElement('canvas');
  document.body.append(canvas);
  document.body.style.background = 'black';
  document.body.style.margin = 0;
  document.body.style.overflow = 'hidden';
  const renderer = new Renderer(canvas);
  const pressing = {};

  const loop = () => {
    game.iterate(pressing);
    renderer.render(game, tileTypes);
    requestAnimationFrame(loop);
  };
  loop();

  const keypress = (e) => (pressing[e.code] = e.type === 'keydown');
  window.addEventListener('keydown', keypress);
  window.addEventListener('keyup', keypress);
};

init();
