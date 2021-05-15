// import logo from './logo.svg';
import React from "react";
import "./App.css";
import Home from "./components/Home";
import Account from "./components/Account";
import NavBar from "./components/NavBar";
import NotFoundPage from "./components/NotFound";
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
          <Route component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
