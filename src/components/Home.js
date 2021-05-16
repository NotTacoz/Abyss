/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
// eslint-disable-next-line no-unused-vars
import $ from "jquery";
import { Helmet } from "react-helmet";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyCOETJBWJQ8dNQnJilsND5CoT79GBHKZUs",
  authDomain: "genshin-mains.firebaseapp.com",
  databaseURL: "https://genshin-mains-default-rtdb.firebaseio.com",
  projectId: "genshin-mains",
  storageBucket: "genshin-mains.appspot.com",
  messagingSenderId: "82953203784",
  appId: "1:82953203784:web:b825c166d63766c475287d",
  measurementId: "G-00DBVS0PXW",
});

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();

function Home() {
  const [user] = useAuthState(auth);

  return (
    <div className="content">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Abyss | Home</title>
      </Helmet>

      <section>{user ? <Timeline /> : <SignIn />}</section>
    </div>
  );
}

function Timeline() {
  return <div>Actual Timeline content</div>;
}

function SignIn() {
  return <div>Visit Account Page to sign in</div>;
}

export default Home;
