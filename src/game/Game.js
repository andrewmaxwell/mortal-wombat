import {
  Dialog,
  Hud,
  TileElement,
  VersionElement,
  WorldElement,
} from './elements';
import {isValidUrl} from '../utils/isValidUrl';

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
    this.hud = new Hud(rootElement);
    this.dialog = new Dialog(rootElement);
    this.sounds = this.buildSounds(config, typeIndex);

    new VersionElement(rootElement);

    this.world = {};
    for (const key in world) this.addTile(world[key]);

    this.typeIndex = typeIndex;
    this.you = {x: 0, y: 0, xs: 0, ys: 0, dirX: 1, dirY: 0, ...youPos};
    this.you.el = new TileElement(
      {x: this.you.x, y: this.you.y, type: typeIndex.w},
      this.worldElement
    );
    for (const key of ['x', 'y', 'dirX', 'dirY']) {
      this.you['p' + key] = this.you[key];
    }
    this.collectibles = {};
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
    this.airDrag = 0.001;

    for (const x in config) {
      if (!isNaN(config[x])) this[x] = Number(config[x]); // because editing them turns them into strings, yayyyy
    }

    this.setHealth(this.health);
    this.setPoop(this.poop);
    this.you.el.update(this.you);
    this.worldElement.update(this.you);
  }
  buildSounds(config, typeIndex) {
    const sounds = {};

    Object.values(typeIndex)
      .filter((type) => type.sound)
      .forEach((type) => (sounds[type.id] = new Audio(type.sound)));

    const soundSettingSuffix = 'Sound';
    Object.keys(config)
      .filter((key) => key.endsWith(soundSettingSuffix) && config[key])
      .forEach((key) => {
        const soundName = key.substring(
          0,
          key.length - soundSettingSuffix.length
        );
        sounds[soundName] = new Audio(config[key]);
      });

    return sounds;
  }
  playSound(sound) {
    if (this.sounds[sound] === undefined && isValidUrl(sound)) {
      this.sounds[sound] = new Audio(sound);
    }
    this.sounds[sound]?.play();
  }
  pauseSound(sound) {
    this.sounds[sound]?.pause();
  }
  loopSound(sound) {
    this.playSound(sound);
    if (this.sounds[sound]) this.sounds[sound].loop = true;
  }
  iterate(pressing) {
    this.moveWombat(pressing);
    this.iterateTiles();
    this.frame++;
  }
  addTile(tile) {
    this.world[`${tile.x}_${tile.y}`] = {
      ...tile,
      el: new TileElement(tile, this.worldElement),
    };
  }
  deleteTile(tile) {
    tile.el.destroy();
    delete this.world[`${tile.x}_${tile.y}`];
  }
  changeTileType(tile, type) {
    tile.type = type;
    delete tile.hp;
    tile.el.updateType(type);
  }
  moveWombat(pressing) {
    const {you, world} = this;
    const lastSwimBlock = you.swimBlock;

    if (this.health <= 0) {
      if (pressing.reload) location.reload();
      return;
    }

    if (pressing.left || pressing.right || pressing.up || pressing.down) {
      you.dirX = 0;
      you.dirY = 0;
    }
    if (pressing.left) {
      you.xs -= you.swimBlock ? this.swimPower : this.moveSpeed;
      you.dirX--;
    }
    if (pressing.right) {
      you.xs += you.swimBlock ? this.swimPower : this.moveSpeed;
      you.dirX++;
    }
    if (pressing.up) {
      if (you.swimBlock) you.ys -= this.swimPower;
      else if (!you.jumping && !you.ys) {
        you.ys -= this.jumpPower;
        you.jumping = true;
      }
      you.dirY--;
    }
    if (pressing.down) {
      if (you.swimBlock) you.ys += this.swimPower;
      you.dirY++;
    }

    you.x += you.xs;
    you.xs *= 1 - (you.swimBlock ? this.waterDrag : this.moveDeceleration);

    you.y += you.ys;
    you.ys *= 1 - (you.swimBlock ? this.waterDrag : this.airDrag);
    you.ys += this.gravity * (1 - (you.swimBlock?.type.density || 0));

    const seen = {};
    for (const [fx, fy] of pairs) {
      const key = fx(you.x) + '_' + fy(you.y);
      if (seen[key] || !world[key]) continue;
      seen[key] = true;
      this.resolveCollision(world[key]);
    }

    let damage = 0;
    delete you.swimBlock;
    for (const [fx, fy] of pairs) {
      const block = world[fx(you.x) + '_' + fy(you.y)];
      if (!block) continue;
      if (block.type.collectible) {
        this.collect(block.type.id);
        return this.deleteTile(block);
      }
      if (block.type.healing < 0) {
        damage = Math.max(damage, -block.type.healing);
      }
      if (block.type.moveStyle === 'liquid') you.swimBlock = block;
    }
    if (you.swimBlock && you.swimBlock !== lastSwimBlock) {
      this.playSound(you.swimBlock.type.id);
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

    if (pressing.space) {
      const angle = Math.atan2(you.dirY, you.dirX);
      const x = Math.round(you.x + Math.cos(angle));
      const y = Math.round(you.y + Math.sin(angle));
      const b = this.getTile(x, y);
      if (b?.type.edible) {
        this.damage(b, this.eatSpeed);
        this.setHealth(this.health + b.type.healing * this.eatSpeed);
        this.setPoop(this.poop + b.type.makePoop * this.eatSpeed);
        this.playSound(b.type.id);
      }
      if (b?.type.diggable) this.damage(b, this.digSpeed);
    }
  }
  // returns true if block is destroyed
  damage(block, amount) {
    if (!block?.type.hp) return;
    if (block.hp === undefined) block.hp = block.type.hp;

    block.hp -= amount;

    if (block.hp <= 0) {
      if (block.type.dropsLoot) {
        this.changeTileType(block, this.typeIndex[block.type.dropsLoot]);
      } else this.deleteTile(block);

      return true;
    }
  }
  resolveCollision(block) {
    const {you} = this;
    if (block.type.collectible || block.type.moveStyle === 'liquid') return;

    if (block.type.healing < 0) {
      this.setHealth(this.health + Number(block.type.healing));
      this.playSound(block.type.id);
      you.y -= 0.1;
    }

    if (Math.abs(you.x - block.x) > Math.abs(you.y - block.y)) {
      const dx = block.x < you.x ? -1 : 1;
      if (
        !you.jumping &&
        you.ys === this.gravity &&
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
        const damage = (you.ys - this.fallDamageMin) * this.fallDamageMult;
        this.setHealth(this.health - damage);
        this.playSound('fallDamage');

        const blockDamage = Math.min(
          damage,
          block.hp || Infinity,
          block.type.hp || Infinity
        );
        if (this.damage(block, damage)) {
          you.ys /= 1 + blockDamage;
          return;
        }
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
        Math.abs(this.you.x - b.x) > MAX_RENDER_DIST ||
        Math.abs(this.you.y - b.y) > MAX_RENDER_DIST
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
      Math.ceil(this.health),
      this.maxHealth,
      this.health > 30 ? 'green' : 'red'
    );
    if (health <= 0) {
      this.playSound('gameOver');
      this.rootElement.innerHTML +=
        '<div class="youDead"><h1>you dead</h1><h2>press R to try again</h2></div>';
    }
  }
  numCollected(id) {
    return this.collectibles[id] || 0;
  }
  setCollectible(typeId, amount) {
    this.collectibles[typeId] = amount;
    this.hud.updateCounter(this.typeIndex[typeId], amount);
  }
  collect(typeId) {
    this.setCollectible(typeId, this.numCollected(typeId) + 1);
    this.playSound(typeId);
  }
  setPoop(poop) {
    this.poop = Math.max(0, Math.min(this.maxPoop, poop));
    this.hud.poopBar.update(Math.floor(this.poop), this.maxPoop, 'saddleBrown');
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
      this.playSound('p');
    }
  }
  updateViewport() {
    this.worldElement.update(this.you);
  }
  interact() {
    const {you} = this;
    const angle = Math.atan2(you.dirY, you.dirX);
    const x = Math.round(you.x + Math.cos(angle));
    const y = Math.round(you.y + Math.sin(angle));
    this.getTile(x, y)?.onSpace?.(this);
  }
}
