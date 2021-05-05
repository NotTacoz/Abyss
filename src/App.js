/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable space-before-function-paren */
/* eslint-disable semi */
// import logo from './logo.svg';
import React from 'react';
import './App.css';
import Home from './components/Home'
import Login from './components/login'
// eslint-disable-next-line no-unused-vars
import NavBar from './components/NavBar'
// eslint-disable-next-line no-unused-vars
import NotFoundPage from './notFound'
// eslint-disable-next-line no-unused-vars
import { Redirect, Route, Switch, BrowserRouter, Link } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <NavBar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path="/login" component={Login} />
            <Route component={NotFoundPage} />
          </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
