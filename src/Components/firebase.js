import firebase from "firebase";

var firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: "chess-2ecc5.firebaseapp.com",
    projectId: "chess-2ecc5",
    storageBucket: "chess-2ecc5.appspot.com",
    messagingSenderId: "733439324702",
    appId: "1:733439324702:web:0855067db2192060e7740f"
  };
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
export default db;
