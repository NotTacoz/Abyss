/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import {
  FirebaseAuthProvider,
  // eslint-disable-next-line no-unused-vars
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseAuthedAnd
} from '@react-firebase/auth'
const config = {
  apiKey: 'AIzaSyCOETJBWJQ8dNQnJilsND5CoT79GBHKZUs',
  authDomain: 'genshin-mains.firebaseapp.com',
  databaseURL: 'https://genshin-mains-default-rtdb.firebaseio.com',
  projectId: 'genshin-mains',
  storageBucket: 'genshin-mains.appspot.com',
  messagingSenderId: '82953203784',
  appId: '1:82953203784:web:b825c166d63766c475287d',
  measurementId: 'G-00DBVS0PXW'
}

function Login () {
  return (
      <FirebaseAuthProvider {...config} firebase={firebase}>
      <div className="content">
        <button
          onClick={() => {
            const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
            firebase.auth().signInWithPopup(googleAuthProvider)
          }}
        >
          Sign In with Google
        </button>
        {/* <FirebaseAuthConsumer>
          {({ isSignedIn, user, providerId }) => {
            return (
              <pre style={{ height: 300, overflow: 'auto' }}>
                {JSON.stringify({ isSignedIn, user, providerId }, null, 2)}
              </pre>
            )
          }}
        </FirebaseAuthConsumer> */}
        <div>
          <IfFirebaseAuthed>
              {() => {
                return <div>
                  <p>You are authenticated</p>
                  <button onClick={() => { firebase.auth().signOut() }}>
            Sign Out
          </button></div>
              }}
          </IfFirebaseAuthed>
          <IfFirebaseAuthedAnd filter={({ providerId }) => providerId !== 'anonymous'}>
            {({ providerId }) => {
              return <div>You are authenticated with {providerId}</div>
            }}
          </IfFirebaseAuthedAnd>
        </div>
      </div>
    </FirebaseAuthProvider>
  )
}

export default Login
