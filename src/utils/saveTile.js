import {getAuth} from 'firebase/auth';
import {serverTimestamp} from 'firebase/database';
import {update} from '../firebase';
import {markEdited, worldIndexPath} from './worldIndex';

export const saveTile = (worldId, tile, onError) => {
  const user = getAuth().currentUser.uid;
  const tstamp = serverTimestamp();
  markEdited(worldId);
  return update(
    {
      [`worlds/${worldId}/world/${tile.x}_${tile.y}`]:
        tile.tileType === '_delete' ? null : {...tile, user, tstamp},
      [`worlds/${worldId}/lastEdited`]: tstamp,
      [`worlds/${worldId}/lastEditedBy`]: user,
      [`${worldIndexPath(worldId)}/lastEdited`]: tstamp,
      [`${worldIndexPath(worldId)}/lastEditedBy`]: user,
    },
    onError,
  );
};
