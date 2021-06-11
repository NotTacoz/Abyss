/* eslint-disable @typescript-eslint/no-unused-vars */

import React from "react";

import firebase from "firebase/app";
import { Route, Link } from "react-router-dom";

import $ from "jquery";
import { Helmet } from "react-helmet";

import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { useGetData } from "../hooks/useGetData";
import { UserGetData } from "../hooks/UserGetData";
// import { userInfo } from "os";

export const config = {
  apiKey: "AIzaSyCOETJBWJQ8dNQnJilsND5CoT79GBHKZUs",
  authDomain: "genshin-mains.firebaseapp.com",
  databaseURL: "https://genshin-mains-default-rtdb.firebaseio.com",
  projectId: "genshin-mains",
  storageBucket: "genshin-mains.appspot.com",
  messagingSenderId: "82953203784",
  appId: "1:82953203784:web:b825c166d63766c475287d",
  measurementId: "G-00DBVS0PXW",
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

function makeId(length: number) {
  let result = [];
  for (let i = 0; i < length; i++) {
    result.push("0123456789"[Math.floor(Math.random() * 10)]);
  }
  return result.join("");
}

function toTime(date: { toDate: () => any; }) {
  let timestamp = date.toDate();
  let currentDate = new Date();
  if (
    timestamp.getDate() === currentDate.getDate() &&
    timestamp.getDay === currentDate.getDay
  ) {
    return `Today at ${
      timestamp.getHours() % 12 === 0 ? 12 : timestamp.getHours() % 12
    }:${timestamp.getMinutes().toString().padStart(2, "0")} ${
      timestamp.getHours() > 11 ? "PM" : "AM"
    }`;
  } else {
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
    } ${timestamp.getFullYear()}`;
  }
}

function toExactTime(date: { toDate: () => any; }) {
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
  const getValue = (event:any) => {
    setValue(event.target.value);
  };

  const addValue = () => {
    db.doc("values/" + makeId(10))
      .set({
        value: value,
        user: auth.currentUser?.uid,
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

  const uid = auth.currentUser?.uid;

  const [userInfo] = UserGetData();
  const [documents] = useGetData();

  var i;
  if (userInfo !== undefined) {
    for (i = 0; i in userInfo; i++) {
      if (userInfo[i]['id'] === uid) {
        var SessionUserData = userInfo[i]['value'];
      }
    }
  }

  function getUserName(fuid: any) {
    if (userInfo !== undefined) {
      for (i = 0; i in userInfo; i++) {
        if (userInfo[i]['id'] === fuid) {
          // console.log(userInfo[i].value)
          return userInfo[i]['value']['username'];
        }
      }
    }
  }
  function getDisplayName(fuid: any) {
    if (userInfo !== undefined) {
      for (i = 0; i in userInfo; i++) {
        if (userInfo[i]['id'] === fuid) {
          // console.log(userInfo[i].value)
          return userInfo[i]['value']['displayName'];
        }
      }
    }
  }
  function getProfilePic(fuid: any) {
    if (userInfo !== undefined) {
      for (i = 0; i in userInfo; i++) {
        if (userInfo[i]['id'] === fuid) {
          // console.log(userInfo[i].value)
          return userInfo[i]['value']['photoUrl'];
        }
      }
    }
  }

  // console.log(getUserName(auth.currentUser.uid))

  return (
    <div className="">
      <div>
        {documents.map((documents) => (
          <div key={documents['id']}>
            <div className="max-w-4xl break-all noLink">
              <div className="grid">
                <Link to={"post/" + documents['id']} className="noLink">
                  <div className="flex">
                    <img
                      className="w-12 mt-1 rounded-full"
                      src={getProfilePic(documents['value']['user'])}
                      alt="pfp"
                    />
                    <span className="pl-3 font-bold">
                      {getDisplayName(documents['value']['user'])}{" "}
                      <span className="font-light opacity-70">
                        @{getUserName(documents['value']['user'])} ·{" "}
                        {toTime(documents['value']['time'])}
                      </span>
                    </span>
                  </div>
                  <span className="ml-16 -mt-6 mb-2">
                    {documents['value']['value']}
                  </span>
                  {/* <img
                  draggable="true"
                  alt="ExamplePicture"
                  src="https://pbs.twimg.com/media/E28O61HUYAEtfbf?format=jpg&name=4096x4096"
                  className="rounded-3xl max-w-sm ml-16"
                /> */}
                </Link>
                <div>
                  like{" "}{documents['value']['likes']}
                </div>
              </div>
            </div>

            {/* <div>
              <img
                className="w-12 mt-1 rounded-full"
                src={getProfilePic(documents.value.user)}
                alt="pfpBob"
              />
              Username: {getDisplayName(documents.value.user)} Document:{" "}
              {documents.id} Value: {documents.value.value}
            </div> */}
          </div>
        ))}
      </div>
      {/* mockup */}
      {/* <div className="absolute w-96 max-w-sm">
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
      </div> */}
    </div>
  );
}

function AddLikes() {
  // if already liked, pass
  // else if not yet liked, continue
    //
}

function SignIn() {
  window.location.href = "/account";
  return <div></div>;
}

export default Home;
