import {runOnTouch} from './compile';

// The wombat each frame: movement, collisions, and the blocks it touches, eats and digs.

const MOVEMENT_THRESHOLD = 0.1; // don't move you or the viewport if you move less than this much of a tile

// the four tiles the wombat can overlap
const pairs = [
  [Math.floor, Math.floor],
  [Math.ceil, Math.floor],
  [Math.floor, Math.ceil],
  [Math.ceil, Math.ceil],
];

// The tile position next to the wombat in the direction it faces, or behind it.
export const facingPosition = (you, behind = false) => {
  const angle = Math.atan2(you.dirY, you.dirX) + (behind ? Math.PI : 0);
  return {
    x: Math.round(you.x + Math.cos(angle)),
    y: Math.round(you.y + Math.sin(angle)),
  };
};

const resolveCollision = (game, block) => {
  const {you} = game;

  if (block.type.collectible || block.type.moveStyle === 'liquid') return;

  if (block.type.healing < 0) {
    game.setHealth(game.health + block.type.healing);
    game.playSound(block.type.id);
    you.y -= 0.1;
  }

  if (Math.abs(you.x - block.x) > Math.abs(you.y - block.y)) {
    const dx = block.x < you.x ? -1 : 1;
    if (you.onGround && !you.isJumping) {
      you.isPushing = true;
      if (block.type.movable && game.isEmpty(block.x + dx, block.y)) {
        game.moveTile(block.x, block.y, dx, 0);
      } else {
        you.x = block.x + (you.x < block.x ? -1 : 1);
      }
    } else {
      you.x = block.x + (you.x < block.x ? -1 : 1);
    }
    you.xs = 0;
    you.isWalking = false;
  } else {
    if (you.y < block.y) you.isJumping = false;
    you.y = block.y + (you.y < block.y ? -1 : 1);

    // fall damage
    if (you.ys > game.fallDamageMin) {
      const damage = (you.ys - game.fallDamageMin) * game.fallDamageMult;
      game.setHealth(game.health - damage);
      game.playSound('fallDamage');

      const blockDamage = Math.min(
        damage,
        block.hp || Infinity,
        block.type.hp || Infinity,
      );
      if (game.damage(block, damage)) {
        you.ys /= 1 + blockDamage;
        return;
      }
    }
    you.ys = 0;
  }
};

// The blocks the wombat is standing on: it's on the ground when there are any.
// Liquids and collectibles don't hold it up. Neither do blocks that hurt: it keeps
// falling into those, so they keep hurting it.
const getSupports = (game) => {
  const {you} = game;
  if (you.ys < 0 || you.y !== Math.floor(you.y)) return [];
  const below = [...new Set([Math.floor(you.x), Math.ceil(you.x)])]
    .map((x) => game.getTile(x, you.y + 1))
    .filter(Boolean);
  if (below.some((b) => b.type.healing < 0)) return [];
  return below.filter(
    (b) => b.type.moveStyle !== 'liquid' && !b.type.collectible,
  );
};

