/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable space-before-function-paren */
/* eslint-disable semi */
// import logo from './logo.svg';
import './App.css';
import Home from './Home'
import Login from './login'
import NavBar from './navBar'
// eslint-disable-next-line no-unused-vars
import NotFoundPage from './notFound'
// eslint-disable-next-line no-unused-vars
import { Redirect, Route, Switch, BrowserRouter, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <div className="App">
          <NavBar />
          <Route exact path="/" component={ Home } />
          <Route exact path="/home" component={ Home } />
          <Route exact path="/login" component={ Login } />
          <Route path="/404" component={NotFoundPage} />
          <Redirect to="/404" />
        </div>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
