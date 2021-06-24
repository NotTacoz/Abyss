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
  const [followers, setFollowers] = React.useState([]);
  const [following, setFollowing] = React.useState([]);
  const [isfollowing, setIsfollowing] = React.useState(false);

  React.useEffect(() => {
    db.collection("users")
      .doc(uid)
      .collection("followers")
      .onSnapshot((response) => {
        const fetchedCinemas = [];
        response.docs.forEach((document) => {
          const fetchedCinema = {
            id: document.id,
            ...document.data(),
          };
          fetchedCinemas.push(fetchedCinema);
        });
        setFollowers(fetchedCinemas);
      });
    db.collection("users")
      .doc(uid)
      .collection("following")
      .onSnapshot((response) => {
        const fetchedCinemas = [];
        response.docs.forEach((document) => {
          const fetchedCinema = {
            id: document.id,
            ...document.data(),
          };
          fetchedCinemas.push(fetchedCinema);
        });
        setFollowing(fetchedCinemas);
      });
    db.collection("users")
      .doc(uid)
      .collection("followers")
      .doc(auth.currentUser.uid)
      .onSnapshot((doc) => {
        if (doc.exists) {
          setIsfollowing(true);
        }else {
          setIsfollowing(false);
        }
      });
  }, [uid]);

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

  function followPerson() {
    db.collection("users")
      .doc(uid)
      .collection("followers")
      .doc(auth.currentUser.uid)
      .set({
        user: auth.currentUser?.uid,
        time: new Date(),
      })
      .then(function () {
        // toast.success("Successfully Followed!");
        //console.log("Value successfully written!");
      });
    db.collection("users")
      .doc(auth.currentUser.uid)
      .collection("following")
      .doc(uid)
      .set({
        user: uid,
        time: new Date(),
      })
      .then(function () {
        toast.success("Successfully Followed!");
        //console.log("Value successfully written!");
      });
  }

  function unfollowPerson() {
    db.collection("users")
      .doc(uid)
      .collection("followers")
      .doc(auth.currentUser.uid).delete()
    db.collection("users")
      .doc(auth.currentUser.uid)
      .collection("following")
      .doc(uid)
      .delete()
  }

  // if (auth.currentUser.uid === uid) {
  //   document.getElementById("follow").style.display = "none";
  //   document.getElementById("unfollow").style.display = "none";
  // }

  return (
    <div>
      <div>
        <img
          className="profileWallpaper rounded-lg object-cover w-1/2 h-52"
          src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.osxdaily.com%2Fwp-content%2Fuploads%2F2017%2F06%2Fmacos-high-sierra-default-wallpaper-fall-mountain-scene-1.jpg&f=1&nofb=1"
          alt=""
        />
        <img
          className="w-36 ml-2 -mt-12 rounded-full"
          src={getProfilePic(uid)}
          alt="pfp"
        />
        <div className="inline-flex">
          <h2 className="ml-3">{getDisplayName(uid)}</h2>
          {auth.currentUser.uid === uid ? (
            <div></div>
          ) : (
            <div>
              {isfollowing ? (
                <div>
                  <button
                    type="button"
                    className="special ml-72 -mt-20 rounded-full"
                    onClick={unfollowPerson}
                    id="unfollow"
                  >
                    Unfollow
                  </button>
                  <Toaster />
                </div>
              ) : (
                <div>
                  <button
                    type="button"
                    className="special ml-72 -mt-20 rounded-full"
                    onClick={followPerson}
                    id="follow"
                  >
                    Follow
                  </button>
                  <Toaster />
                </div>
              )}
            </div>
          )}
        </div>
        <br />
        <span className="ml-3 opacity-70">@{getUserName(uid)}</span>
        <br />
        <div className="ml-3 mt-2">
          <span>{following.length}</span>{" "}
          <span className="opacity-70">Following</span>
          <span className="ml-3">{followers.length}</span>{" "}
          <span className="opacity-70">Followers</span>
        </div>
      </div>
    </div>
  );
}

function SignIn() {
  window.location.href = "/account";
  return <div></div>;
}

export default Users;
