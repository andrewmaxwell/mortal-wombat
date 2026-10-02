import {scriptParams, wrapScript} from '../scriptTemplate';

// Compiles a tile script into a function of game. Syntax errors, and errors the script throws
// (including in its choice and setTimeout callbacks), go to onError instead of stopping the game.
// The script runs with `this` set to the tile it belongs to (see runOnTouch and Game.interact),
// so these wrappers are regular functions that pass `this` through.
export const compile = (str, onError) => {
  if (!str) return;
  const guard = (f) =>
    function (...args) {
      try {
        return f.apply(this, args);
      } catch (e) {
        onError(e);
      }
    };
  try {
    const run = new Function(...scriptParams, wrapScript(str));
    return guard(function (game) {
      return run.call(this, game, guard);
    });
  } catch (e) {
    onError(e);
  }
};

const TOUCH_GRACE_FRAMES = 2; // frames without contact before onTouch can fire again

// Runs a block's onTouch script when the wombat starts touching it, not on every frame
// of contact. Short gaps (a frame or two of bouncing off) still count as the same contact.
export const runOnTouch = (game, block) => {
  if (!block.onTouch) return;
  const isNewContact = !(
    game.frame - block.lastTouchFrame <=
    TOUCH_GRACE_FRAMES
  );
  block.lastTouchFrame = game.frame;
  if (isNewContact) block.onTouch(game);
};
