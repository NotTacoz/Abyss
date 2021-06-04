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
import { UserGetData } from "../hooks/UserGetData";
import { userInfo } from "os";

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();
const db = firebase.firestore();

const FireStoreData = () => {
  const [documents] = useGetData();
  const [userInfo] = UserGetData();
};

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

  // db.doc("users/" + auth.currentUser.uid)
  //   .get()
  //   .then((doc) => {
  //     if (doc.exists) {
  //       // userInfo data collect
  //       const userInfo = doc.data();
  //       // console.log(userInfo);
  //       // console.log(userInfo.email);
  //     } else {
  //       console.log("No such document!");
  //     }
  //   })
  //   .catch((error) => {
  //     console.log("Error getting document:", error);
  //   });

  const uid = auth.currentUser.uid;

  const [userInfo] = UserGetData();
  const [documents] = useGetData();

  var i;
  if (userInfo !== undefined) {
    for (i = 0; i in userInfo; i++) {
      if (userInfo[i].id === uid) {
        const SessionUserData = userInfo[i].value;
        console.log(SessionUserData);
      }
    }
  }


  return (
    <div className="">
      <div>
        {documents.map((documents) => (
          <div key={documents.id}>
            <div>
              Document: {documents.id} Value: {documents.value.value}
            </div>
          </div>
        ))}
      </div>
      {/* mockup */}
      <div className="absolute w-96 max-w-sm">
        <div className="grid">
          <div className="flex">
            <img
              className="w-12 mt-1 rounded-full"
              src="https://pbs.twimg.com/profile_images/1312578814971576328/ul3_sosR_400x400.png"
              alt="pfpBob"
            />
            <span className="pl-3 font-bold">
              Tacoz <span className="font-light opacity-70">@Awesome · 2h</span>
            </span>
          </div>
          <span className="ml-16 -mt-6 mb-2">
            COME ON AUSTRALIA WE ALMOST AT 0!!!!!!!!!!!!!
          </span>
          <img
            draggable="true"
            alt="ExamplePicture"
            src="https://pbs.twimg.com/media/E28O61HUYAEtfbf?format=jpg&name=4096x4096"
            className="rounded-3xl max-w-sm ml-16"
          />
        </div>
      </div>
    </div>
  );
}

function SignIn() {
  window.location.href = "/account";
}

export default Home;
