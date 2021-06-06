/* eslint-disable @typescript-eslint/no-unused-vars */

import * as React from "react";
import $ from "jquery";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { UserGetData } from "../hooks/UserGetData";
import { useGetData } from "../hooks/useGetData";

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();
const db = firebase.firestore();

function toTime(date) {
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

function toExactTime(date) {
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

function Post() {
  const { id } = useParams();
    const [value, setValue] = React.useState("");

    const uid = auth.currentUser.uid;

    const [userInfo] = UserGetData();
    const [documents] = useGetData();

    var i;
    if (userInfo !== undefined) {
      for (i = 0; i in userInfo; i++) {
        if (userInfo[i].id === uid) {
          var SessionUserData = userInfo[i].value;
        }
      }
    }

    function getUserName(fuid) {
      if (userInfo !== undefined) {
        for (i = 0; i in userInfo; i++) {
          if (userInfo[i].id === fuid) {
            // console.log(userInfo[i].value)
            return userInfo[i].value.username;
          }
        }
      }
    }
    function getDisplayName(fuid) {
      if (userInfo !== undefined) {
        for (i = 0; i in userInfo; i++) {
          if (userInfo[i].id === fuid) {
            // console.log(userInfo[i].value)
            return userInfo[i].value.displayName;
          }
        }
      }
    }
    function getProfilePic(fuid) {
      if (userInfo !== undefined) {
        for (i = 0; i in userInfo; i++) {
          if (userInfo[i].id === fuid) {
            // console.log(userInfo[i].value)
            return userInfo[i].value.photoUrl;
          }
        }
      }
    }

  return (
    <div className="content">
      <h1>loading post {id}</h1>
      <div>
        {documents.map((documents) => (
          <div key={documents.id}>
            <div className="max-w-4xl break-all">
              <div className="grid">
                <div className="flex">
                  <img
                    className="w-12 mt-1 rounded-full"
                    src={getProfilePic(documents.value.user)}
                    alt="pfp"
                  />
                  <span className="pl-3 font-bold">
                    {getDisplayName(documents.value.user)}{" "}
                    <span className="font-light opacity-70">
                      @{getUserName(documents.value.user)} ·{" "}
                      {toTime(documents.value.time)}
                    </span>
                  </span>
                </div>
                <span className="ml-16 -mt-6 mb-2">
                  {documents.value.value}
                </span>
                {/* <img
                  draggable="true"
                  alt="ExamplePicture"
                  src="https://pbs.twimg.com/media/E28O61HUYAEtfbf?format=jpg&name=4096x4096"
                  className="rounded-3xl max-w-sm ml-16"
                /> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


export default Post;
