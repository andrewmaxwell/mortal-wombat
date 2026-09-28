// Tile behavior each frame: falling, liquid and patrol movement, and reactions.
// It all comes from tile-type properties, so any tile type can use it.

const MAX_RENDER_DIST = 32; // don't move things more than this many tiles away

const dirs = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

const canPatrolOn = (game, x, y) => {
  const t = game.getTile(x, y);
  return t && t.type.moveStyle !== 'liquid';
};

const moveTileByStyle = (game, b) => {
  if (game.isEmpty(b.x, b.y + 1)) {
    game.moveTile(b.x, b.y, 0, 1);
  } else if (b.type.moveStyle === 'liquid') {
    const left = game.isEmpty(b.x - 1, b.y);
    const right = game.isEmpty(b.x + 1, b.y);
    if (left && right) {
      game.moveTile(b.x, b.y, Math.random() < 0.5 ? 1 : -1, 0);
    } else if (left) {
      game.moveTile(b.x, b.y, -1, 0);
    } else if (right) {
      game.moveTile(b.x, b.y, 1, 0);
    }
  } else if (b.type.moveStyle === 'patrol') {
    if (!b.dirX) b.dirX = 1;
    if (
      game.isEmpty(b.x + b.dirX, b.y) &&
      canPatrolOn(game, b.x + b.dirX, b.y + 1)
    ) {
      game.moveTile(b.x, b.y, b.dirX, 0);
    } else {
      b.dirX *= -1;
    }
  }
};

// burns: destroys neighbors that have HP.
// reactsWith: a neighbor of that type is consumed, and this tile turns into reactsInto
// (magma + water = stone).
const react = (game, b) => {
  const {burns, reactsWith, reactsInto} = b.type;
  let reacted = false;
  for (const [dx, dy] of dirs) {
    const block = game.getTile(b.x + dx, b.y + dy);
    if (!block) continue;
    if (reactsWith && block.type.id === reactsWith) {
      game.deleteTile(block);
      reacted = true;
    } else if (burns && block.type.hp) {
      game.deleteTile(block);
    }
  }
  if (reacted && game.typeIndex[reactsInto]) {
    game.changeTileType(b, game.typeIndex[reactsInto]);
  }
};

export const iterateTiles = (game) => {
  const {world, you, frame} = game;
  for (const key in world) {
    const b = world[key];
    const {moveDelay, burns, reactsWith} = b.type;
    const reacts = burns || reactsWith;
    const moves = moveDelay !== undefined;
    // tiles act every moveDelay frames (every frame when it's 0 or less);
    // reacting tiles without one act every frame
    if (
      (moves ? moveDelay > 0 && frame % moveDelay > 0 : !reacts) ||
      Math.abs(you.x - b.x) > MAX_RENDER_DIST ||
      Math.abs(you.y - b.y) > MAX_RENDER_DIST
    )
      continue;

    if (moves) moveTileByStyle(game, b);
    if (reacts) react(game, b);
  }
};
