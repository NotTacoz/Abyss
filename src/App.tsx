/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import "./App.css";
import Home from "./components/pages/Home";
import Account from "./components/pages/Account";
import NavBar from "./components/pages/NavBar";
import NotFoundPage from "./components/pages/NotFound";
import Notifications from "./components/pages/Notifications";
import Settings from "./components/pages/Settings";
import NewPost from "./components/pages/NewPost";
import NavbarNotSignedIn from "./components/pages/NavbarNotSignedIn";

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

const auth = firebase.auth();


function App() {
  const [user] = useAuthState(auth);

  return (
    <section>{user ? <Normal /> : <Signin />}</section>
  );
}

function Normal() {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/account" component={Account} />
        <Route exact path="/notifications" component={Notifications} />
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/new" component={NewPost} />
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