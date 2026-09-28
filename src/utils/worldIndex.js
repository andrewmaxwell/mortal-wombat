import {useEffect, useRef} from 'react';
import {defaultTileTypes} from '../defaults';
import {update} from '../firebase';
import {mergeDeepLeft} from './mergeDeepLeft';
import {worldToCanvas} from './worldToCanvas';

// worldIndex/<worldId> = {worldName, lastEdited, lastEditedBy, thumbnail}
// A small summary of each world, so the Worlds pane doesn't download every tile.
export const worldIndexPath = (worldId) => `worldIndex/${worldId}`;

const THUMBNAIL_WIDTH = 300; // matches .canvasContainer in myWorlds.css
const THUMBNAIL_HEIGHT = 200;
const THUMBNAIL_INTERVAL_MS = 5000;

// returns a PNG data URL, or undefined for a world with no tiles
export const renderThumbnail = (world, tileTypes) => {
  const canvas = worldToCanvas(
    world,
    // loadItem returns null for a world with no tile type overrides
    mergeDeepLeft(tileTypes ?? undefined, defaultTileTypes),
    undefined,
    {maxWidth: THUMBNAIL_WIDTH, maxHeight: THUMBNAIL_HEIGHT},
  );
  return canvas.width ? canvas.toDataURL('image/png') : undefined;
};

export const saveThumbnail = (worldId, world, tileTypes, onError) => {
  const thumbnail = renderThumbnail(world, tileTypes);
  if (thumbnail) {
    update({[`${worldIndexPath(worldId)}/thumbnail`]: thumbnail}, onError);
  }
};

const editedWorlds = new Set();

// call after this editor changes a world's tiles or tile types
export const markEdited = (worldId) => editedWorlds.add(worldId);

// Re-renders the thumbnail at most every few seconds while this editor is making changes,
// and once more when leaving the world.
export const useWorldThumbnail = (worldId, world, tileTypes, onError) => {
  const latest = useRef();
  latest.current = {world, tileTypes, onError};

  useEffect(() => {
    if (!worldId) return;
    const flush = () => {
      if (!editedWorlds.delete(worldId)) return;
      const {world, tileTypes, onError} = latest.current;
      saveThumbnail(worldId, world, tileTypes, onError);
    };
    const timer = setInterval(flush, THUMBNAIL_INTERVAL_MS);
    return () => {
      clearInterval(timer);
      flush();
    };
  }, [worldId]);
};
