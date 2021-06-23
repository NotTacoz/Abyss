/* eslint-disable @typescript-eslint/no-unused-vars */

import React from "react";

import firebase from "firebase/app";
import { Route, Link } from "react-router-dom";

import $ from "jquery";
import { Helmet } from "react-helmet";

import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

import toast, { Toaster } from "react-hot-toast";

import { useGetData } from "../hooks/useGetData";
import { UserGetData } from "../hooks/UserGetData";
// import { userInfo } from "os";

import Heart from "./../../img/msg/heart.png";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const config = {
  apiKey: "AIzaSyBWqu0h99Z4YJsebWVMw_m7-jA114FLSts",
  authDomain: "abyss-media.firebaseapp.com",
  databaseURL:
    "https://abyss-media-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "abyss-media",
  storageBucket: "abyss-media.appspot.com",
  messagingSenderId: "639511696146",
  appId: "1:639511696146:web:0687af67648ea8c77819cb",
  measurementId: "G-QKQMM7JYHV",
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();
const db = firebase.firestore();

const FireStoreData = () => {
  const [documents] = useGetData();
  const [userInfo] = UserGetData();
};

function Home() {
  const [user] = useAuthState(auth);

  return (
    <div className="content">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Abyss | Home</title>
      </Helmet>

      <section>{user ? <Timeline /> : <SignIn />}</section>
    </div>
  );
}

function makeId(length: number) {
  let result = [];
  for (let i = 0; i < length; i++) {
    result.push("0123456789"[Math.floor(Math.random() * 10)]);
  }
  return result.join("");
}

function toTime(date) {
  let timestamp = date?.toDate();
  let currentDate = new Date();
  if (
    timestamp.getDate() === currentDate.getDate() &&
    timestamp.getDay === currentDate.getDay
  ) {
    return `Today at ${
      timestamp.getHours() % 12 === 0 ? 12 : timestamp.getHours() % 12
    }:${timestamp?.getMinutes().toString().padStart(2, "0")} ${
      timestamp?.getHours() > 11 ? "PM" : "AM"
    }`;
  } else {
    return `${timestamp?.getDate()} ${
      [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ][timestamp?.getMonth()]
    } ${timestamp?.getFullYear()}`;
  }
}

function toExactTime(date: { toDate: () => any }) {
  let timestamp = date.toDate();
  return `${timestamp.getDate()} ${
    [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ][timestamp.getMonth()]
  } ${timestamp.getFullYear()} ${
    timestamp.getHours() % 12 === 0 ? 12 : timestamp.getHours() % 12
  }:${timestamp.getMinutes().toString().padStart(2, "0")} ${
    timestamp.getHours() > 11 ? "PM" : "AM"
  }`;
}

function Timeline() {
  const [value, setValue] = React.useState("");
  const [fileurl, setFileurl] = React.useState(null);
  const [lengthofmsg, setLengthofmsg] = React.useState(0);
  // const [liked, setLiked] = React.useState({});

  const getValue = (event: any) => {
    setValue(event.target.value);
  };

  var randomnum = Math.floor(Math.random() * 7);
  var placeholdertext = "Write something here!";
  if (randomnum === 0) {
  } else if (randomnum === 1) {
    placeholdertext = "What's happening?";
  } else if (randomnum === 2) {
    placeholdertext = "Hello World!";
  } else if (randomnum === 3) {
    placeholdertext = "Twitter looks different today...";
  }

  // db.doc("users/" + auth.currentUser.uid)
  //   .get()
  //   .then((doc) => {
  //     if (doc.exists) {
  //       // userInfo data collect
  //       const userInfo = doc.data();
  //       // console.log(userInfo);
  //       // console.log(userInfo.email);
  //     } else {
  //       console.log("No such document!");
  //     }
  //   })
  //   .catch((error) => {
  //     console.log("Error getting document:", error);
  //   });

  const uid = auth.currentUser?.uid;

  const [userInfo] = UserGetData();
  const [documents] = useGetData();

  var i;
  if (userInfo !== undefined) {
    for (i = 0; i in userInfo; i++) {
      if (userInfo[i]["id"] === uid) {
        var SessionUserData = userInfo[i]["value"];
      }
    }
  }

  function getUserName(fuid: any) {
    if (userInfo !== undefined) {
      for (i = 0; i in userInfo; i++) {
        if (userInfo[i]["id"] === fuid) {
          // console.log(userInfo[i].value)
          return userInfo[i]["value"]["username"];
        }
      }
    }
  }
  function getDisplayName(fuid: any) {
    if (userInfo !== undefined) {
      for (i = 0; i in userInfo; i++) {
        if (userInfo[i]["id"] === fuid) {
          // console.log(userInfo[i].value)
          return userInfo[i]["value"]["displayName"];
        }
      }
    }
  }
  function getProfilePic(fuid: any) {
    if (userInfo !== undefined) {
      for (i = 0; i in userInfo; i++) {
        if (userInfo[i]["id"] === fuid) {
          // console.log(userInfo[i].value)
          return userInfo[i]["value"]["photoUrl"];
        }
      }
    }
  }
  
  function getCommentLength(documentid: any) {
    let listthing = [];
    
    db.collection("values")
      .doc(documentid)
      .collection("comments")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          listthing.push(doc.data());
          // setLengthofmsg(listthing.length);
        });
      });

    // console.log(listthing.length);

    if (listthing.length > 0 ) {return listthing.length;}
  }

  const addValue = () => {
    var fileInput = document.getElementById("imgInput") as HTMLInputElement;
    if (fileInput !== null) {
      if (fileInput.size! <= 1500000) {
        toast.error("Make sure your image is unedr 1.5mb!");
        setValue("");
        setFileurl(null);
      }
    }
    (document.getElementById("newPostInput") as HTMLInputElement).value = "";
    (document.getElementById("preview") as HTMLImageElement).src = null;
    $("#imageInput").val(null);
    // const imageValue = fileInput.files;
    // console.log(imageValue);
    if (value !== "" || fileurl !== null) {
      var randomid = makeId(10);
      db.doc("values/" + randomid)
        .set({
          value: value,
          user: auth.currentUser?.uid,
          time: new Date(),
          imgurl: fileurl, // im too lazy
          likes: 0,
        })
        .then(function () {
          setValue("");
          setFileurl(null);
          toast.success("Successfully posted!");
          //console.log("Value successfully written!");
        })
        .catch(function (error) {
          toast.error("Failed Posting: ", error);
          // console.error("Error writing Value: ", error);
        });
    } else {
      toast.error("Failed Posting: Check your input and try again!");
    }
  };

  // console.log(getUserName(auth.currentUser.uid))

  const previewImage = async (e) => {
    // variables

    const reader = new FileReader();
    const file = e.target.files[0];
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(file?.name);

    // preview

    reader.readAsDataURL(file);
    reader.onload = () => {
      const preview = document.getElementById("preview") as HTMLImageElement;
      preview.src = reader.result as string;
    };

    // upload url to firestore

    await fileRef.put(file);

    setFileurl(await fileRef.getDownloadURL());
  };

  async function likeMessage(likedDocument: { [x: string]: string }) {
    // console.log(likedDocument);
    var liked = {};
    await db
      .collection("values")
      .doc(likedDocument["id"])
      .collection("likes")
      .doc(auth.currentUser.uid)
      .get()
      .then(async (doc) => {
        if (doc.data() === undefined) {
          liked = { liked: false };
        } else if (doc.data()["liked"] === true) {
          liked = { liked: true };
        } else {
          console.log("!!! error !!!");
        }
      });
    // console.log(liked, likedDocument);
    if (liked === {}) {
      toast.error("Failed Liking: Usestate is bad");
    } else if (liked["liked"] === false) {
      const newLikes = likedDocument["value"]["likes"] + 1;
      db.collection("values")
        .doc(likedDocument["id"])
        .update({ likes: newLikes });
      db.collection("values")
        .doc(likedDocument["id"])
        .collection("likes")
        .doc(auth.currentUser.uid)
        .set({
          liked: true,
        });
      // document.getElementById("likebutton").className =
      //   "ml-16 likebutton beenLiked";
    } else if (liked["liked"] === true) {
      const newLikes = likedDocument["value"]["likes"] - 1;
      db.collection("values")
        .doc(likedDocument["id"])
        .update({ likes: newLikes });
      db.collection("values")
        .doc(likedDocument["id"])
        .collection("likes")
        .doc(auth.currentUser.uid)
        .delete();
      // document.getElementById("likebutton").className = "ml-16 likebutton";
    }
  }

  return (
    <div className="">
      {/* <div className="absolute ml-96 pl-28 pr-16">
        <img
          className="profileWallpaper rounded-lg object-cover w-full h-52"
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.wallpapers13.com%2Fwp-content%2Fuploads%2F2016%2F04%2FLandscape-Water-House-LofotenMorningMoskenesoya-HD-Desktop-Wallpaper.jpg&f=1&nofb=1"
          alt=""
        />
        <img
          className="w-36 ml-2 -mt-12 rounded-full"
          src={getProfilePic(uid)}
          alt="pfp"
        />
        <h2 className="ml-3">{getDisplayName(uid)}</h2>
        <span className="ml-3 opacity-70">@{getUserName(uid)}</span>
      </div> */}
      <div className="">
        <div className="pb-8">
          <div className="inputdiv inline">
            {/* <input type="file" id="myFile" name="filename" /> */}
            <br />
            <input
              id="newPostInput"
              onBlur={getValue}
              placeholder={placeholdertext}
              className="w-96 h-12 pl-6"
              type="text"
              autoComplete="off"
            />
            <button type="button" className="special" onClick={addValue}>
              Post
            </button>
            <img id="preview" alt="" className="rounded-3xl max-w-sm" />
            <input
              type="file"
              accept="image/*"
              id="imageInput"
              onChange={function (event) {
                previewImage(event);
              }}
            />
            <Toaster />
            <br />
            {/* <input
            type="file"
            accept="image/png, image/jpeg, image/gif, image/jpg"
            onChange={function (event) {
              var fileList = event.target.files;
              console.log(fileList);
              previewImage(event);
            }}
          /> */}
          </div>
        </div>
        <div>
          {documents.map((documents) => (
            <div key={documents["id"]}>
              <div className="postMessageCard">
                <Link to={"post/" + documents["id"]} className="noLink">
                  <div className="max-w-4xl break-all noLink">
                    <div className="grid">
                      <div className="flex">
                        <Link
                          to={"users/" + documents["value"]["user"]}
                          className="noLink"
                        >
                          <img
                            className="w-12 mt-1 rounded-full"
                            src={getProfilePic(documents["value"]["user"])}
                            alt="pfp"
                          />
                        </Link>
                        <span className="pl-3 font-bold">
                          {getDisplayName(documents["value"]["user"])}{" "}
                          <span className="font-light opacity-70">
                            @{getUserName(documents["value"]["user"])} ·{" "}
                            {toTime(documents["value"]["time"])}
                          </span>
                        </span>
                      </div>
                      <span className="ml-16 -mt-6 mb-2">
                        {documents["value"]["value"]}
                      </span>
                      <img
                        draggable="true"
                        alt=""
                        src={documents["value"]["imgurl"]}
                        className="rounded-3xl max-w-sm ml-16"
                      />
                    </div>
                  </div>
                </Link>
                <div className="flex">
                  <div
                    className="ml-16 likebutton"
                    id="likebutton"
                    onClick={() => {
                      likeMessage(documents);
                    }}
                  >
                    <FontAwesomeIcon className="" icon={faHeart} />
                  </div>
                  <Toaster />
                  <span className="pl-2 -mt-1">
                    {documents["value"]["likes"]}
                  </span>
                  <div className="ml-4 -mt-1">
                    <FontAwesomeIcon icon={faComments} />
                    <span className="pl-2 -mt-1">
                      {getCommentLength(documents["id"])}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* mockup */}
        {/* <div className="absolute w-96 max-w-sm">
        <div className="grid">
          <div className="flex">
            <img
              className="w-12 mt-1 rounded-full"
              src="https://pbs.twimg.com/profile_images/1312578814971576328/ul3_sosR_400x400.png"
              alt="pfpBob"
            />
            <span className="pl-3 font-bold">
              Tacoz <span className="font-light opacity-70">@Awesome · 2h</span>
            </span>
          </div>
          <span className="ml-16 -mt-6 mb-2">
            COME ON AUSTRALIA WE ALMOST AT 0!!!!!!!!!!!!!
          </span>
          <img
            draggable="true"
            alt="ExamplePicture"
            src="https://pbs.twimg.com/media/E28O61HUYAEtfbf?format=jpg&name=4096x4096"
            className="rounded-3xl max-w-sm ml-16"
          />
        </div>
      </div> */}
      </div>
    </div>
  );
}

function AddLikes() {
  // if already liked, pass
  // else if not yet liked, continue
  //
}

function SignIn() {
  window.location.href = "/account";
  return <div></div>;
}

export default Home;
function componentDidMount() {
  throw new Error("Function not implemented.");
}

