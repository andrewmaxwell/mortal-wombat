import {expect, test, vi} from 'vitest';
import {Game} from './Game';
import {loadItem} from '../firebase';

vi.mock('../firebase', () => ({loadItem: vi.fn()}));

const noKeys = {};

const makeGame = async (world, {tileTypes, gameConfig, overrides} = {}) => {
  loadItem.mockResolvedValue({world, tileTypes, gameConfig});
  document.body.innerHTML = '<div id="root"></div>';
  const game = new Game(document.querySelector('#root'));
  return game.load('test', overrides);
};

const floor = (y, fromX, toX) =>
  Object.fromEntries(
    Array.from({length: toX - fromX + 1}, (_, i) => [
      `${fromX + i}_${y}`,
      {x: fromX + i, y, tileType: 's'},
    ]),
  );

const settle = (game, frames = 120, pressing = noKeys) => {
  for (let i = 0; i < frames; i++) game.iterate(pressing);
};

test('onTouch fires once per contact, even while touching other blocks', async () => {
  const game = await makeGame({
    ...floor(1, -3, 3),
    '1_0': {x: 1, y: 0, tileType: 's', onTouch: 'game.touches++'},
    w: {x: 0, y: 0, tileType: 'w'},
  });
  game.touches = 0;
  settle(game, 30);
  // push into the onTouch wall while also resting on the floor
  settle(game, 60, {right: true});
  expect(game.touches).toBe(1);

  // walk away and come back: that's a new contact
  settle(game, 10, {left: true});
  settle(game, 60, {right: true});
  expect(game.touches).toBe(2);
});

test('onTouch fires when a plain block is resolved first', async () => {
  const game = await makeGame({
    ...floor(1, -3, 3),
    '1_1': {x: 1, y: 1, tileType: 's', onTouch: 'game.touches++'},
    w: {x: 0, y: 0, tileType: 'w'},
  });
  game.touches = 0;
  // stand half on the plain block at x=0 and half on the onTouch block at x=1
  game.you.x = 0.5;
  settle(game, 60);
  expect(game.touches).toBe(1);
});

test('eating a custom tile without healing/makePoop does not produce NaN', async () => {
  const game = await makeGame(
    {
      ...floor(1, -3, 3),
      '1_0': {x: 1, y: 0, tileType: 'x'},
      w: {x: 0, y: 0, tileType: 'w'},
    },
    {tileTypes: {20: {id: 'x', edible: true, hp: '100', label: 'snack'}}},
  );
  settle(game, 30);
  settle(game, 10, {right: true, space: true});
  expect(game.health).not.toBeNaN();
  expect(game.poop).not.toBeNaN();
});

test('dying shows one overlay and keeps the HUD attached', async () => {
  const game = await makeGame({w: {x: 0, y: 0, tileType: 'w'}});
  const hudEl = game.hud.el;
  game.setHealth(0);
  game.setHealth(-5);
  expect(document.querySelectorAll('.youDead')).toHaveLength(1);
  expect(hudEl.isConnected).toBe(true);
});

test('a blank game config field falls back to the default', async () => {
  const game = await makeGame(
    {w: {x: 0, y: 0, tileType: 'w'}},
    {gameConfig: {gravity: ''}},
  );
  expect(game.gravity).toBe(0.005);
});

test('start position overrides work in a world with no wombat', async () => {
  const game = await makeGame(floor(1, -3, 3), {overrides: {x: 2, y: -1}});
  expect([game.you.x, game.you.y]).toEqual([2, -1]);
});

test('zero poop carries over when jumping worlds', async () => {
  const game = await makeGame(
    {w: {x: 0, y: 0, tileType: 'w'}},
    {gameConfig: {poop: '5'}, overrides: {poop: 0}},
  );
  expect(game.poop).toBe(0);
});

test('jumping to a missing world keeps the current world running', async () => {
  const game = await makeGame({w: {x: 0, y: 0, tileType: 'w'}});
  loadItem.mockResolvedValue(null);
  await game.jumpTo('nope');
  expect(game.loading).toBe(false);
  expect(game.dialog.isOpen).toBe(true);
});

// a pit at x=0..1 between stone walls, with the wombat off to the side
const pit = (tiles) => ({
  ...floor(1, -3, 12),
  '-1_0': {x: -1, y: 0, tileType: 's'},
  '2_0': {x: 2, y: 0, tileType: 's'},
  w: {x: 10, y: 0, tileType: 'w'},
  ...tiles,
});

const typeAt = (game, x, y) => game.getTile(x, y)?.type.id;

test('magma touching water turns to stone and consumes the water', async () => {
  const game = await makeGame(
    pit({
      '0_0': {x: 0, y: 0, tileType: 'm'},
      '1_0': {x: 1, y: 0, tileType: 'a'},
    }),
  );
  settle(game, 1);
  expect(typeAt(game, 0, 0)).toBe('s');
  expect(typeAt(game, 1, 0)).toBeUndefined();
});

test('magma burns neighbors that have HP, but not stone', async () => {
  const game = await makeGame(
    pit({
      '0_0': {x: 0, y: 0, tileType: 'm'},
      '1_0': {x: 1, y: 0, tileType: 'g'},
    }),
  );
  settle(game, 1);
  expect(typeAt(game, 1, 0)).toBeUndefined();
  expect(typeAt(game, -1, 0)).toBe('s');
  expect(typeAt(game, 0, 0)).toBe('m');
});

test('a world can turn off magma reacting with water', async () => {
  const game = await makeGame(
    pit({
      '0_0': {x: 0, y: 0, tileType: 'm'},
      '1_0': {x: 1, y: 0, tileType: 'a'},
    }),
    {tileTypes: {4: {reactsWith: ''}}},
  );
  settle(game, 1);
  expect(typeAt(game, 0, 0)).toBe('m');
  expect(typeAt(game, 1, 0)).toBe('a');
});

test('custom tile types can burn and react, even without a move delay', async () => {
  const game = await makeGame(
    pit({
      '0_0': {x: 0, y: 0, tileType: 'x'},
      '1_0': {x: 1, y: 0, tileType: 'g'},
      '0_-1': {x: 0, y: -1, tileType: 'n'},
    }),
    {
      tileTypes: {
        20: {
          id: 'x',
          label: 'acid',
          burns: true,
          reactsWith: 'g',
          reactsInto: 'j',
        },
      },
    },
  );
  settle(game, 1);
  // grass has HP, but reacting takes priority over burning it: the acid turns into a jewel
  expect(typeAt(game, 0, 0)).toBe('j');
  expect(typeAt(game, 1, 0)).toBeUndefined();
  // the NPC above has HP, so it burned
  expect(typeAt(game, 0, -1)).toBeUndefined();
});
