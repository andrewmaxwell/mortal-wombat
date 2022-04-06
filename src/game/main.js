import {Renderer} from './Renderer';

class Game {
  constructor() {
    this.you = {x: 0, y: 0, xs: 0, ys: 0, jumpPower: 0.11, moveSpeed: 0.015};
    this.gravity = 0.005;
    this.blocks = [];
  }
  iterate(pressing) {
    const {you, blocks, gravity} = this;
    if (pressing.KeyA) you.xs -= you.moveSpeed;
    if (pressing.KeyD) you.xs += you.moveSpeed;
    if (pressing.KeyW && !you.jumping) {
      you.ys -= you.jumpPower;
      you.jumping = true;
    }
    you.x += you.xs;
    you.xs *= 0.7;
    you.ys += gravity;
    you.y += you.ys;

    // TODO: don't reconcile against all blocks, just those nearby
    for (const b of blocks) {
      const dx = you.x - b.x;
      const dy = you.y - b.y;
      if (dx < 1 && dx > -1 && dy < 1 && dy > -1) {
        if (Math.abs(dx) > Math.abs(dy)) {
          you.x = b.x + (you.x < b.x ? -1 : 1);
          you.xs = 0;
        } else {
          if (you.y < b.y) you.jumping = false;
          you.y = b.y + (you.y < b.y ? -1 : 1);
          you.ys = 0;
        }
      }
    }
  }
}

let game, renderer;
const pressing = {};

const colors = {
  X: 'red',
  g: 'green',
  b: 'blue',
  c: 'cyan',
  y: 'yellow',
  m: 'magenta',
  B: 'black',
};

const loadFromHash = () => {
  const data = JSON.parse(decodeURIComponent(location.hash.slice(1)));
  const rows = data.level.split('\n');

  game.blocks = [];
  for (let y = 0; y < rows.length; y++) {
    for (let x = 0; x < rows[y].length; x++) {
      if (rows[y][x] === 'X') {
        game.you.x = x;
        game.you.y = y;
      } else {
        const color = colors[rows[y][x]];
        if (color) game.blocks.push({x, y, color});
      }
    }
  }
};

const loop = () => {
  game.iterate(pressing);
  renderer.render(game);
  requestAnimationFrame(loop);
};

export const init = (canvas) => {
  game = new Game();
  renderer = new Renderer(canvas);
  loadFromHash();
  loop();
  return () => cancelAnimationFrame(loop);
};

const keypress = (e) => (pressing[e.code] = e.type === 'keydown');
window.addEventListener('keydown', keypress);
window.addEventListener('keyup', keypress);
window.addEventListener('hashchange', loadFromHash);
