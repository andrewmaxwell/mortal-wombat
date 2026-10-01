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

// wombat physics: resting, jumping, walls, pushing, falling

const flat = (tiles = {}) => ({
  ...floor(1, -5, 20),
  w: {x: 0, y: 0, tileType: 'w'},
  ...tiles,
});

test('resting on the ground is stable', async () => {
  const game = await makeGame(flat());
  settle(game, 60);
  for (let i = 0; i < 4; i++) {
    game.iterate(noKeys);
    expect([game.you.y, game.you.ys]).toEqual([0, 0]);
  }
});

test('a one-frame jump press works on any frame', async () => {
  for (const offset of [0, 1]) {
    const game = await makeGame(flat());
    settle(game, 60 + offset);
    game.iterate({up: true});
    settle(game, 10);
    expect(game.you.y).toBeLessThan(-0.3);
  }
});

test('walking into a wall stops at the wall', async () => {
  const game = await makeGame(flat({'2_0': {x: 2, y: 0, tileType: 's'}}));
  settle(game, 30);
  for (let i = 0; i < 60; i++) {
    game.iterate({right: true});
    expect(game.you.x).toBeLessThanOrEqual(1);
  }
  expect(game.you.x).toBe(1);
});

test('pushing a movable block moves it', async () => {
  const game = await makeGame(flat({'2_0': {x: 2, y: 0, tileType: 'p'}}));
  settle(game, 30);
  settle(game, 120, {right: true});
  const poop = Object.values(game.world).find((t) => t.type.id === 'p');
  expect(poop.x).toBeGreaterThanOrEqual(6);
  expect(game.you.x).toBeLessThanOrEqual(poop.x - 1);
});

test('walking off a ledge falls', async () => {
  const game = await makeGame({
    ...floor(1, -5, 0),
    ...floor(4, -5, 20),
    w: {x: -1, y: 0, tileType: 'w'},
  });
  settle(game, 30);
  settle(game, 60, {right: true});
  expect(game.you.y).toBe(3);
});

test('a long fall hurts, but standing still does not', async () => {
  const game = await makeGame({
    ...floor(1, -5, 5),
    w: {x: 0, y: -20, tileType: 'w'},
  });
  settle(game, 120);
  expect(game.you.y).toBe(0);
  const {health} = game;
  expect(health).toBeLessThan(100);
  settle(game, 120);
  expect(game.health).toBe(health);
});

test('onTouch on the floor fires once while standing on it', async () => {
  const game = await makeGame(
    flat({'0_1': {x: 0, y: 1, tileType: 's', onTouch: 'game.touches++'}}),
  );
  game.touches = 0;
  settle(game, 120);
  expect(game.touches).toBe(1);

  // step off and back on: a new contact
  settle(game, 30, {right: true});
  settle(game, 60);
  settle(game, 30, {left: true});
  settle(game, 60);
  expect(game.touches).toBe(2);
});

test('standing on a koala keeps hurting', async () => {
  const game = await makeGame({
    ...floor(2, -5, 5),
    '0_1': {x: 0, y: 1, tileType: 'k'},
    w: {x: 0, y: 0, tileType: 'w'},
  });
  // stop the koala patrolling away
  game.getTile(0, 1).type = {
    ...game.getTile(0, 1).type,
    moveDelay: undefined,
  };
  settle(game, 60);
  expect(game.health).toBeLessThan(90);
});

test('numbers from the database reach the engine and scripts as numbers', async () => {
  const game = await makeGame(
    {
      ...floor(1, -3, 3),
      '1_0': {
        x: 1,
        y: 0,
        tileType: 'g',
        onTouch: 'game.hpSeen = getTile(1, 0).type.hp',
      },
      w: {x: 0, y: 0, tileType: 'w'},
    },
    {gameConfig: {maxPoop: '12', airDrag: ''}},
  );
  expect(game.maxPoop).toBe(12);
  expect(game.airDrag).toBe(0.001);
  settle(game, 30, {right: true});
  expect(game.hpSeen).toBe(1);
});

test('a move delay of 0 moves every frame', async () => {
  const game = await makeGame(
    {
      ...floor(10, -3, 3),
      '0_0': {x: 0, y: 0, tileType: 'p'},
      w: {x: 3, y: 9, tileType: 'w'},
    },
    {tileTypes: {1: {moveDelay: '0'}}},
  );
  settle(game, 3);
  expect(typeAt(game, 0, 3)).toBe('p');
});

const errorText = (game) => game.scriptErrors.el.textContent;

test('a script with a syntax error is reported and the tile still loads', async () => {
  const game = await makeGame({
    '1_0': {x: 1, y: 0, tileType: 's', name: 'sign', onSpace: '[say hi]'},
    w: {x: 0, y: 0, tileType: 'w'},
  });
  expect(typeAt(game, 1, 0)).toBe('s');
  expect(errorText(game)).toMatch(
    /On Space script of tile "sign" \(1, 0\): SyntaxError/,
  );
});

