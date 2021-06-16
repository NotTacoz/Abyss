/* eslint-disable @typescript-eslint/no-unused-vars */

import React from "react";

import $ from "jquery";
import { Helmet } from "react-helmet";
import Switch from "@material-ui/core/Switch";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { useGetData } from "../hooks/useGetData";
import { checkPrime } from "crypto";


const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();
const db = firebase.firestore();

const FireStoreData = () => {
  const [documents] = useGetData();
};

function Settings() {
  const [user] = useAuthState(auth);

  return (
    <div className="content">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Abyss | Settings</title>
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

function Content() {
  const [value, setValue] = React.useState("");
  const getValue = (event) => {
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
  const [documents] = useGetData();

  const theme = localStorage.getItem("theme");

  const body = document.body;

  if (theme) {
    body.classList.add(theme);
  }

  function setLightMode() {
    body.classList.replace("dark", "light");
    localStorage.setItem("theme", "light");
  }

  function setDarkMode() {
    body.classList.replace("light", "dark");
    localStorage.setItem("theme", "dark");
  }

  const [state, setState] = React.useState({
    checkedA: undefined,
    checkedB: undefined,
  });

  if (state['checkedA'] === true) {
    setDarkMode();
  } else if (state['checkedA'] === false) {
    setLightMode();
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };


  return (
    <div className="">
      Theme:
      <Switch
        checked={state.checkedA}
        onChange={handleChange}
        name="checkedA"
        inputProps={{ "aria-label": "secondary checkbox" }}
      />
      <br />
    </div>
  );
}

function SignIn() {
  window.location.href = "/account";
  return (<div></div>);
}

export default Settings;
