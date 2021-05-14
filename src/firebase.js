import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCOETJBWJQ8dNQnJilsND5CoT79GBHKZUs",
  authDomain: "genshin-mains.firebaseapp.com",
  databaseURL: "https://genshin-mains-default-rtdb.firebaseio.com",
  projectId: "genshin-mains",
  storageBucket: "genshin-mains.appspot.com",
  messagingSenderId: "82953203784",
  appId: "1:82953203784:web:b825c166d63766c475287d",
  measurementId: "G-00DBVS0PXW",
};

firebase.initializeapp(firebaseConfig);

export default firebase;
