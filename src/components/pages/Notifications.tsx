/* eslint-disable @typescript-eslint/no-unused-vars */

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
import { UserGetData } from "../hooks/UserGetData";

const auth = firebase.auth();
const db = firebase.firestore();

function Notifications() {
  const [user] = useAuthState(auth);

  return (
    <div className="content">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Abyss | Notifications</title>
      </Helmet>

      <section>{user ? <Content /> : <SignIn />}</section>
    </div>
  );
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

function Content() {
  const [documents, setDocuments] = React.useState([]);
  const [userInfo] = UserGetData();

  React.useEffect(() => {
    db.collection("users")
      .doc(auth.currentUser.uid)
      .collection("notifications")
      .orderBy("time", "desc")
      .onSnapshot((querySnapshot) => {
        let arr = [];
        querySnapshot.docs.map((doc) =>
          arr.push({ id: doc.id, value: doc.data() })
        );
        setDocuments(arr);
      });
  });

  // console.log(documents)

  var i;

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

  return (
    <div className="">
      <div>
        {documents.map((documents) => (
          <div key={documents["id"]}>
            <div className="inline-flex">
              <img
                className="w-12 mt-1 rounded-full"
                src={getProfilePic(documents["value"]["user"])}
                alt="pfp"
              />{" "}
              <span className="mt-3 ml-2">
                {getDisplayName(documents["value"]["user"])} @
                {getUserName(documents["value"]["user"])}{" | "}
                {toTime(documents["value"]["time"])} Replied to your post:{" "}
                {documents["value"]["comment"]}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SignIn() {
  window.location.href = "/account";
  return <div></div>;
}

export default Notifications;
