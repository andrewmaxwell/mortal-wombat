import {getAuth} from 'firebase/auth';
import {serverTimestamp} from 'firebase/database';
import {update} from '../firebase';

export const saveTile = (worldId, tile, onError) => {
  const user = getAuth().currentUser.email;
  const tstamp = serverTimestamp();
  return update(
    {
      [`worlds/${worldId}/world/${tile.x}_${tile.y}`]:
        tile.tileType === '_delete' ? null : {...tile, user, tstamp},
      [`worlds/${worldId}/lastEdited`]: tstamp,
      [`worlds/${worldId}/lastEditedBy`]: user,
    },
    onError
  );
};
