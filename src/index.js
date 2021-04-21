/* eslint-disable semi */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// eslint-disable-next-line no-unused-vars
/*
import * as firebase from 'firebase';

const config = {fafaffff
  apiKey: 'AIzaSyCOETJBWJQ8dNQnJilsND5CoT79GBHKZUs',
  authDomain: 'genshin-mains.firebaseapp.com',
  databaseURL: 'https://genshin-mains-default-rtdb.firebaseio.com',
  projectId: 'genshin-mains',
  storageBucket: 'genshin-mains.appspot.com',
  messagingSenderId: '82953203784',
  appId: '1:82953203784:web:b825c166d63766c475287d',
  measurementId: 'G-00DBVS0PXW'
};

firebase.initializeApp(config);
*/

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
