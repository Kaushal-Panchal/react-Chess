import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyCwgUrEcQnMcb98HSKXlSWJIMVVDwfavzw",
  authDomain: "chess-d2080.firebaseapp.com",
  projectId: "chess-d2080",
  storageBucket: "chess-d2080.appspot.com",
  messagingSenderId: "409752314162",
  appId: "1:409752314162:web:42e1f7a43166362b12772b"
  };
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
export default db;
