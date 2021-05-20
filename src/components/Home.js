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

import config from "../firebase"

firebase.initializeApp(config);

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
  return (
    <div>
      Actual Timeline content
      <a
        className="button special"
        onClick={() => {
          testbtn();
        }}
      >
        Special
      </a>
    </div>
  );
}

function SignIn() {
  window.location.href = "/account";
}

function testbtn() {
  console.log("your mum");
}

export default Home;
