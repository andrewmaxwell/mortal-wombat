// Undo/redo for tiles placed and deleted on the map. Each step is one click or drag, and holds
// each tile it changed as it was before and after (undefined for no tile). A tile someone else
// has changed since is left alone, so undo never overwrites another editor's work.

const MAX_STEPS = 200;

const sameTile = (a, b) =>
  !a || !b
    ? !a && !b
    : a.tileType === b.tileType &&
      (a.name ?? '') === (b.name ?? '') &&
      (a.onSpace ?? '') === (b.onSpace ?? '') &&
      (a.onTouch ?? '') === (b.onTouch ?? '');

// the tiles to save to change each tile in step from one state to another, where world
// still has it as `from`
const revert = (step, world, from, to) =>
  Object.values(step)
    .filter((edit) => sameTile(world[`${edit.x}_${edit.y}`], edit[from]))
    .map(({x, y, [to]: tile}) => tile ?? {x, y, tileType: '_delete'});

export const createUndoHistory = () => {
  let undoStack = [];
  let redoStack = [];
  let startNewStep = true;

  return {
    // the next edit begins a new step (call on mousedown)
    startStep() {
      startNewStep = true;
    },
    record({x, y, before, after}) {
      if (startNewStep || !undoStack.length) {
        undoStack.push({});
        if (undoStack.length > MAX_STEPS) undoStack.shift();
        startNewStep = false;
      }
      const step = undoStack.at(-1);
      const key = `${x}_${y}`;
      // a tile changed twice in one step goes back to how it was before the first change
      step[key] = {
        x,
        y,
        before: step[key] ? step[key].before : before,
        after,
      };
      redoStack = [];
    },
    // returns the tiles to save, or undefined if there's nothing to undo
    undo(world) {
      startNewStep = true;
      while (undoStack.length) {
        const step = undoStack.pop();
        const tiles = revert(step, world, 'after', 'before');
        if (tiles.length) {
          redoStack.push(step);
          return tiles;
        }
        // every tile in this step was changed by someone else since, so skip it
      }
    },
    redo(world) {
      startNewStep = true;
      while (redoStack.length) {
        const step = redoStack.pop();
        const tiles = revert(step, world, 'before', 'after');
        if (tiles.length) {
          undoStack.push(step);
          return tiles;
        }
      }
    },
  };
};
