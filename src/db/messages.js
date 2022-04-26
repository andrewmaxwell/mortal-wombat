import {serverTimestamp} from 'firebase/database';
import {guid} from '../utils';
import {listen, update} from '../firebase';

export const listenToMessages = (onChange, onError) =>
  listen('messages', onChange, onError);

export const sendMessage = (msg, user, onError) =>
  update(
    {
      [`messages/${guid()}`]: {
        message: msg.trim(),
        user: user.email,
        tstamp: serverTimestamp(),
      },
    },
    onError
  );
