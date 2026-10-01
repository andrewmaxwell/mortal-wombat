import {getAuth} from 'firebase/auth';
import {serverTimestamp} from 'firebase/database';
import {update} from '../firebase';
import {markEdited, worldIndexPath} from './worldIndex';

// saves several tiles in one update; a tile with tileType '_delete' is removed
export const saveTiles = (worldId, tiles, onError) => {
  const user = getAuth().currentUser.uid;
  const tstamp = serverTimestamp();
  markEdited(worldId);
  const updates = {
    [`worlds/${worldId}/lastEdited`]: tstamp,
    [`worlds/${worldId}/lastEditedBy`]: user,
    [`${worldIndexPath(worldId)}/lastEdited`]: tstamp,
    [`${worldIndexPath(worldId)}/lastEditedBy`]: user,
  };
  for (const tile of tiles) {
    updates[`worlds/${worldId}/world/${tile.x}_${tile.y}`] =
      tile.tileType === '_delete' ? null : {...tile, user, tstamp};
  }
  return update(updates, onError);
};

export const saveTile = (worldId, tile, onError) =>
  saveTiles(worldId, [tile], onError);
