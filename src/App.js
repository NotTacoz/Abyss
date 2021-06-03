/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable space-before-function-paren */
/* eslint-disable semi */
// import logo from './logo.svg';
import React from "react";
import "./App.css";
import Home from "./components/Home";
import Account from "./components/Account";
import NavBar from "./components/NavBar";
import NotFoundPage from "./components/NotFound";
import Notifications from "./components/Notifications";
import Settings from "./components/Settings";
import NewPost from "./components/NewPost";
import NavbarNotSignedIn from "./components/NavbarNotSignedIn";

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
        <Route exact path="/account" component={Account} />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;