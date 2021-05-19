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
import NewPost from "./components/New";
import Notifications from "./components/Notifications";
import Popular from "./components/Popular";
import Settings from "./components/Settings";

// eslint-disable-next-line no-unused-vars
import { Redirect, Route, Switch, BrowserRouter, Link } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/account" component={Account} />
          <Route exact path="/account" component={NewPost} />
          <Route exact path="/account" component={Notifications} />
          <Route exact path="/account" component={Popular} />
          <Route exact path="/account" component={Settings} />
          <Route component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
