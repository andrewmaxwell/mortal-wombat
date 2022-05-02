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

const cullCursors = (cursors, onError) => {
  const culledCursors = {};
  const latestTimestamp = getLatestTimestamp(cursors);
  for (const key in cursors) {
    if (latestTimestamp - cursors[key].tstamp > sessionTimeOut) {
      culledCursors['cursors/' + key] = null;
    }
  }
  update(culledCursors, onError);
};

export const useCursors = (onError) => {
  const [cursors, setCursors] = useState({});
  useEffect(() => listen('cursors', setCursors, onError), []);

  useEffect(() => {
    if (Math.random() < 0.01) {
      cullCursors(cursors, onError);
    }
  }, [cursors]);
  return cursors;
};

export const setCursor = throttle(
  (user, mouseX, mouseY, xCoord, yCoord, scale, onError) =>
    update(
      {
        [`cursors/${sessionId}`]: {
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
      onError
    ),
  500
);
