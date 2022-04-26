const GRASS_HEALTH_AMT = 1;

const interact = (you, block, pressing) => {
  if (block.type.collectible) {
    you.jewels++;
    return true;
  }

  if (block.type.deadly) {
    you.health--;
  }

  if (block.type.edible && pressing.Space) {
    if (block.eaten === undefined) block.eaten = 1;
    block.eaten -= you.eatSpeed;
    you.health = Math.min(100, you.health + GRASS_HEALTH_AMT * you.eatSpeed);
    if (block.eaten <= 0) return true;
  }

  if (block.type.diggable && pressing.Space) {
    if (block.dug === undefined) block.dug = 1;
    block.dug -= you.digSpeed;
    if (block.dug <= 0) return true;
  }

  const dx = you.x - block.x;
  const dy = you.y - block.y;
  if (Math.abs(dx) > Math.abs(dy)) {
    you.x = block.x + (you.x < block.x ? -1 : 1);
    you.xs = 0;
  } else {
    if (you.y < block.y) you.jumping = false;
    you.y = block.y + (you.y < block.y ? -1 : 1);
    you.ys = 0;
  }
};

export class Game {
  constructor(youPos, blocks) {
    this.you = {
      x: 0,
      y: 0,
      xs: 0,
      ys: 0,
      dirX: 1,
      dirY: 0,
      jumpPower: 0.11,
      moveSpeed: 0.015,
      health: 100,
      jewels: 0,
      eatSpeed: 0.05,
      digSpeed: 0.05,
      ...youPos,
    };
    this.gravity = 0.005;
    this.blocks = blocks;
  }
  iterate(pressing) {
    const {you, blocks, gravity} = this;
    if (you.health <= 0) return;

    if (pressing.KeyA || pressing.KeyD || pressing.KeyW || pressing.KeyS) {
      you.dirX = 0;
      you.dirY = 0;
    }
    if (pressing.KeyA) {
      you.xs -= you.moveSpeed;
      you.dirX--;
    }
    if (pressing.KeyD) {
      you.xs += you.moveSpeed;
      you.dirX++;
    }
    if (pressing.KeyW) {
      if (!you.jumping) {
        you.ys -= you.jumpPower;
        you.jumping = true;
      }
      you.dirY--;
    }
    if (pressing.KeyS) {
      you.dirY++;
    }
    you.x += you.xs;
    you.xs *= 0.7;
    you.ys += gravity;
    you.y += you.ys;

    for (const key of [
      `${Math.floor(you.x)}_${Math.floor(you.y)}`,
      `${Math.ceil(you.x)}_${Math.floor(you.y)}`,
      `${Math.floor(you.x)}_${Math.ceil(you.y)}`,
      `${Math.ceil(you.x)}_${Math.ceil(you.y)}`,
    ]) {
      if (blocks[key]) {
        const shouldDelete = interact(you, blocks[key], pressing);
        if (shouldDelete) delete blocks[key];
      }
    }
  }
}
