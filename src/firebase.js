import {initializeApp} from 'firebase/app';
import {
  ref,
  getDatabase,
  update as _update,
  onValue,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
  get,
  child,
  onDisconnect,
} from 'firebase/database';

initializeApp({
  apiKey: 'AIzaSyBEserPzSUos4MT3XRO8NKAO2oVk1-LS-I',
  authDomain: 'mortal-wombat-8c76a.firebaseapp.com',
  projectId: 'mortal-wombat-8c76a',
  storageBucket: 'mortal-wombat-8c76a.appspot.com',
  messagingSenderId: '929181149015',
  appId: '1:929181149015:web:33a7f450bcdbb06ae64012',
  measurementId: 'G-JL6HCMYYBS',
});

/*
Data:
https://console.firebase.google.com/project/mortal-wombat-8c76a/database/mortal-wombat-8c76a-default-rtdb/data
Data Docs: https://firebase.google.com/docs/database/web/read-and-write?hl=en&authuser=0
List Docs: https://firebase.google.com/docs/database/web/lists-of-data?hl=en&authuser=0

Auth lives in auth.js so the game (which never logs in) doesn't start Firebase Auth.
*/

const db = getDatabase();
const dbRef = ref(db);

export const defaultWorldId = 'l5ybd0mu:2x3xfrsom4h';

// {path1: val1, path2: val2}
export const update = (updates, onError) => {
  const handleError = (e) => {
    console.error(e);
    onError?.(e.message);
  };
  try {
    // console.log('updates', updates);
    // write failures (e.g. permission denied) arrive as a rejected promise
    return _update(dbRef, updates).catch(handleError);
  } catch (e) {
    handleError(e);
  }
};

if (location.host === 'localhost:3000') {
  window._update = async (x) => await _update(dbRef, x);
}

// deletes pathStr on the server when this client disconnects (tab closed, network lost)
export const removeOnDisconnect = (pathStr, onError) =>
  onDisconnect(ref(db, pathStr))
    .remove()
    .catch((e) => {
      console.error(e);
      onError?.(e.message);
    });

export const loadItem = async (key) => (await get(child(dbRef, key))).val();

export const listen = (pathStr, onChange, onError) => {
  const handleError = (e) => {
    console.error(e);
    onError?.(e.message);
  };
  try {
    // returns an unsubscribe for just this listener (off(ref) would remove all of them)
    return onValue(
      ref(db, pathStr),
      (snapshot) => onChange(snapshot.val() || {}),
      handleError,
    );
  } catch (e) {
    handleError(e);
  }
};

// Like listen, but for a node with many children (a world's tiles): calls onChanges with
// {key: value} for the children that were added or changed, and {key: null} for removed ones.
// Changes that arrive together (all of them on the first load) come in one call.
export const listenChildren = (pathStr, onChanges, onError) => {
  const nodeRef = ref(db, pathStr);
  let pending;
  const queue = (key, val) => {
    if (!pending) {
      pending = {};
      queueMicrotask(() => {
        const changes = pending;
        pending = undefined;
        onChanges(changes);
      });
    }
    pending[key] = val;
  };
  let failed = false;
  const handleError = (e) => {
    if (failed) return; // each of the three listeners reports the same error
    failed = true;
    console.error(e);
    onError?.(e.message);
  };
  const unsubscribes = [
    onChildAdded(nodeRef, (s) => queue(s.key, s.val()), handleError),
    onChildChanged(nodeRef, (s) => queue(s.key, s.val()), handleError),
    onChildRemoved(nodeRef, (s) => queue(s.key, null), handleError),
  ];
  return () => {
    for (const unsubscribe of unsubscribes) unsubscribe();
    pending = {}; // drop changes queued before unsubscribing
  };
};
