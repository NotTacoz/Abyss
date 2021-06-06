/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import $ from "jquery";
import { Helmet } from "react-helmet";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { useGetData } from "../hooks/useGetData";

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();
const db = firebase.firestore();

const FireStoreData = () => {
  const [documents] = useGetData();
};

function Account() {
  const [user] = useAuthState(auth);

  const userInfo = () => {
    if (auth.currentUser != null) {
      db.doc("users/" + auth.currentUser.uid).get()
        .then(
          //console.log("Value successfully written!");
          (doc) => {
            if (doc.exists) {
              // do nothing :)
            }else {
              db.doc("takenUsernames/" + auth.currentUser.displayName.split(" ").join("")).get()
              .then(
                (doc) => {
                  if (doc.exists) {
                    var randomNumGen = ("0123456789"[Math.floor(Math.random() * 15)])
                    db.doc("users/" + auth.currentUser.uid)
                    .set({
                      displayName: auth.currentUser.displayName,
                      username: (auth.currentUser.displayName.split(" ").join("")+randomNumGen),
                      email: auth.currentUser.email,
                      photoUrl: auth.currentUser.photoURL,
                      emailVerified: auth.currentUser.emailVerified,
                      userid: auth.currentUser.uid,
                      time: new Date(),
                    })
                    db.doc("takenUsernames/" + auth.currentUser.displayName.split(" ").join("")+randomNumGen).set({
                      username: (auth.currentUser.displayName.split(" ").join("")+randomNumGen),
                    })
                  }else {
                    db.doc("users/" + auth.currentUser.uid)
                    .set({
                      displayName: auth.currentUser.displayName,
                      username: auth.currentUser.displayName.split(" ").join(""),
                      email: auth.currentUser.email,
                      photoUrl: auth.currentUser.photoURL,
                      emailVerified: auth.currentUser.emailVerified,
                      userid: auth.currentUser.uid,
                      time: new Date(),
                    })
                    db.doc("takenUsernames/" + auth.currentUser.displayName.split(" ").join("")).set({
                      username: (auth.currentUser.displayName.split(" ").join("")),
                    })
                  }
                })
                .then(function () {
                  //console.log("Value successfully written!");
                })
                .catch(function (error) {
                  console.error("Error writing Value: ", error);
                });
            }
          }
        )
        .catch(function (error) {
          console.error("Error writing Value: ", error);
        });
    }
  };
  userInfo();

  return (
    <div className="content">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Abyss | Account</title>
      </Helmet>

      <section>{user ? <Timeline /> : <SignIn />}</section>
    </div>
  );
}

function makeId(length) {
  let result = [];
  for (let i = 0; i < length; i++) {
    result.push("0123456789"[Math.floor(Math.random() * 10)]);
  }
  return result.join("");
}

function Timeline() {
  const [value, setValue] = React.useState("");
  const getValue = (event) => {
    setValue(event.target.value);
  };

  const addValue = () => {
    setValue("")
    db.doc("values/" + makeId(10))
      .set({
        value: value,
        user: auth.currentUser.uid,
        time: new Date(),
      })
      .then(function () {
        //console.log("Value successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing Value: ", error);
      });
  };

  const updateValue = (documetEdit, valueEdit, editValue) => {
    db.collection("users")
      .doc(documetEdit)
      .update({
        [valueEdit]: editValue,
      })
      .then(function () {
        console.log("Document successfully updated!");
      })
      .catch(function (error) {
        console.error("Error updating document: ", error);
      });
  };

  // updateValue(auth.currentUser.uid, "username", "poggers")

  const [documents] = useGetData();

  return (
    <div className="">
      Account settings
      <br />
      <button className="button special" onClick={SignOutBtn}>
        Sign out
      </button>
    </div>
  );
}

function SignIn() {
  return (
    <div>
      <h2>You need to be signed in to access the rest of the web page!</h2>
      <br />
      <button className="button special" onClick={SignInBtn}>
        Sign in
      </button>
    </div>
  );
}

function SignInBtn() {
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(googleAuthProvider);
}

function SignOutBtn() {
  firebase.auth().signOut();
}

export default Account;
