// Tile behavior each frame: falling, liquid and patrol movement, and reactions.
// It all comes from tile-type properties, so any tile type can use it.

const MAX_RENDER_DIST = 32; // don't move things more than this many tiles away
const CHUNK_SIZE = 16;

// Every tile is indexed by chunk, so each tick only looks at the chunks near the wombat, and
// costs the same in a world of any size. seq is when the tile was put at its key: the tiles
// near the wombat are visited in that order, which is the order a for...in over game.world
// visits them in, so tiles move exactly as they did when every tile was visited.
export const createTileIndex = () => ({chunks: new Map(), seq: 0});

const toChunk = (n) => Math.floor(n / CHUNK_SIZE);
const chunkKey = (x, y) => `${toChunk(x)}_${toChunk(y)}`;

// call when tile is removed from game.world, before its x or y changes
export const unindexTile = (game, tile) => {
  game.tileIndex.chunks.get(chunkKey(tile.x, tile.y))?.delete(tile);
};

// call when tile is put at its key in game.world, with the tile that was already there
export const indexTile = (game, tile, replaced) => {
  const {chunks} = game.tileIndex;
  if (replaced) {
    unindexTile(game, replaced);
    tile.seq = replaced.seq; // assigning to an existing key keeps its place in the order
  } else {
    tile.seq = ++game.tileIndex.seq;
  }
  const key = chunkKey(tile.x, tile.y);
  let chunk = chunks.get(key);
  if (!chunk) chunks.set(key, (chunk = new Set()));
  chunk.add(tile);
};

// the keys of the tiles within MAX_RENDER_DIST of the wombat, in the order they were put there
const nearbyKeys = (game) => {
  const {you, tileIndex} = game;
  const near = [];
  const maxX = toChunk(you.x + MAX_RENDER_DIST);
  const maxY = toChunk(you.y + MAX_RENDER_DIST);
  for (let cx = toChunk(you.x - MAX_RENDER_DIST); cx <= maxX; cx++) {
    for (let cy = toChunk(you.y - MAX_RENDER_DIST); cy <= maxY; cy++) {
      const chunk = tileIndex.chunks.get(`${cx}_${cy}`);
      if (!chunk) continue;
      for (const b of chunk) {
        if (
          Math.abs(you.x - b.x) <= MAX_RENDER_DIST &&
          Math.abs(you.y - b.y) <= MAX_RENDER_DIST
        )
          near.push(b);
      }
    }
  }
  near.sort((a, b) => a.seq - b.seq);
  return near.map((b) => `${b.x}_${b.y}`);
};

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
  for (const key of nearbyKeys(game)) {
    const b = world[key];
    if (!b) continue; // burned or consumed earlier in this tick
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
