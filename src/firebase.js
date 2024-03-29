import {initializeApp} from 'firebase/app';
import {
  ref,
  getDatabase,
  update as _update,
  onValue,
  off,
  get,
  child,
} from 'firebase/database';
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';

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

Users:
https://console.firebase.google.com/project/mortal-wombat-8c76a/authentication/users
User Docs: https://firebase.google.com/docs/auth/web/manage-users
*/

const db = getDatabase();
const auth = getAuth();
const dbRef = ref(db);

export const defaultWorldId = 'l5ybd0mu:2x3xfrsom4h';

// {path1: val1, path2: val2}
export const update = (updates, onError) => {
  try {
    // console.log('updates', updates);
    return _update(dbRef, updates);
  } catch (e) {
    console.error(e);
    onError(e.message);
  }
};

if (location.host === 'localhost:3000') {
  window._update = async (x) => await _update(dbRef, x);
}

export const loadItem = async (key) => (await get(child(dbRef, key))).val();

export const listen = (pathStr, onChange, onError) => {
  try {
    const r = ref(db, pathStr);
    onValue(r, (snapshot) => onChange(snapshot.val() || {}));
    return () => off(r);
  } catch (e) {
    console.error(e);
    onError(e.message);
  }
};

// export const createUser = async (email, pwd) => {
//   try {
//     const result = await createUserWithEmailAndPassword(auth, email, pwd);
//     return result.user;
//   } catch (e) {
//     console.error(e);
//     return e.message;
//   }
// };

export const logIn = (email, pwd) =>
  signInWithEmailAndPassword(auth, email, pwd);

export const listenUser = (onChange) => onAuthStateChanged(auth, onChange);

export const logOut = () => signOut(auth);
