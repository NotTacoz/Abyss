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

import toast, { Toaster } from "react-hot-toast";
import { createDocumentRegistry } from "typescript";

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

function makeId(length: number) {
  let result = [];
  for (let i = 0; i < length; i++) {
    result.push("0123456789"[Math.floor(Math.random() * 10)]);
  }
  return result.join("");
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
  const { id } = useParams<{ id: string }>();
  const [value, setValue] = React.useState("");

  const getValue = (event: any) => {
    setValue(event.target.value);
  };

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

  function commentOnPost() {
    var commentValue = (
      document.getElementById("newPostInput") as HTMLInputElement
    ).value;
    (document.getElementById("newPostInput") as HTMLInputElement).value = "";
    db.collection("values").doc(id).collection("comments").doc(makeId(15)).set({
      comment: commentValue,
      user: auth.currentUser?.uid,
      time: new Date(),
      imgurl: "placeholder", // im too lazy
      likes: 0,
    });
  }

  const [comments, setComments] = React.useState([]);

  db.collection("values")
    .doc(id)
    .collection("comments")
    .onSnapshot((querySnapshot) => {
      let arr = [];
      querySnapshot.docs.map((doc) =>
        arr.push({ id: doc.id, value: doc.data() })
      );
      setComments(arr);
    });

  const valuesInfo = getValueStuff();

  // console.log(comments);

  return (
    <div className="content">
      {/* <h1>loading post {id}</h1> */}
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
      <div className="inputdiv">
        <Toaster />
        {/* <input type="file" id="myFile" name="filename" /> */}
        <br />
        <img
          className="w-12 rounded-full inline"
          src={getProfilePic(auth.currentUser.uid)}
          alt="pfp"
        />
        <input
          id="newPostInput"
          onBlur={getValue}
          placeholder={"Comment your reply"}
          className="w-96 h-12 pl-6"
          type="text"
          autoComplete="off"
        />
        <button type="button" className="special" onClick={commentOnPost}>
          Post
        </button>
      </div>
      {comments.map((comments) => (
        <div key={comments["id"]}>
          <div className="max-w-4xl break-all noLink">
            <div className="grid">
              <div className="flex">
                <img
                  className="w-12 mt-1 rounded-full"
                  src={getProfilePic(comments["value"]["user"])}
                  alt="pfp"
                />
                <span className="pl-3 font-bold">
                  {getDisplayName(comments["value"]["user"])}{" "}
                  <span className="font-light opacity-70">
                    @{getUserName(comments["value"]["user"])} ·{" "}
                    {toTime(comments["value"]["time"])}
                  </span>
                </span>
              </div>
              <span className="ml-16 -mt-6 mb-2">
                {comments["value"]["comment"]}
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
  );
}

export default Post;
