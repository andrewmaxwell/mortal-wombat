import {defaultGameConfig, defaultTileTypes} from './defaults';
import {mergeDeepLeft} from './utils/mergeDeepLeft';

/*
The database stores numbers as strings, because the editor saves raw <input> values:
"0.005", and "" when a field is cleared. The game converts them once, when a world
loads (normalizeWorld), so engine code and tile scripts only ever see numbers.
The editor keeps working with the raw values, since those are what its inputs show.
*/

/**
 * A number as the database stores it: a numeric string, "" for a cleared field, or missing.
 * @typedef {string | number | undefined} StoredNumber
 */

/**
 * @typedef {object} StoredTile
 * @property {number} x
 * @property {number} y
 * @property {string} tileType a tile type's `id`, not its key in `tileTypes`
 * @property {string} [onSpace] script source
 * @property {string} [onTouch] script source
 * @property {string} [name]
 * @property {string} [user] the editor's uid
 * @property {number} [tstamp]
 */

/**
 * @typedef {object} StoredTileType
 * @property {string} id short id, e.g. 'g'. Custom types use numeric-looking ids ("10"), which stay strings.
 * @property {string} [label]
 * @property {string} [image]
 * @property {string} [sound]
 * @property {string} [color]
 * @property {StoredNumber} [hp]
 * @property {StoredNumber} [moveDelay]
 * @property {StoredNumber} [density]
 * @property {StoredNumber} [healing]
 * @property {StoredNumber} [makePoop]
 * @property {StoredNumber} [order]
 * @property {'liquid' | 'patrol' | ''} [moveStyle]
 * @property {boolean} [movable]
 * @property {boolean} [edible]
 * @property {boolean} [diggable]
 * @property {boolean} [collectible]
 * @property {boolean} [burns]
 * @property {string} [reactsWith] a tile type id
 * @property {string} [reactsInto] a tile type id
 * @property {string} [dropsLoot] a tile type id
 */

/**
 * `worlds/<worldId>`. tileTypes and gameConfig only hold overrides of src/defaults.js.
 * @typedef {object} StoredWorld
 * @property {Record<string, StoredTile>} [world] keyed "x_y"
 * @property {Record<string, Partial<StoredTileType>>} [tileTypes]
 * @property {Record<string, StoredNumber>} [gameConfig]
 */

/**
 * A tile type after normalizeWorld. Missing numbers are 0, except moveDelay:
 * a missing moveDelay means the tile never moves, and 0 means it moves every frame.
 * @typedef {Omit<StoredTileType, 'hp' | 'moveDelay' | 'density' | 'healing' | 'makePoop' | 'order'> & {
 *   hp: number, moveDelay: number | undefined, density: number, healing: number,
 *   makePoop: number, order: number,
 * }} TileType
 */

/**
 * The game config after normalizeWorld: every numeric setting is a number, and a missing
 * or cleared one is its default.
 * @typedef {{
 *   airDrag: number, digSpeed: number, eatSpeed: number, fallDamageMin: number,
 *   fallDamageMult: number, gravity: number, health: number, jumpPower: number,
 *   maxHealth: number, maxPoop: number, moveDeceleration: number, moveSpeed: number,
 *   poop: number, swimPower: number, waterDrag: number,
 *   fallDamageSound: string, gameOverSound: string, backgroundUrl: string,
 * }} GameConfig
 */

// The editor's number fields (TileTypeEditor, GameConfigFields) must match these lists.
export const numericGameConfigKeys = [
  'airDrag',
  'digSpeed',
  'eatSpeed',
  'fallDamageMin',
  'fallDamageMult',
  'gravity',
  'health',
  'jumpPower',
  'maxHealth',
  'maxPoop',
  'moveDeceleration',
  'moveSpeed',
  'poop',
  'swimPower',
  'waterDrag',
];

export const numericTileTypeKeys = [
  'hp',
  'moveDelay',
  'density',
  'healing',
  'makePoop',
  'order',
];

/** @returns {number | undefined} undefined for "", missing, or non-numeric values */
export const toNumber = (value) => {
  if (typeof value === 'number')
    return Number.isFinite(value) ? value : undefined;
  if (typeof value !== 'string' || value.trim() === '') return undefined;
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
};

/** @returns {GameConfig} */
const normalizeGameConfig = (overrides) => {
  const config = mergeDeepLeft(overrides, defaultGameConfig);
  for (const key of numericGameConfigKeys) {
    config[key] = toNumber(config[key]) ?? toNumber(defaultGameConfig[key]);
  }
  return config;
};

/** @returns {TileType} */
const normalizeTileType = (type) => {
  const result = {...type};
  for (const key of numericTileTypeKeys) {
    result[key] = toNumber(type[key]) ?? (key === 'moveDelay' ? undefined : 0);
  }
  return result;
};

/**
 * Combines a stored world with the defaults, converting numbers.
 * @param {StoredWorld} data
 * @returns {{world: Record<string, StoredTile>, tileTypes: Record<string, TileType>, gameConfig: GameConfig}}
 */
export const normalizeWorld = ({world = {}, tileTypes, gameConfig}) => {
  const mergedTileTypes = mergeDeepLeft(tileTypes, defaultTileTypes);
  const normalizedTileTypes = {};
  for (const key in mergedTileTypes) {
    const type = mergedTileTypes[key];
    if (type && typeof type === 'object') {
      normalizedTileTypes[key] = normalizeTileType(type);
    }
  }
  return {
    world,
    tileTypes: normalizedTileTypes,
    gameConfig: normalizeGameConfig(gameConfig),
  };
};
