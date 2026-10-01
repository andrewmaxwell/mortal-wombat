import {describe, expect, it} from 'vitest';
import {createUndoHistory} from './undoHistory';

const tile = (x, y, tileType, extra) => ({x, y, tileType, ...extra});
const del = (x, y) => tile(x, y, '_delete');

// applies saved tiles to a world the way saveTiles does, adding the user and tstamp
const apply = (world, tiles) => {
  world = {...world};
  for (const t of tiles) {
    if (t.tileType === '_delete') delete world[`${t.x}_${t.y}`];
    else world[`${t.x}_${t.y}`] = {...t, user: 'me', tstamp: 2};
  }
  return world;
};

// records an edit and returns the world after it
const edit = (history, world, x, y, tileType) => {
  const after = tileType === '_delete' ? undefined : tile(x, y, tileType);
  history.record({x, y, before: world[`${x}_${y}`], after});
  return apply(world, [after ?? del(x, y)]);
};

describe('createUndoHistory', () => {
  it('undoes and redoes placing a tile', () => {
    const h = createUndoHistory();
    h.startStep();
    let world = edit(h, {}, 0, 0, 'g');
    expect(h.undo(world)).toEqual([del(0, 0)]);
    world = {};
    expect(h.redo(world)).toEqual([tile(0, 0, 'g')]);
  });

  it('restores a deleted tile with its scripts and name', () => {
    const scripted = tile(1, 2, 'n', {onSpace: "say('hi')", name: 'bob'});
    const h = createUndoHistory();
    h.startStep();
    const world = edit(
      h,
      {'1_2': {...scripted, user: 'other'}},
      1,
      2,
      '_delete',
    );
    expect(h.undo(world)).toEqual([{...scripted, user: 'other'}]);
  });

  it('undoes a whole drag as one step', () => {
    const h = createUndoHistory();
    h.startStep();
    let world = edit(h, {}, 0, 0, 'g');
    h.startStep();
    world = edit(h, world, 1, 0, 's');
    world = edit(h, world, 2, 0, 's');
    expect(h.undo(world)).toEqual([del(1, 0), del(2, 0)]);
    world = apply(world, [del(1, 0), del(2, 0)]);
    expect(h.undo(world)).toEqual([del(0, 0)]);
    expect(h.undo({})).toBeUndefined();
  });

  it('puts a tile changed twice in one step back to how it was first', () => {
    const h = createUndoHistory();
    h.startStep();
    let world = edit(h, {'0_0': tile(0, 0, 'g')}, 0, 0, '_delete');
    world = edit(h, world, 0, 0, 's');
    expect(h.undo(world)).toEqual([tile(0, 0, 'g')]);
  });

  it('leaves tiles someone else changed since, and skips steps that are all theirs', () => {
    const h = createUndoHistory();
    h.startStep();
    let world = edit(h, {}, 0, 0, 'g');
    h.startStep();
    world = edit(h, world, 1, 0, 'g');
    world = edit(h, world, 2, 0, 'g');
    world['1_0'] = tile(1, 0, 'm', {user: 'other'}); // another editor
    expect(h.undo(world)).toEqual([del(2, 0)]);

    world = apply(world, [del(2, 0)]);
    world['0_0'] = tile(0, 0, 'm', {user: 'other'});
    expect(h.undo(world)).toBeUndefined();
  });

  it('ignores user and tstamp when checking for changes', () => {
    const h = createUndoHistory();
    h.startStep();
    const world = edit(h, {}, 0, 0, 'g');
    expect(world['0_0'].user).toBe('me');
    expect(h.undo(world)).toEqual([del(0, 0)]);
  });

  it('clears redo after a new edit', () => {
    const h = createUndoHistory();
    h.startStep();
    let world = edit(h, {}, 0, 0, 'g');
    h.undo(world);
    world = {};
    h.startStep();
    world = edit(h, world, 5, 5, 's');
    expect(h.redo(world)).toBeUndefined();
  });

  it('starts a new step after undoing, even without a mousedown', () => {
    const h = createUndoHistory();
    h.startStep();
    let world = edit(h, {}, 0, 0, 'g');
    world = edit(h, world, 1, 0, 'g');
    expect(h.undo(world)).toEqual([del(0, 0), del(1, 0)]);
    world = edit(h, {}, 3, 0, 'g');
    expect(h.undo(world)).toEqual([del(3, 0)]);
  });
});
