import {expect, test, vi} from 'vitest';
import {
  normalizeWorld,
  numericGameConfigKeys,
  numericTileTypeKeys,
  toNumber,
} from './worldSchema';
import {gameConfigFields} from './Components/GameConfigFields';
import {tileTypeFields} from './Components/TileTypeEditor';

vi.mock('./firebase', () => ({update: vi.fn()}));
vi.mock('./utils/worldIndex', () => ({markEdited: vi.fn()}));

const numberProps = (fields) =>
  fields.filter((f) => f.type === 'number').map((f) => f.prop);

test("the schema's numeric keys match the editor's number fields", () => {
  expect(numberProps(gameConfigFields).sort()).toEqual(
    [...numericGameConfigKeys].sort(),
  );
  expect(numberProps(tileTypeFields).sort()).toEqual(
    [...numericTileTypeKeys].sort(),
  );
});

test('toNumber', () => {
  expect(toNumber('0.005')).toBe(0.005);
  expect(toNumber(' -2 ')).toBe(-2);
  expect(toNumber(3)).toBe(3);
  expect(toNumber('0')).toBe(0);
  expect(toNumber('')).toBeUndefined();
  expect(toNumber('  ')).toBeUndefined();
  expect(toNumber(undefined)).toBeUndefined();
  expect(toNumber('abc')).toBeUndefined();
  expect(toNumber(true)).toBeUndefined();
  expect(toNumber(NaN)).toBeUndefined();
});

test('game config numbers are numbers, and blank or bad ones use the default', () => {
  const {gameConfig} = normalizeWorld({
    gameConfig: {gravity: '0.01', airDrag: '', jumpPower: 'fast'},
  });
  expect(gameConfig.gravity).toBe(0.01);
  expect(gameConfig.airDrag).toBe(0.001);
  expect(gameConfig.jumpPower).toBe(0.111);
  expect(gameConfig.maxHealth).toBe(100);
  expect(typeof gameConfig.backgroundUrl).toBe('string');
  for (const key of numericGameConfigKeys) {
    expect(typeof gameConfig[key]).toBe('number');
  }
});

test('tile type numbers are numbers, and missing ones are 0 except moveDelay', () => {
  const {tileTypes} = normalizeWorld({
    tileTypes: {
      0: {healing: ''},
      20: {id: '20', label: 'custom', hp: '3'},
      21: {id: '21', moveDelay: '0'},
    },
  });
  expect(tileTypes[0]).toMatchObject({id: 'g', healing: 0, hp: 1});
  expect(tileTypes[4]).toMatchObject({id: 'm', moveDelay: 30, density: 2});
  // numeric-looking ids stay strings, since tiles refer to them by id
  expect(tileTypes[20]).toMatchObject({id: '20', hp: 3, healing: 0});
  expect(tileTypes[20].moveDelay).toBeUndefined();
  expect(tileTypes[21].moveDelay).toBe(0);
});
