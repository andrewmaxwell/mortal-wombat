import {Hud, TileElement, VersionElement, WorldElement} from './elements';

const MAX_RENDER_DIST = 32; // don't move things more than this many tiles away
const MOVEMENT_THRESHOLD = 0.1; // don't move you or the viewport if you move less than this much of a tile

const pairs = [
  [Math.floor, Math.floor],
  [Math.ceil, Math.floor],
  [Math.floor, Math.ceil],
  [Math.ceil, Math.ceil],
];

const dirs = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

export class Game {
  constructor(youPos, world, config, typeIndex, rootElement) {
    this.rootElement = rootElement;
    this.worldElement = new WorldElement(rootElement);
    this.hud = new Hud(rootElement, typeIndex);
    new VersionElement(rootElement);

    this.world = {};
    for (const key in world) this.addTile(world[key]);

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
    this.you.el = new TileElement(this.worldElement.el, {
      x: this.you.x,
      y: this.you.y,
      type: typeIndex.w,
    });
    for (const key of ['x', 'y', 'dirX', 'dirY']) {
      this.you['p' + key] = this.you[key];
    }
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
    this.fallDamageMin = 0.2;
    this.fallDamageMult = 100;
    this.swimPower = 0.005;
    this.waterDrag = 0.1;

    for (const x in config) {
      if (!isNaN(config[x])) this[x] = Number(config[x]); // because editing them turns them into strings, yayyyy
    }

    this.setHealth(this.health);
    this.setPoop(this.poop);
    this.you.el.update(this.you);
    this.worldElement.update(this.you);
  }
  iterate(pressing) {
    this.iterateYou(pressing);
    this.iterateTiles();
    this.frame++;
  }
  addTile(tile) {
    this.world[`${tile.x}_${tile.y}`] = {
      ...tile,
      el: new TileElement(this.worldElement.el, tile),
    };
  }
  deleteTile(tile) {
    tile.el.destroy();
    delete this.world[`${tile.x}_${tile.y}`];
  }
  changeTileType(tile, type) {
    tile.type = type;
    tile.el.updateType(type);
  }
  iterateYou(pressing) {
    const {you, world, gravity} = this;

    if (this.health <= 0) {
      if (pressing.reload) location.reload();
      return;
    }

    if (pressing.left || pressing.right || pressing.up || pressing.down) {
      you.dirX = 0;
      you.dirY = 0;
    }
    if (pressing.left) {
      you.xs -= you.swimming ? this.swimPower : this.moveSpeed;
      you.dirX--;
    }
    if (pressing.right) {
      you.xs += you.swimming ? this.swimPower : this.moveSpeed;
      you.dirX++;
    }
    if (pressing.up) {
      if (you.swimming) you.ys -= this.swimPower;
      else if (!you.jumping && !you.ys) {
        you.ys -= this.jumpPower;
        you.jumping = true;
      }
      you.dirY--;
    }
    if (pressing.down) {
      if (you.swimming) you.ys += this.swimPower;
      you.dirY++;
    }

    you.x += you.xs;
    you.xs *= 1 - (you.swimming ? this.waterDrag : this.moveDeceleration);

    if (you.swimming) you.ys *= 1 - this.waterDrag;
    else you.ys += gravity;

    you.y += you.ys;

    const seen = {};
    for (const [fx, fy] of pairs) {
      const key = fx(you.x) + '_' + fy(you.y);
      if (seen[key] || !world[key]) continue;
      seen[key] = true;
      this.resolveCollision(world[key]);
    }

    let damage = 0;
    you.swimming = false;
    for (const [fx, fy] of pairs) {
      const block = world[fx(you.x) + '_' + fy(you.y)];
      if (!block) continue;
      if (block.type.collectible) {
        this.incJewels();
        return this.deleteTile(block);
      }
      if (block.type.healing < 0) {
        damage = Math.max(damage, -block.type.healing);
      }
      if (block.type.moveStyle === 'liquid') you.swimming = true;
    }
    if (damage) this.setHealth(this.health - damage);

    if (
      Math.abs(you.x - you.px) > MOVEMENT_THRESHOLD ||
      Math.abs(you.y - you.py) > MOVEMENT_THRESHOLD ||
      you.dirX !== you.pdirX ||
      you.dirY !== you.pdirY
    ) {
      you.el.update(you);
      this.worldElement.update(you);

      you.px = you.x;
      you.py = you.y;
      you.pdirX = you.dirX;
      you.pdirY = you.dirY;
    }

    if (pressing.attack) {
      const angle = Math.atan2(you.dirY, you.dirX);
      const x = Math.round(you.x + Math.cos(angle));
      const y = Math.round(you.y + Math.sin(angle));
      const b = this.getTile(x, y);
      if (b?.type.edible) {
        if (b.hp === undefined) b.hp = b.type.hp;
        b.hp -= this.eatSpeed;
        this.setHealth(this.health + b.type.healing * this.eatSpeed);
        this.setPoop(this.poop + b.type.makePoop * this.eatSpeed);
        if (b.hp <= 0) return this.deleteTile(b);
      }
      if (b?.type.diggable) {
        if (b.hp === undefined) b.hp = b.type.hp;
        b.hp -= this.digSpeed;
        if (b.hp <= 0) return this.deleteTile(b);
      }
    }
  }
  resolveCollision(block) {
    const {you} = this;
    if (block.type.collectible || block.type.moveStyle === 'liquid') return;

    if (block.type.healing < 0) {
      this.setHealth(this.health + Number(block.type.healing));
      you.y -= 0.1;
    }

    if (Math.abs(you.x - block.x) > Math.abs(you.y - block.y)) {
      const dx = block.x < you.x ? -1 : 1;
      if (
        !you.jumping &&
        Math.abs(you.ys) < 0.1 && // TODO can this be better?
        block.type.movable &&
        this.isEmpty(block.x + dx, block.y)
      ) {
        this.moveTile(block.x, block.y, dx, 0);
      } else {
        you.x = block.x + (you.x < block.x ? -1 : 1);
      }
      you.xs = 0;
    } else {
      if (you.y < block.y) you.jumping = false;
      you.y = block.y + (you.y < block.y ? -1 : 1);

      // fall damage
      if (you.ys > this.fallDamageMin) {
        this.setHealth(
          this.health - (you.ys - this.fallDamageMin) * this.fallDamageMult
        );
      }
      you.ys = 0;
    }
  }
  getTile(x, y) {
    return this.world[`${x}_${y}`];
  }
  isEmpty(x, y) {
    return !this.getTile(x, y);
  }
  badGuyCanWalkOn(x, y) {
    const t = this.getTile(x, y);
    return t && t.type.moveStyle !== 'liquid';
  }
  moveTile(x, y, dx, dy) {
    const key = `${x}_${y}`;
    const b = this.world[key];
    delete this.world[key];
    b.x += dx;
    b.y += dy;
    this.world[`${b.x}_${b.y}`] = b;
    b.el.update(b);
  }
  iterateTiles() {
    for (const key in this.world) {
      const b = this.world[key];
      if (
        !b.type.moveDelay ||
        this.frame % b.type.moveDelay > 0 ||
        (this.you.x - b.x) ** 2 + (this.you.y - b.y) ** 2 > MAX_RENDER_DIST ** 2
      )
        continue;

      if (this.isEmpty(b.x, b.y + 1)) {
        this.moveTile(b.x, b.y, 0, 1);
      } else if (b.type.moveStyle === 'liquid') {
        const left = this.isEmpty(b.x - 1, b.y);
        const right = this.isEmpty(b.x + 1, b.y);
        if (left && right) {
          this.moveTile(b.x, b.y, Math.random() < 0.5 ? 1 : -1, 0);
        } else if (left) {
          this.moveTile(b.x, b.y, -1, 0);
        } else if (right) {
          this.moveTile(b.x, b.y, 1, 0);
        }
      } else if (b.type.moveStyle === 'patrol') {
        if (!b.dirX) b.dirX = 1;
        if (
          this.isEmpty(b.x + b.dirX, b.y) &&
          this.badGuyCanWalkOn(b.x + b.dirX, b.y + 1)
        ) {
          this.moveTile(b.x, b.y, b.dirX, 0);
        } else {
          b.dirX *= -1;
        }
      }

      // special rules for magma
      if (b.type.id === 'm') {
        let touchingWater = false;
        for (const [dx, dy] of dirs) {
          const block = this.getTile(b.x + dx, b.y + dy);
          if (block && (block.type.hp || block.type.id === 'a')) {
            if (block.type.id === 'a') touchingWater = true;
            this.deleteTile(block);
          }
        }
        if (touchingWater) {
          // if lava touches water, it turns to stone
          this.changeTileType(b, this.typeIndex.s);
        }
      }
    }
  }
  setHealth(health) {
    this.health = Math.max(0, Math.min(this.maxHealth, health));
    this.hud.healthBar.update(
      this.health,
      this.maxHealth,
      this.health > 30 ? 'green' : 'red'
    );
    if (health <= 0) {
      this.rootElement.innerHTML +=
        '<div class="youDead"><h1>you dead</h1><h2>press R to try again</h2></div>';
    }
  }
  setPoop(poop) {
    this.poop = Math.max(0, Math.min(this.maxPoop, poop));
    this.hud.poopBar.update(this.poop, this.maxPoop, 'saddleBrown');
  }
  incJewels() {
    this.jewels++;
    this.hud.jewelCounter.update(this.jewels);
  }
  makePoop() {
    if (this.poop < 1) return;
    const {you, world, typeIndex} = this;
    const angle = Math.atan2(you.dirY, you.dirX) + Math.PI;
    const x = Math.round(you.x + Math.cos(angle));
    const y = Math.round(you.y + Math.sin(angle));
    if ((x !== you.x || y !== you.y) && !world[`${x}_${y}`]) {
      this.addTile({x, y, type: typeIndex.p});
      this.setPoop(this.poop - 1);
    }
  }
}
