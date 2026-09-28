import {useEffect, useState} from 'react';
import {listen} from '../firebase';

// /users is keyed by Firebase Auth uid: {[uid]: {name, email}}.
// Tiles, worlds and cursors store the editor's uid, never their email (worlds/ is public).
export const editorName = (userIndex, uid) =>
  userIndex[uid]?.name || 'Unknown editor';

export const useUserIndex = (user, onError) => {
  const [userIndex, setUserIndex] = useState({});
  useEffect(() => {
    // security rules only allow signed-in users to read /users
    if (user) return listen('users', setUserIndex, onError);
  }, [user]);
  return userIndex;
};
