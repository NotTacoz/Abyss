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

import config from "../firebase";
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

function toTime(date) {
  let timestamp = date.toDate();
  return `${timestamp.getDate()} ${
    [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ][timestamp.getMonth()]
  } ${timestamp.getFullYear()} ${
    timestamp.getHours() % 12 === 0 ? 12 : timestamp.getHours() % 12
  }:${timestamp.getMinutes().toString().padStart(2, "0")} ${
    timestamp.getHours() > 11 ? "PM" : "AM"
  }`;
}

function Timeline() {
  const [value, setValue] = React.useState("");
  const getValue = (event) => {
    setValue(event.target.value);
  };

  const userInfo = () => {
    if (auth.currentUser != null) {
      db.doc("users/" + auth.currentUser.uid)
        .set({
          username: auth.currentUser.displayName,
          email: auth.currentUser.email,
          photoUrl: auth.currentUser.photoURL,
          emailVerified: auth.currentUser.emailVerified,
          userid: auth.currentUser.uid,
          time: new Date(),
        })
        .then(function () {
          //console.log("Value successfully written!");
        })
        .catch(function (error) {
          console.error("Error writing Value: ", error);
        });
    }
  };
  userInfo();
  const addValue = () => {
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
  const [documents] = useGetData();

  return (
    <div className="">
      Account settings
      <br />
      <button className="button special" onClick={SignOutBtn}>
        Sign out 😯
      </button>
    </div>
  );
}

function SignIn() {
  return (
    <div>
      <h2>😨You need to be signed in to access the rest of the web page!😔</h2>
      <br />
      <button className="button special" onClick={SignInBtn}>
        Sign in 🔒
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
