/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
// eslint-disable-next-line no-unused-vars
import $ from "jquery";
import { Helmet } from "react-helmet";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

function NewPost() {
    return (
        <div className="content">
        <Helmet>
            <meta charSet="utf-8" />
            <title>Abyss | New Post</title>
        </Helmet>
        New Post
        </div>
    );
}

export default NewPost;
