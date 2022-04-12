// import {initializeApp} from 'firebase/app';
// import {getFirestore, collection, getDocs} from 'firebase/firestore/lite';
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: 'AIzaSyBEserPzSUos4MT3XRO8NKAO2oVk1-LS-I',
//   authDomain: 'mortal-wombat-8c76a.firebaseapp.com',
//   projectId: 'mortal-wombat-8c76a',
//   storageBucket: 'mortal-wombat-8c76a.appspot.com',
//   messagingSenderId: '929181149015',
//   appId: '1:929181149015:web:33a7f450bcdbb06ae64012',
//   measurementId: 'G-JL6HCMYYBS',
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// export const getThings = async () => {
//   const thingsCol = collection(db, 'things');
//   return (await getDocs(thingsCol)).docs.map((doc) => doc.data());
// };
