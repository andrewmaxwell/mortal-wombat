// Tile scripts (onSpace/onTouch) run inside this template, which defines the helpers they can
// use (TileLogic.jsx shows authors examples). It's shared so the editor can check scripts for
// syntax errors the same way the game compiles them.

// __guard wraps a callback so that errors it throws are reported instead of stopping the game
export const scriptParams = ['game', '__guard'];

export const wrapScript = (str) => `
const GRASS = 'g';
const POOP = 'p';
const STONE = 's';
const WOMBAT = 'w';
const MAGMA = 'm';
const JEWEL = 'j';
const KOALA = 'k';
const WATER = 'a';
const POLYMER = 'o';
const NPC = 'n';

const say = game.dialog.say.bind(game.dialog);
const choice = (text, action) =>
  game.dialog.choice(text, typeof action === 'function' ? __guard(action) : action);
const setTimeout = (f, ...args) =>
  window.setTimeout(typeof f === 'function' ? __guard(f) : f, ...args);
const setInterval = (f, ...args) =>
  window.setInterval(typeof f === 'function' ? __guard(f) : f, ...args);
const playSound = game.playSound.bind(game);
const pauseSound = game.pauseSound.bind(game);
const loopSound = game.loopSound.bind(game);
const jumpTo = game.jumpTo.bind(game);

const numCollected = game.numCollected.bind(game);
const setCollectible = game.setCollectible.bind(game);

const setPoop = game.setPoop.bind(game);
const setHealth = game.setHealth.bind(game);

const moveTile = game.moveTile.bind(game);
const addTile = game.addTile.bind(game);
const deleteTile = game.deleteTile.bind(game);
const isEmpty = game.isEmpty.bind(game);
const getTile = game.getTile.bind(game);
const getTileByName = game.getTileByName.bind(game);
const damage = game.damage.bind(game);
const changeTileType = game.changeTileType.bind(game);

const you = game.you;
const poop = game.poop;
const health = game.health;
const namedTiles = game.namedTiles;

${str}`;

// The syntax error in a script, as a message, or undefined if it compiles.
export const scriptSyntaxError = (str) => {
  if (!str) return;
  try {
    new Function(...scriptParams, wrapScript(str));
  } catch (e) {
    return String(e);
  }
};