export const moveWombat = (game, pressing) => {
  const {you, world} = game;

  you.isPushing = false;
  you.isWalking = false;
  you.isDigging = false;

  if (game.health <= 0) {
    if (pressing.reload) location.reload();
    return;
  }

  const supports = getSupports(game);
  you.onGround = supports.length > 0;
  if (you.onGround) you.isJumping = false;

  if (pressing.left || pressing.right || pressing.up || pressing.down) {
    you.dirX = 0;
    you.dirY = 0;
  }
  if (pressing.left) {
    you.xs -= you.swimBlock ? game.swimPower : game.moveSpeed;
    you.dirX--;
    you.isWalking = true;
  }
  if (pressing.right) {
    you.xs += you.swimBlock ? game.swimPower : game.moveSpeed;
    you.dirX++;
    you.isWalking = true;
  }
  if (pressing.up) {
    if (you.swimBlock) you.ys -= game.swimPower;
    else if (you.onGround) {
      you.ys = -game.jumpPower;
      you.isJumping = true;
    }
    you.dirY--;
  }
  if (pressing.down) {
    if (you.swimBlock) you.ys += game.swimPower;
    you.dirY++;
  }

  you.x += you.xs;
  you.xs *= 1 - (you.swimBlock ? game.waterDrag : game.moveDeceleration);

  if (you.onGround && you.ys >= 0) {
    // resting: no gravity, so the wombat doesn't sink into the ground every other frame
    you.ys = 0;
  } else {
    you.y += you.ys;
    you.ys *= 1 - (you.swimBlock ? game.waterDrag : game.airDrag);
    you.ys += game.gravity * (1 - (you.swimBlock?.type.density ?? 0));
  }

  // Run onTouch for every overlapped block, and the blocks it stands on, before resolving
  // any collisions, since resolving one block can move the wombat off the others.
  const touched = new Set();
  const overlapping = pairs.map(
    ([fx, fy]) => world[fx(you.x) + '_' + fy(you.y)],
  );
  for (const block of [...overlapping, ...supports]) {
    if (block && !touched.has(block)) {
      touched.add(block);
      runOnTouch(game, block);
    }
  }

  const seen = {};
  for (const [fx, fy] of pairs) {
    const key = fx(you.x) + '_' + fy(you.y);
    if (seen[key] || !world[key]) continue;
    seen[key] = true;
    resolveCollision(game, world[key]);
  }

  let damage = 0;
  delete you.swimBlock;
  for (const [fx, fy] of pairs) {
    const block = world[fx(you.x) + '_' + fy(you.y)];
    if (!block) continue;
    if (block.type.collectible) {
      game.collect(block.type.id);
      game.deleteTile(block);
      continue;
    }
    if (block.type.healing < 0) {
      damage = Math.max(damage, -block.type.healing);
    }
    if (block.type.moveStyle === 'liquid') {
      you.swimBlock = block;
      // Only play the liquid blocks sound if this is the first time
      // the wombat has entered the liquid.
      if (
        game.lastSeen &&
        Object.keys(game.lastSeen).filter(
          (lastSeenIndex) => world[lastSeenIndex]?.type?.moveStyle === 'liquid',
        ).length === 0
      ) {
        game.playSound(block.type.id);
      }
    }
  }
  if (damage) game.setHealth(game.health - damage);

  // Capture the current seen blocks so they can be used to
  // determine if the wombat is already in the liquid.
  game.lastSeen = seen;

  if (pressing.space) {
    you.isDigging = true;
    const {x, y} = facingPosition(you);
    const b = game.getTile(x, y);
    if (b?.type.edible) {
      game.damage(b, game.eatSpeed);
      game.setHealth(game.health + b.type.healing * game.eatSpeed);
      game.setPoop(game.poop + b.type.makePoop * game.eatSpeed);
      game.playSound(b.type.id);
    }
    if (b?.type.diggable) {
      game.damage(b, game.digSpeed);
    }
  }

  if (
    Math.abs(you.x - you.px) > MOVEMENT_THRESHOLD ||
    Math.abs(you.y - you.py) > MOVEMENT_THRESHOLD ||
    you.dirX !== you.pdirX ||
    you.dirY !== you.pdirY ||
    you.isDigging !== you.pIsDigging ||
    you.isJumping !== you.pIsJumping ||
    you.isPushing !== you.pIsPushing ||
    you.isWalking !== you.pIsWalking
  ) {
    you.el.update(you);
    game.worldElement.update(you);

    you.px = you.x;
    you.py = you.y;
    you.pdirX = you.dirX;
    you.pdirY = you.dirY;
    you.pIsDigging = you.isDigging;
    you.pIsJumping = you.isJumping;
    you.pIsPushing = you.isPushing;
    you.pIsWalking = you.isWalking;
  }
};
