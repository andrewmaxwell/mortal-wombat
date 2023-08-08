const useTemplate = (str) => `
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
const choice = game.dialog.choice.bind(game.dialog);
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

${str}`;

export const compile = (str) => {
  if (!str) return;
  try {
    return new Function('game', useTemplate(str));
  } catch (e) {
    console.error(`Invalid logic: ${str}`);
    console.error(e);
    return;
  }
};
