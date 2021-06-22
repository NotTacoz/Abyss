/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import Home from "./components/pages/Home";
import Account from "./components/pages/Account";
import NavBar from "./components/pages/NavBar";
import NotFoundPage from "./components/pages/NotFound";
import Notifications from "./components/pages/Notifications";
import Settings from "./components/pages/Settings";
import NavbarNotSignedIn from "./components/pages/NavbarNotSignedIn";
import Post from "./components/pages/Post";
import Users from "./components/pages/Users";

import $ from "jquery";
import { Helmet } from "react-helmet";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

// eslint-disable-next-line no-unused-vars
import { Redirect, Route, Switch, BrowserRouter, Link } from "react-router-dom";
import "./App.css";

const auth = firebase.auth();


function App() {
  const [user] = useAuthState(auth);

  return (
    <section>{user ? <Normal /> : <Signin />}</section>
  );
}

function Normal() {
  const theme = localStorage.getItem("theme");

  const body = document.body;

  console.log(
    "If you are seeing this 9/10 you are a developer."
  );
  console.log(
    "If you want, check out my github repo for this project (and maybe star it? ✨🥺👉👈)"
  );
  console.log("⭐ https://github.com/NotTacoz/Abyss ⭐");

  if (theme) {
    body.classList.add(theme);
  }
  
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/account" component={Account} />
        <Route exact path="/notifications" component={Notifications} />
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/post/:id" component={Post} />
        <Route exact path="/users/:userid" component={Users} />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}

function Signin() {
  return (
    <BrowserRouter>
      <NavbarNotSignedIn />
      <Switch>
        <Route component={Account} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;