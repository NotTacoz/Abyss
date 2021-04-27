/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable space-before-function-paren */
/* eslint-disable semi */
// import logo from './logo.svg';
import './App.css';
import Home from './Home'
import Login from './login'
import NavBar from './NavBar'
// eslint-disable-next-line no-unused-vars
import { Route, Link } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <NavBar />
      <Route exact path="/" component={ Home } />
      <Route exact path="/login" component={ Login } />
    </div>
  );
}

export default App;
