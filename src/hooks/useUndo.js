import {useEffect, useMemo, useRef} from 'react';
import {createUndoHistory} from '../utils/undoHistory';
import {saveTiles} from '../utils/saveTile';

const isTyping = (target) =>
  target.closest?.('input, textarea, select, [contenteditable]');

// Ctrl/Cmd+Z undoes the last click or drag on the map, and Ctrl/Cmd+Shift+Z or Ctrl+Y redoes it.
// The history starts over in each world.
export const useUndo = (worldId, world, onError) => {
  const history = useMemo(() => createUndoHistory(), [worldId]);
  const latest = useRef();
  latest.current = {world, onError};

  useEffect(() => {
    const onKeyDown = (e) => {
      if (!(e.metaKey || e.ctrlKey) || e.altKey || isTyping(e.target)) return;
      const key = e.key.toLowerCase();
      const isUndo = key === 'z' && !e.shiftKey;
      const isRedo = (key === 'z' && e.shiftKey) || (key === 'y' && e.ctrlKey);
      if (!isUndo && !isRedo) return;
      e.preventDefault();
      const {world, onError} = latest.current;
      const tiles = isUndo ? history.undo(world) : history.redo(world);
      if (tiles) saveTiles(worldId, tiles, onError);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [history]);

  return history;
};
