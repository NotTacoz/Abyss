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

import toast, { Toaster } from "react-hot-toast";

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();
const db = firebase.firestore();

const FireStoreData = () => {
  const [documents] = useGetData();
};

function NewPost() {
  const [user] = useAuthState(auth);

  return (
    <div className="content">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Abyss | New</title>
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
    (document.getElementById("newPostInput") as HTMLInputElement).value = "";
    if (value !== "") {
      db.doc("values/" + makeId(10))
      .set({
        value: value,
        user: auth.currentUser?.uid,
        time: new Date(),
        imgurl: "placeholder", // im too lazy
        likes: 0,
      })
      .then(function () {
        toast.success("Successfully posted!");
        //console.log("Value successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing Value: ", error);
      });
    }
  };
  const [documents] = useGetData();

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

  return (
    <div className="">
      <div className="inputdiv">
        <button type="button" className="special" onClick={addValue}>
          Post
        </button>
        <Toaster />
        {/* <input type="file" id="myFile" name="filename" /> */}
        <br />
        <input
          id="newPostInput"
          onBlur={getValue}
          placeholder={placeholdertext}
          className="w-96 h-12 pl-6"
          type="text"
        />
      </div>
    </div>
  );
}

function SignIn() {
  window.location.href = "/account";
  return (<div></div>);
}

export default NewPost;