test('an onTouch that throws is reported once and collisions still work', async () => {
  const game = await makeGame({
    ...floor(1, -3, 3),
    '1_0': {x: 1, y: 0, tileType: 's', onTouch: 'getTileByName("nope").x'},
    w: {x: 0, y: 0, tileType: 'w'},
  });
  settle(game, 30);
  settle(game, 60, {right: true});
  settle(game, 10, {left: true});
  settle(game, 60, {right: true});
  // the wall still stopped the wombat
  expect(game.you.x).toBe(0);
  expect(game.you.y).toBe(0);
  expect(game.scriptErrors.el.children).toHaveLength(1);
  expect(errorText(game)).toMatch(
    /On Touch script of tile \(1, 0\): TypeError/,
  );
});

test('errors in choice and setTimeout callbacks are reported', async () => {
  vi.useFakeTimers();
  try {
    const game = await makeGame({
      '1_0': {
        x: 1,
        y: 0,
        tileType: 's',
        onSpace: `
          setTimeout(() => missingTimer());
          say('pick');
          choice('broken', () => missingChoice());`,
      },
      w: {x: 0, y: 0, tileType: 'w'},
    });
    game.interact();
    vi.runAllTimers();
    game.dialog.choose();
    expect(errorText(game)).toMatch(/missingTimer is not defined/);
    expect(errorText(game)).toMatch(/missingChoice is not defined/);
  } finally {
    vi.useRealTimers();
  }
});

test('a choice without an action just closes the dialog', async () => {
  const game = await makeGame({
    '1_0': {x: 1, y: 0, tileType: 's', onSpace: "say('hi'); choice('No');"},
    w: {x: 0, y: 0, tileType: 'w'},
  });
  game.interact();
  expect(game.dialog.isOpen).toBe(true);
  game.dialog.choose();
  expect(game.dialog.isOpen).toBe(false);
  expect(errorText(game)).toBe('');
});

test('the wombat can jump while standing half over magma', async () => {
  const game = await makeGame({
    ...floor(2, -5, 5),
    '0_1': {x: 0, y: 1, tileType: 's'},
    '1_1': {x: 1, y: 1, tileType: 'm'},
    '2_1': {x: 2, y: 1, tileType: 's'},
    w: {x: 0, y: 0, tileType: 'w'},
  });
  game.you.x = 0.5;
  settle(game, 60);
  expect(game.you.y).toBe(0);
  game.iterate({up: true});
  settle(game, 10);
  expect(game.you.y).toBeLessThan(-0.3);
});

test('a falling tile keeps falling across chunk borders', async () => {
  const game = await makeGame({
    ...floor(1, -3, 3),
    ...floor(30, 4, 6),
    '5_2': {x: 5, y: 2, tileType: 'p'},
    w: {x: 0, y: 0, tileType: 'w'},
  });
  settle(game, 120);
  expect(game.getTile(5, 29)?.type.id).toBe('p');
  expect(game.isEmpty(5, 2)).toBe(true);
});

test('tiles out of reach wait until the wombat comes near', async () => {
  const game = await makeGame({
    ...floor(1, -3, 3),
    ...floor(1, 42, 48),
    ...floor(5, 49, 51),
    '50_0': {x: 50, y: 0, tileType: 'p'},
    w: {x: 0, y: 0, tileType: 'w'},
  });
  settle(game, 60);
  expect(game.getTile(50, 0)?.type.id).toBe('p');

  Object.assign(game.you, {x: 45, y: 0, xs: 0, ys: 0});
  settle(game, 60);
  expect(game.isEmpty(50, 0)).toBe(true);
  expect(game.getTile(50, 4)?.type.id).toBe('p');
});

test('tiles that scripts add fall, and deleted or replaced ones stop', async () => {
  const game = await makeGame({
    ...floor(1, -3, 3),
    ...floor(10, 4, 8),
    w: {x: 0, y: 0, tileType: 'w'},
  });
  const {p, s} = game.typeIndex;
  game.addTile({x: 5, y: 0, type: p});
  game.addTile({x: 6, y: 0, type: p});
  game.addTile({x: 7, y: 0, type: p});
  game.deleteTile(game.getTile(6, 0));
  game.addTile({x: 7, y: 0, type: s}); // replaces the poop
  settle(game, 60);
  expect(game.getTile(5, 9)?.type.id).toBe('p');
  expect(game.getTile(7, 0)?.type.id).toBe('s');
  const poops = Object.values(game.world).filter((t) => t.type.id === 'p');
  expect(poops.map(({x, y}) => [x, y])).toEqual([[5, 9]]);
});

test("loading another world leaves the old world's tiles behind", async () => {
  const game = await makeGame({
    ...floor(1, -3, 3),
    '2_-5': {x: 2, y: -5, tileType: 'p'},
    w: {x: 0, y: 0, tileType: 'w'},
  });
  loadItem.mockResolvedValue({
    world: {...floor(1, -1, 1), w: {x: 0, y: 0, tileType: 'w'}},
  });
  await game.load('other');
  settle(game, 60);
  expect(Object.keys(game.world).sort()).toEqual(['-1_1', '0_1', '1_1']);
});
