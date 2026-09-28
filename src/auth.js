import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import './firebase'; // initializes the Firebase app

/*
Editor-only. Accounts are created in the Firebase console (self sign-up is disabled):
https://console.firebase.google.com/project/mortal-wombat-8c76a/authentication/users
User Docs: https://firebase.google.com/docs/auth/web/manage-users
*/

const auth = getAuth();

export const logIn = (email, pwd) =>
  signInWithEmailAndPassword(auth, email, pwd);

export const listenUser = (onChange) => onAuthStateChanged(auth, onChange);

export const logOut = () => signOut(auth);
