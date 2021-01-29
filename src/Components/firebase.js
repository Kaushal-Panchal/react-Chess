import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyC_YW-uLtL_RXG2Yuj8le2tNj0loDOIQF0",
    authDomain: "multiplayer-chess-301b6.firebaseapp.com",
    projectId: "multiplayer-chess-301b6",
    storageBucket: "multiplayer-chess-301b6.appspot.com",
    messagingSenderId: "788667624867",
    appId: "1:788667624867:web:e86d596e605ae07d15be16"
  };
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
export default db;
