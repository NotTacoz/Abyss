/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import {
  FirebaseAuthProvider,
  // eslint-disable-next-line no-unused-vars
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseAuthedAnd,
  IfFirebaseUnAuthed,
} from "@react-firebase/auth";
import { FirestoreProvider } from "@react-firebase/firestore";
const config = {
  apiKey: "AIzaSyCOETJBWJQ8dNQnJilsND5CoT79GBHKZUs",
  authDomain: "genshin-mains.firebaseapp.com",
  databaseURL: "https://genshin-mains-default-rtdb.firebaseio.com",
  projectId: "genshin-mains",
  storageBucket: "genshin-mains.appspot.com",
  messagingSenderId: "82953203784",
  appId: "1:82953203784:web:b825c166d63766c475287d",
  measurementId: "G-00DBVS0PXW",
};

function Account() {
  return (
    <div className="content">
      <FirestoreProvider {...config} firebase={firebase}>
        <FirebaseAuthProvider {...config} firebase={firebase}>
          <IfFirebaseUnAuthed>
            <button
              className="button special"
              onClick={() => {
                const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
                firebase.auth().signInWithPopup(googleAuthProvider);
              }}
            >
              Sign In with Google
            </button>
          </IfFirebaseUnAuthed>
          <IfFirebaseAuthed>
            {() => {
              return (
                <div>
                  <p>You are authenticated</p>
                  <button
                    onClick={() => {
                      firebase.auth().signOut();
                    }}
                  >
                    Sign Out
                  </button>
                </div>
              );
            }}
          </IfFirebaseAuthed>
          <IfFirebaseAuthedAnd
            filter={({ providerId }) => providerId !== "anonymous"}
          >
            {({ providerId }) => {
              return <div>You are authenticated with {providerId}</div>;
            }}
          </IfFirebaseAuthedAnd>
        </FirebaseAuthProvider>
      </FirestoreProvider>
    </div>
  );
}

export default Account;
