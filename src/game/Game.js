export class Game {
  constructor(youPos, world, config, typeIndex) {
    this.world = world;
    this.typeIndex = typeIndex;
    this.you = {
      x: 0,
      y: 0,
      xs: 0,
      ys: 0,
      dirX: 1,
      dirY: 0,
      ...youPos,
    };
    this.jewels = 0;
    this.frame = 0;

    // these can all be overridden by config
    this.digSpeed = 0.07;
    this.eatSpeed = 0.05;
    this.gravity = 0.005;
    this.health = 100;
    this.maxHealth = 100;
    this.poop = 50;
    this.maxPoop = 10;
    this.jumpPower = 0.11;
    this.moveSpeed = 0.02;
    this.moveDeceleration = 0.3;

    for (const x in config) {
      if (!isNaN(config[x])) this[x] = Number(config[x]); // because editing them turns them into strings, yayyyy
    }
  }
  iterate(pressing) {
    this.iterateYou(pressing);
    this.iterateTiles();
    this.frame++;
    return this;
  }
  iterateYou(pressing) {
    const {you, world, gravity} = this;

    if (this.health <= 0) {
      if (pressing.KeyR) location.reload();
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
      if (!you.jumping && !you.ys) {
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
      if (world[key]) {
        const shouldDelete = this.interact(you, world[key], pressing);
        if (shouldDelete) delete world[key];
      }
    }
  }
  isEmpty(x, y) {
    return (x !== this.you.x || y !== this.you.y) && !this.world[`${x}_${y}`];
  }
  moveTile(x, y, dx, dy) {
    const key = `${x}_${y}`;
    const b = this.world[key];
    delete this.world[key];
    b.x += dx;
    b.y += dy;
    this.world[`${b.x}_${b.y}`] = b;
  }
  iterateTiles() {
    for (const key in this.world) {
      const b = this.world[key];
      if (!b.type.moveDelay || this.frame % b.type.moveDelay > 0) continue;

      if (this.isEmpty(b.x, b.y + 1)) {
        this.moveTile(b.x, b.y, 0, 1);
      } else if (b.type.liquid) {
        const left = this.isEmpty(b.x - 1, b.y);
        const right = this.isEmpty(b.x + 1, b.y);
        if (left && right) {
          this.moveTile(b.x, b.y, Math.random() < 0.5 ? 1 : -1, 0);
        } else if (left) {
          this.moveTile(b.x, b.y, -1, 0);
        } else if (right) {
          this.moveTile(b.x, b.y, 1, 0);
        }
      }
    }
  }
  // if returns true, then delete block
  interact(you, block, pressing) {
    if (this.onIntersect(block, pressing)) return true;
    if (Math.abs(you.x - block.x) > Math.abs(you.y - block.y)) {
      const dx = block.x < you.x ? -1 : 1;
      if (block.type.movable && this.isEmpty(block.x + dx, block.y)) {
        this.moveTile(block.x, block.y, dx, 0);
      } else {
        you.x = block.x + (you.x < block.x ? -1 : 1);
      }
      you.xs = 0;
    } else {
      if (you.y < block.y) you.jumping = false;
      const dy = block.y < you.y ? -1 : 1;
      if (block.type.movable && this.isEmpty(block.x, block.y + dy)) {
        this.moveTile(block.x, block.y, 0, dy);
      } else {
        you.y = block.y + (you.y < block.y ? -1 : 1);
      }
      you.ys = 0;
    }
  }
  onIntersect(block, pressing) {
    if (block.type.collectible) {
      this.jewels++;
      return true;
    }

    if (block.type.healing < 0) {
      this.health = Math.max(0, this.health + Number(block.type.healing));
    }

    if (block.type.edible && pressing.Space) {
      if (block.eaten === undefined) block.eaten = 1;
      block.eaten -= this.eatSpeed;
      this.health = Math.min(
        this.maxHealth,
        this.health + block.type.healing * this.eatSpeed
      );
      this.poop = Math.min(
        this.maxPoop,
        this.poop + block.type.makePoop * this.eatSpeed
      );
      if (block.eaten <= 0) return true;
    }

    if (block.type.diggable && pressing.Space) {
      if (block.dug === undefined) block.dug = 1;
      block.dug -= this.digSpeed;
      if (block.dug <= 0) return true;
    }
  }
  makePoop() {
    if (this.poop < 1) return;
    const {you, world, typeIndex} = this;
    const angle = Math.atan2(you.dirY, you.dirX) + Math.PI;
    const x = Math.round(you.x + Math.cos(angle));
    const y = Math.round(you.y + Math.sin(angle));
    if ((x !== you.x || y !== you.y) && !world[`${x}_${y}`]) {
      world[`${x}_${y}`] = {x, y, type: typeIndex.p};
      this.poop--;
    }
  }
}
