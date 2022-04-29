const GRASS_HEALTH_AMT = 5;
const MAGMA_DAMAGE = 2;

// if returns true, then delete block
const interact = (game, you, block, pressing) => {
  if (block.type.collectible) {
    you.jewels++;
    return true;
  }

  if (block.type.deadly) {
    game.health = Math.max(0, game.health - MAGMA_DAMAGE);
  }

  if (block.type.edible && pressing.Space) {
    if (block.eaten === undefined) block.eaten = 1;
    block.eaten -= game.eatSpeed;
    game.health = Math.min(100, game.health + GRASS_HEALTH_AMT * game.eatSpeed);
    if (block.eaten <= 0) return true;
  }

  if (block.type.diggable && pressing.Space) {
    if (block.dug === undefined) block.dug = 1;
    block.dug -= game.digSpeed;
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
  constructor(youPos, blocks, config) {
    this.reset = () => {
      this.blocks = blocks;
      this.frame = 0;
      this.you = {
        x: 0,
        y: 0,
        xs: 0,
        ys: 0,
        dirX: 1,
        dirY: 0,
        jewels: 0,
        ...youPos,
      };

      // these can all be overridden by config
      this.digSpeed = 0.05;
      this.eatSpeed = 0.05;
      this.gravity = 0.005;
      this.health = 100;
      this.jumpPower = 0.11;
      this.magmaDelay = 30;
      this.moveSpeed = 0.015;
      this.moveDeceleration = 0.3;

      for (const x in config) {
        if (!isNaN(config[x])) this[x] = Number(config[x]); // because editing them turns them into strings, yayyyy
      }
    };
    this.reset();
  }
  iterate(pressing) {
    this.iterateYou(pressing);
    if (this.frame % this.magmaDelay === 0) this.iterateBlocks();
    this.frame++;
  }
  iterateYou(pressing) {
    const {you, blocks, gravity} = this;

    if (this.health <= 0) {
      if (pressing.Space) this.reset();
      return;
    }

    if (pressing.KeyA || pressing.KeyD || pressing.KeyW || pressing.KeyS) {
      you.dirX = 0;
      you.dirY = 0;
    }
    if (pressing.KeyA) {
      you.xs -= this.moveSpeed;
      you.dirX--;
    }
    if (pressing.KeyD) {
      you.xs += this.moveSpeed;
      you.dirX++;
    }
    if (pressing.KeyW) {
      if (!you.jumping) {
        you.ys -= this.jumpPower;
        you.jumping = true;
      }
      you.dirY--;
    }
    if (pressing.KeyS) {
      you.dirY++;
    }
    you.x += you.xs;
    you.xs *= 1 - this.moveDeceleration;
    you.ys += gravity;
    you.y += you.ys;

    for (const key of [
      `${Math.floor(you.x)}_${Math.floor(you.y)}`,
      `${Math.ceil(you.x)}_${Math.floor(you.y)}`,
      `${Math.floor(you.x)}_${Math.ceil(you.y)}`,
      `${Math.ceil(you.x)}_${Math.ceil(you.y)}`,
    ]) {
      if (blocks[key]) {
        const shouldDelete = interact(this, you, blocks[key], pressing);
        if (shouldDelete) delete blocks[key];
      }
    }
  }
  isEmpty(x, y) {
    return !this.blocks[`${x}_${y}`];
  }
  move(x, y, dx, dy) {
    const key = `${x}_${y}`;
    const b = this.blocks[key];
    delete this.blocks[key];
    b.x += dx;
    b.y += dy;
    this.blocks[`${b.x}_${b.y}`] = b;
  }
  iterateBlocks() {
    for (const b of Object.values(this.blocks)
      .filter((b) => b.type.movement === 'liquid')
      .sort((a, b) => (a.y === b.y ? Math.random() - 0.5 : a.y - b.y))) {
      if (this.isEmpty(b.x, b.y + 1)) {
        this.move(b.x, b.y, 0, 1);
      } else {
        const left = this.isEmpty(b.x - 1, b.y);
        const right = this.isEmpty(b.x + 1, b.y);
        if (left && right) {
          this.move(b.x, b.y, Math.random() < 0.5 ? 1 : -1, 0);
        } else if (left) {
          this.move(b.x, b.y, -1, 0);
        } else if (right) {
          this.move(b.x, b.y, 1, 0);
        }
      }
    }
  }
}
