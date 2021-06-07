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
  let timestamp = date?.toDate();
  let currentDate = new Date();
  if (
    timestamp?.getDate() === currentDate.getDate() &&
    timestamp?.getDay === currentDate.getDay
  ) {
    return `Today at ${
      timestamp?.getHours() % 12 === 0 ? 12 : timestamp?.getHours() % 12
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
  // if (userInfo !== undefined) {
  //   for (i = 0; i in userInfo; i++) {
  //     if (userInfo[i].id === uid) {
  //       // var SessionUserData = userInfo[i].value;
  //     }
  //   }
  // }

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

  // class ValueInstance {
  //   time: any;
  //   user: any;
  //   value: any;
  //   constructor(time, user, value) {
  //     this.time = time;
  //     this.user = user;
  //     this.value = value;
  //   }
  //   toString() {
  //     return this.time + ", " + this.user + ", " + this.value;
  //   }
  // }

  // var valueConverter = {
  //   toFirestore: function (value) {
  //     return {
  //       time: value.name,
  //       user: value.user,
  //       value: value.value,
  //     };
  //   },
  //   fromFirestore: function (snapshot, options) {
  //     const data = snapshot.data(options);
  //     return new ValueInstance(data.time, data.user, data.value);
  //   },
  // };

  // function returningValueInfo() {
  //   db.collection("values")
  //     .doc(id)
  //     .withConverter(valueConverter)
  //     .get()
  //     .then((doc) => {
  //       if (doc.exists) {
  //         var valuesInfo = doc.data();
  //         console.log(valuesInfo);
  //         return doc.data();
  //       } else {
  //         console.log("No such document!");
  //       }
  //     })
  //     .catch((error) => {
  //       console.log("Error getting document:", error);
  //     });
  // }

  // const valuesInfo = returningValueInfo();

  function getValueStuff() {
    for (i = 0; i in documents; i++) {
      if (documents[i].id === id) {
        // console.log(userInfo[i].value)
        return documents[i].value;
      }
    }
  }

  const valuesInfo = getValueStuff();

  // console.log(valuesInfo);

  return (
    <div className="content">
      <h1>loading post {id}</h1>
      <div>
        <div className="max-w-4xl break-all">
          <div className="grid">
            <div className="flex">
              <img
                className="w-12 mt-1 rounded-full"
                src={getProfilePic(valuesInfo?.user)}
                alt="pfp"
              />
              <span className="pl-3 font-bold">
                {getDisplayName(valuesInfo?.user)}{" "}
                <span className="font-light opacity-70">
                  @{getUserName(valuesInfo?.user)} · {toTime(valuesInfo?.time)}
                </span>
              </span>
            </div>
            <span className="ml-16 -mt-6 mb-2">{valuesInfo?.value}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
