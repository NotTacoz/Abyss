/* eslint-disable @typescript-eslint/no-unused-vars */

import React from "react";

import firebase from "firebase/app";
import { Route, Link, useParams } from "react-router-dom";

import $ from "jquery";
import { Helmet } from "react-helmet";

import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

import toast, { Toaster } from "react-hot-toast";

import { useGetData } from "../hooks/useGetData";
import { UserGetData } from "../hooks/UserGetData";
// import { userInfo } from "os";

import Heart from "./../../img/msg/heart.png";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const config = {
  apiKey: "AIzaSyBWqu0h99Z4YJsebWVMw_m7-jA114FLSts",
  authDomain: "abyss-media.firebaseapp.com",
  databaseURL:
    "https://abyss-media-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "abyss-media",
  storageBucket: "abyss-media.appspot.com",
  messagingSenderId: "639511696146",
  appId: "1:639511696146:web:0687af67648ea8c77819cb",
  measurementId: "G-QKQMM7JYHV",
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();
const db = firebase.firestore();

const FireStoreData = () => {
  const [documents] = useGetData();
  const [userInfo] = UserGetData();
};

function Users() {
  const [user] = useAuthState(auth);

  return (
    <div className="content">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Abyss | Home</title>
      </Helmet>

      <section>{user ? <Content /> : <SignIn />}</section>
    </div>
  );
}

function makeId(length: number) {
  let result = [];
  for (let i = 0; i < length; i++) {
    result.push("0123456789"[Math.floor(Math.random() * 10)]);
  }
  return result.join("");
}

function toTime(date) {
  let timestamp = date?.toDate();
  let currentDate = new Date();
  if (
    timestamp.getDate() === currentDate.getDate() &&
    timestamp.getDay === currentDate.getDay
  ) {
    return `Today at ${
      timestamp.getHours() % 12 === 0 ? 12 : timestamp.getHours() % 12
    }:${timestamp?.getMinutes().toString().padStart(2, "0")} ${
      timestamp?.getHours() > 11 ? "PM" : "AM"
    }`;
  } else {
    return `${timestamp?.getDate()} ${
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
      ][timestamp?.getMonth()]
    } ${timestamp?.getFullYear()}`;
  }
}

function toExactTime(date: { toDate: () => any }) {
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

function Content() {
  const uid = useParams<{ userid: string }>()["userid"];
  const [value, setValue] = React.useState("");

  const getValue = (event: any) => {
    setValue(event.target.value);
  };

  // console.log(uid);

  var randomnum = Math.floor(Math.random() * 7);
  var placeholdertext = "Write something here!";
  if (randomnum === 0) {
  } else if (randomnum === 1) {
    placeholdertext = "What's happening?";
  } else if (randomnum === 2) {
    placeholdertext = "Hello World!";
  } else if (randomnum === 3) {
    placeholdertext = "Twitter looks different today...";
  }

  const [userInfo] = UserGetData();
  const [documents] = useGetData();

  var i;
  if (userInfo !== undefined) {
    for (i = 0; i in userInfo; i++) {
      if (userInfo[i]["id"] === uid) {
        var SessionUserData = userInfo[i]["value"];
      }
    }
  }

  function getUserName(fuid: any) {
    if (userInfo !== undefined) {
      for (i = 0; i in userInfo; i++) {
        if (userInfo[i]["id"] === fuid) {
          // console.log(userInfo[i].value)
          return userInfo[i]["value"]["username"];
        }
      }
    }
  }
  function getDisplayName(fuid: any) {
    if (userInfo !== undefined) {
      for (i = 0; i in userInfo; i++) {
        if (userInfo[i]["id"] === fuid) {
          // console.log(userInfo[i].value)
          return userInfo[i]["value"]["displayName"];
        }
      }
    }
  }
  function getProfilePic(fuid: any) {
    if (userInfo !== undefined) {
      for (i = 0; i in userInfo; i++) {
        if (userInfo[i]["id"] === fuid) {
          // console.log(userInfo[i].value)
          return userInfo[i]["value"]["photoUrl"];
        }
      }
    }
  }

  function toTime(date) {
    let timestamp = date?.toDate();
    let currentDate = new Date();
    if (
      timestamp.getDate() === currentDate.getDate() &&
      timestamp.getDay === currentDate.getDay
    ) {
      return `Today at ${
        timestamp.getHours() % 12 === 0 ? 12 : timestamp.getHours() % 12
      }:${timestamp?.getMinutes().toString().padStart(2, "0")} ${
        timestamp?.getHours() > 11 ? "PM" : "AM"
      }`;
    } else {
      return `${timestamp?.getDate()} ${
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
        ][timestamp?.getMonth()]
      } ${timestamp?.getFullYear()}`;
    }
  }

  return (
    <div>
      <div>
        <img
          className="profileWallpaper rounded-lg object-cover w-1/2 h-52"
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.wallpapers13.com%2Fwp-content%2Fuploads%2F2016%2F04%2FLandscape-Water-House-LofotenMorningMoskenesoya-HD-Desktop-Wallpaper.jpg&f=1&nofb=1"
          alt=""
        />
        <img
          className="w-36 ml-2 -mt-12 rounded-full"
          src={getProfilePic(uid)}
          alt="pfp"
        />
        <h2 className="ml-3">{getDisplayName(uid)}</h2>
        <span className="ml-3 opacity-70">@{getUserName(uid)}</span>
      </div>
    </div>
  );
}

function SignIn() {
  window.location.href = "/account";
  return <div></div>;
}

export default Users;
