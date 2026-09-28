import {serverTimestamp} from 'firebase/database';
import {useEffect, useState} from 'react';
import {isLoggedIn} from '../auth';
import {listen, removeOnDisconnect, update} from '../firebase';
import {guid, throttle} from '../utils';

export const sessionTimeOut = 15 * 1000;
export const sessionId = guid();

export const getLatestTimestamp = (cursors) => {
  let latestTimestamp = 0;
  for (const key in cursors) {
    latestTimestamp = Math.max(latestTimestamp, cursors[key].tstamp);
  }
  return latestTimestamp;
};

export const useCursors = (onError, worldId, user) => {
  const [cursors, setCursors] = useState({});
  useEffect(() => {
    if (worldId) {
      return listen(`worlds/${worldId}/cursors`, setCursors, onError);
    }
  }, [worldId]);

  // remove this session's cursor when it leaves the world or disconnects
  useEffect(() => {
    if (!user || !worldId) return;
    const path = `worlds/${worldId}/cursors/${sessionId}`;
    removeOnDisconnect(path, onError);
    return () => {
      // after logging out the write would be denied, so leave it to removeOnDisconnect
      if (isLoggedIn()) update({[path]: null}, onError);
    };
  }, [user, worldId]);

  return cursors;
};

export const setCursor = throttle(
  (user, mouseX, mouseY, worldId, xCoord, yCoord, scale, onError) => {
    if (worldId) {
      update(
        {
          [`worlds/${worldId}/cursors/${sessionId}`]: {
            user: user.uid,
            mouseX,
            mouseY,
            left: xCoord - innerWidth / scale / 2,
            top: yCoord - innerHeight / scale / 2,
            width: innerWidth / scale,
            height: innerHeight / scale,
            tstamp: serverTimestamp(),
          },
        },
        onError,
      );
    }
  },
  500,
);
