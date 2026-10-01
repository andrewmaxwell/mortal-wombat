import {
  Dialog,
  Hud,
  ScriptErrors,
  TileElement,
  VersionElement,
  WorldElement,
  YouDeadElement,
} from './elements';
import {loadItem} from '../firebase';
import {normalizeWorld, numericGameConfigKeys} from '../worldSchema';
import {compile} from './compile';
import {Sounds} from './sounds';
import {createTileIndex, indexTile, iterateTiles, unindexTile} from './tiles';
import {facingPosition, moveWombat} from './wombat';

// Game holds the world state and the methods tile scripts call (see compile.js).
// The wombat's physics live in wombat.js, and the tiles' movement and reactions in tiles.js.
export class Game {
  constructor(rootElement) {
    this.rootElement = rootElement;
    this.worldElement = new WorldElement(rootElement);
    this.hud = new Hud(rootElement);
    this.dialog = new Dialog(rootElement);
    this.scriptErrors = new ScriptErrors(rootElement);
    new VersionElement(rootElement);
  }
  async load(worldId, overrides) {
    this.loading = true;
    const data = await loadItem(`worlds/${worldId}`);
    if (!data) {
      this.loading = !this.you; // keep playing the current world, if there is one
      throw new Error(`World not found: ${worldId}`);
    }
    const {world, tileTypes, gameConfig} = normalizeWorld(data);
    this.scriptErrors.clear();

    this.setGameBackground(gameConfig.backgroundUrl);

    const typeIndex = {};
    let youPos;
    for (const type of Object.values(tileTypes)) {
      typeIndex[type.id] = type;
    }
    for (const key in world) {
      const {x, y, tileType, onSpace, onTouch, name} = world[key];
      if (tileType === 'w') {
        youPos = {x, y};
        delete world[key];
      } else if (typeIndex[tileType]) {
        const onError = (script) => (e) =>
          this.reportScriptError({x, y, name}, script, e);
        world[key] = {
          x,
          y,
          type: typeIndex[tileType],
          onSpace: compile(onSpace, onError('On Space')),
          onTouch: compile(onTouch, onError('On Touch')),
          name,
        };
      } else {
        delete world[key];
      }
    }

    if (overrides?.x !== undefined && overrides?.y !== undefined) {
      youPos = {x: overrides.x, y: overrides.y};
    }

    this.sounds = new Sounds(gameConfig, typeIndex);

    this.worldElement.clear();
    this.world = {};
    this.tileIndex = createTileIndex();
    this.namedTiles = {};
    for (const key in world) this.addTile(world[key]);

    this.typeIndex = typeIndex;
    this.you = {
      x: 0,
      y: 0,
      xs: 0,
      ys: 0,
      dirX: 1,
      dirY: 0,
      type: typeIndex.w,
      ...youPos,
    };
    this.you.el = new TileElement(this.you, this.worldElement);
    for (const key of ['x', 'y', 'dirX', 'dirY']) {
      this.you['p' + key] = this.you[key];
    }
    this.collectibles = overrides?.collectibles || {};
    this.frame = 0;

    // numeric settings (digSpeed, gravity, etc.) become properties of the game
    for (const key of numericGameConfigKeys) this[key] = gameConfig[key];

    this.setHealth(overrides?.health ?? this.health);
    this.setPoop(overrides?.poop ?? this.poop);
    this.you.el.update(this.you);
    this.worldElement.update(this.you);
    this.loading = false;
    return this;
  }
  setGameBackground(backgroundUrl) {
    document.body.style.backgroundImage = `url(${backgroundUrl})`;
  }
  // where is the tile's position in the world as saved, which is where the editor shows it
  reportScriptError(where, script, error) {
    console.error(error);
    const tile = where.name
      ? `"${where.name}" (${where.x}, ${where.y})`
      : `(${where.x}, ${where.y})`;
    this.scriptErrors.show(`${script} script of tile ${tile}: ${error}`);
  }
  playSound(sound) {
    this.sounds.play(sound);
  }
  pauseSound(sound) {
    this.sounds.pause(sound);
  }
  loopSound(sound) {
    this.sounds.loop(sound);
  }
  iterate(pressing) {
    if (this.loading) return;
    moveWombat(this, pressing);
    iterateTiles(this);
    this.frame++;
  }

  // tiles

  addTile(tile) {
    const key = `${tile.x}_${tile.y}`;
    const replaced = this.world[key];
    const added = {...tile, el: new TileElement(tile, this.worldElement)};
    this.world[key] = added;
    indexTile(this, added, replaced);
    if (tile.name !== undefined) {
      this.namedTiles[tile.name] = added;
    }
  }
  deleteTile(tile) {
    tile.el.destroy();
    if (tile.name !== undefined && this.namedTiles[tile.name] !== undefined) {
      delete this.namedTiles[tile.name];
    }
    const key = `${tile.x}_${tile.y}`;
    if (this.world[key]) unindexTile(this, this.world[key]);
    delete this.world[key];
  }
  changeTileType(tile, type) {
    tile.type = type;
    delete tile.hp;
    tile.el.setBackground(type);
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
  getTile(x, y) {
    return this.world[`${x}_${y}`];
  }
  getTileByName(tileName) {
    return this.namedTiles[tileName];
  }
  isEmpty(x, y) {
    return !this.getTile(x, y);
  }
  moveTile(x, y, dx, dy) {
    const key = `${x}_${y}`;
    const b = this.world[key];
    delete this.world[key];
    unindexTile(this, b);
    b.x += dx;
    b.y += dy;
    const newKey = `${b.x}_${b.y}`;
    const replaced = this.world[newKey];
    this.world[newKey] = b;
    indexTile(this, b, replaced);
    b.el.update(b);
  }

  // HUD: health, poop and collectibles

  setHealth(health) {
    this.health = Math.max(0, Math.min(this.maxHealth, health));
    this.hud.healthBar.update(
      Math.ceil(this.health),
      this.maxHealth,
      this.health > 30 ? 'green' : 'red',
    );
    if (this.health <= 0 && !this.isDead) {
      this.isDead = true;
      this.playSound('gameOver');
      new YouDeadElement(this.rootElement);
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

  // actions from main.js and scripts

  makePoop() {
    if (this.poop < 1) return;
    const {you} = this;
    const {x, y} = facingPosition(you, true);
    if ((x !== you.x || y !== you.y) && this.isEmpty(x, y)) {
      this.addTile({x, y, type: this.typeIndex.p});
      this.setPoop(this.poop - 1);
      this.playSound('p');
    }
  }
  updateViewport() {
    this.worldElement.update(this.you);
  }
  interact() {
    const {x, y} = facingPosition(this.you);
    this.getTile(x, y)?.onSpace?.(this);
  }
  async jumpTo(worldId) {
    try {
      await this.load(worldId, {
        health: this.health,
        poop: this.poop,
        collectibles: this.collectibles,
      });
    } catch (e) {
      console.error(e);
      this.dialog.say(e.message);
    }
  }
}
