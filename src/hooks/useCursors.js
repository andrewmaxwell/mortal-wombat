import {serverTimestamp} from 'firebase/database';
import {useEffect, useState} from 'react';
import {listen, update} from '../firebase';
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

const cullCursors = (cursors, worldId, onError) => {
  const culledCursors = {};
  const latestTimestamp = getLatestTimestamp(cursors);
  for (const key in cursors) {
    if (latestTimestamp - cursors[key].tstamp > sessionTimeOut) {
      culledCursors[`worlds/${worldId}/cursors/${key}`] = null;
    }
  }
  update(culledCursors, onError);
};

export const useCursors = (onError, worldId) => {
  const [cursors, setCursors] = useState({});
  useEffect(() => {
    if (worldId) {
      return listen(`worlds/${worldId}/cursors`, setCursors, onError);
    }
  }, [worldId]);

  useEffect(() => {
    if (Math.random() < 0.01) {
      cullCursors(cursors, worldId, onError);
    }
  }, [cursors, worldId]);
  return cursors;
};

export const setCursor = throttle(
  (user, mouseX, mouseY, worldId, xCoord, yCoord, scale, onError) => {
    if (worldId) {
      update(
        {
          [`worlds/${worldId}/cursors/${sessionId}`]: {
            user: user.email,
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
