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
const namedTiles = game.namedTiles;

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

const TOUCH_GRACE_FRAMES = 2; // frames without contact before onTouch can fire again

// Runs a block's onTouch script when the wombat starts touching it, not on every frame
// of contact. Short gaps (a frame or two of bouncing off) still count as the same contact.
export const runOnTouch = (game, block) => {
  if (!block.onTouch) return;
  const isNewContact = !(
    game.frame - block.lastTouchFrame <=
    TOUCH_GRACE_FRAMES
  );
  block.lastTouchFrame = game.frame;
  if (isNewContact) block.onTouch(game);
};
